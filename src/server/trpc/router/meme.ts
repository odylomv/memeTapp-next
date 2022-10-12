import { TRPCError } from '@trpc/server';
import { Client as MinioClient } from 'minio';
import { z } from 'zod';
import { env } from '../../../env/server.mjs';
import { authedProcedure, publicProcedure, router } from '../trpc';

// Get authorized URL to view image from Minio
const getMemeImageURL = async (memeId: number, authorId: string, minio: MinioClient) => {
  try {
    return await minio.presignedGetObject(env.MINIO_BUCKET, `memes/${authorId}-${memeId}`, 600);
  } catch (error) {
    console.log(error);
    return '';
  }
};

export const memeRouter = router({
  getMeme: publicProcedure.input(z.object({ id: z.number().min(1) })).query(async ({ input, ctx }) => {
    const meme = await ctx.prisma.meme.findUnique({
      where: {
        id: input.id,
      },
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!meme) return null;

    return {
      meme: { ...meme, imageURL: await getMemeImageURL(meme.id, meme.authorId, ctx.minio) },
    };
  }),

  uploadMeme: authedProcedure.mutation(async ({ ctx }) => {
    const meme = await ctx.prisma.meme.create({
      data: {
        authorId: ctx.session.user.id,
      },
    });

    return {
      meme,
      uploadURL: await ctx.minio.presignedPutObject(env.MINIO_BUCKET, `memes/${ctx.session.user.id}-${meme.id}`, 600),
    };
  }),

  deleteMeme: authedProcedure.input(z.object({ id: z.number().min(1) })).mutation(async ({ input, ctx }) => {
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
    await ctx.minio.removeObject(env.MINIO_BUCKET, `memes/${ctx.session.user.id}-${input.id}`);

    return { success: true };
  }),

  likeMeme: authedProcedure
    .input(z.object({ memeId: z.number().min(1), action: z.union([z.literal('like'), z.literal('unlike')]) }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.meme.findUniqueOrThrow({ where: { id: input.memeId } });

      if (input.action === 'like')
        await ctx.prisma.memeLike.create({ data: { memeId: input.memeId, userId: ctx.session.user.id } });
      else if (input.action === 'unlike')
        await ctx.prisma.memeLike.delete({
          where: { userId_memeId: { memeId: input.memeId, userId: ctx.session.user.id } },
        });

      return { newCount: await ctx.prisma.memeLike.count({ where: { memeId: input.memeId } }) };
    }),

  getPaginated: publicProcedure
    .input(z.object({ limit: z.number().min(1), cursor: z.number().min(1).nullish() }))
    .query(async ({ input, ctx }) => {
      const memes = await ctx.prisma.meme.findMany({
        take: input.limit + 1, // Take an extra meme to use as the next cursor
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { id: 'desc' },
        include: {
          author: true,
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
      });

      // Calculate the next cursor
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (memes.length > input.limit) {
        const nextItem = memes.pop();
        nextCursor = nextItem?.id;
      }

      // Asynchronously get the image URLs and like status for every meme
      const promises = memes.map(async meme => {
        let like = null;
        if (ctx.session && ctx.session.user)
          like = await ctx.prisma.memeLike.findUnique({
            where: { userId_memeId: { memeId: meme.id, userId: ctx.session.user.id } },
          });

        return {
          ...meme,
          imageURL: await getMemeImageURL(meme.id, meme.authorId, ctx.minio),
          // imageURL: '',
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
