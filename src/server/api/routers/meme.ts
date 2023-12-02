import { env } from '@mtp/env.mjs';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

// Get authorized URL to view image from Minio
const getMemeImageURL = (memeId: string, authorId: string) => {
  return `https://${env.MINIO_ENDPOINT}/${env.MINIO_BUCKET}/memes/${authorId}-${memeId}`;
};

const memeInclude = Prisma.validator<Prisma.MemeInclude>()({
  author: { select: { id: true, image: true, name: true } },
  _count: {
    select: {
      likes: true,
      comments: true,
    },
  },
});

export const memeRouter = createTRPCRouter({
  getMeme: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
    const meme = await ctx.prisma.meme.findFirst({
      where: {
        id: input.id,
        hidden: false,
      },
      include: memeInclude,
    });

    if (!meme) return null;

    let like = null;
    if (ctx.auth?.userId)
      like = await ctx.prisma.memeLike.findUnique({
        where: { userId_memeId: { memeId: meme.id, userId: ctx.auth.userId } },
      });

    return {
      ...meme,
      imageURL: getMemeImageURL(meme.id, meme.authorId),
      isLiked: !!like,
    };
  }),

  uploadMeme: protectedProcedure.mutation(async ({ ctx }) => {
    const meme = await ctx.prisma.meme.create({
      data: {
        authorId: ctx.auth.userId,
        hidden: true,
      },
    });

    return {
      memeId: meme.id,
      uploadURL: await ctx.minio.presignedPutObject(env.MINIO_BUCKET, `memes/${ctx.auth.userId}-${meme.id}`, 600), // 10 Minutes
    };
  }),

  enableMeme: protectedProcedure.input(z.object({ memeId: z.string() })).mutation(async ({ input, ctx }) => {
    const meme = await ctx.prisma.meme.update({
      where: {
        id: input.memeId,
      },
      data: {
        hidden: false,
      },
    });

    return {
      meme: { ...meme, imageURL: getMemeImageURL(meme.id, meme.authorId) },
    };
  }),

  deleteMeme: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ input, ctx }) => {
    const meme = await ctx.prisma.meme.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!meme) throw new TRPCError({ code: 'NOT_FOUND' });

    await ctx.prisma.meme.delete({
      where: {
        id: input.id,
      },
    });
    await ctx.minio.removeObject(env.MINIO_BUCKET, `memes/${ctx.auth.userId}-${input.id}`);

    return { success: true };
  }),

  likeMeme: protectedProcedure
    .input(z.object({ memeId: z.string(), action: z.union([z.literal('like'), z.literal('unlike')]) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.meme.findUniqueOrThrow({ where: { id: input.memeId } });

      if (input.action === 'like')
        await ctx.prisma.memeLike.create({ data: { memeId: input.memeId, userId: ctx.auth.userId } });
      else if (input.action === 'unlike')
        await ctx.prisma.memeLike.delete({
          where: { userId_memeId: { memeId: input.memeId, userId: ctx.auth.userId } },
        });

      return { newCount: await ctx.prisma.memeLike.count({ where: { memeId: input.memeId } }) };
    }),

  getPaginated: publicProcedure
    .input(z.object({ limit: z.number().min(1), cursor: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const memes = await ctx.prisma.meme.findMany({
        take: input.limit + 1, // Take an extra meme to use as the next cursor
        cursor: input.cursor ? { id: input.cursor } : undefined,
        where: { hidden: false },
        orderBy: { createdAt: 'desc' },
        include: memeInclude,
      });

      // Calculate the next cursor
      let nextCursor: typeof input.cursor = undefined;
      if (memes.length > input.limit) {
        const nextItem = memes.pop();
        nextCursor = nextItem?.id;
      }

      // Asynchronously get the image URLs and like status for every meme
      const promises = memes.map(async meme => {
        let like = null;
        if (ctx.auth?.userId)
          like = await ctx.prisma.memeLike.findUnique({
            where: { userId_memeId: { memeId: meme.id, userId: ctx.auth.userId } },
          });

        return {
          ...meme,
          imageURL: getMemeImageURL(meme.id, meme.authorId),
          isLiked: !!like,
        };
      });

      const fullMemes = await Promise.all(promises);

      return {
        memes: fullMemes,
        nextCursor,
      };
    }),
});
