import { TRPCError } from '@trpc/server';
import { Client as MinioClient } from 'minio';
import { z } from 'zod';
import { t } from '../trpc';

const getMemeURL = async (meme: { id: number; authorId: string }, minio: MinioClient) => {
  const url = await minio.presignedGetObject('memetapp', `${meme.authorId}-${meme.id}`);
  return url;
};

export const memeRouter = t.router({
  getMeme: t.procedure.input(z.object({ id: z.number().min(1) })).query(async ({ input, ctx }) => {
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
      meme: { ...meme, imageURL: await getMemeURL(meme, ctx.minio) },
    };
  }),
  uploadMeme: t.procedure.mutation(async ({ ctx }) => {
    if (!ctx.session || !ctx.session.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const meme = await ctx.prisma.meme.create({
      data: {
        authorId: ctx.session.user.id,
      },
    });

    return {
      meme,
      uploadURL: await ctx.minio.presignedPutObject('memetapp', `${ctx.session.user.id}-${meme.id}`, 600),
    };
  }),
  getPaginated: t.procedure
    .input(z.object({ limit: z.number().min(1), cursor: z.number().min(1).nullish() }))
    .query(async ({ input, ctx }) => {
      const memes = await ctx.prisma.meme.findMany({
        take: input.limit + 1,
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

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (memes.length > input.limit) {
        const nextItem = memes.pop();
        nextCursor = nextItem?.id;
      }

      console.log(nextCursor);

      const promises = memes.map(async meme => ({ ...meme, imageURL: await getMemeURL(meme, ctx.minio) }));
      const memesWithImages = await Promise.all(promises);

      return {
        memes: memesWithImages,
        nextCursor,
      };
    }),
});
