import { z } from 'zod';
import { t } from '../trpc';

export const memeRouter = t.router({
  getMeme: t.procedure.input(z.object({ id: z.number().min(1) })).query(({ input, ctx }) => {
    return {
      meme: ctx.prisma.meme.findUnique({
        where: {
          id: input.id,
        },
      }),
    };
  }),
  getPaginated: t.procedure
    .input(z.object({ limit: z.number().min(1), cursor: z.number().min(1).nullish() }))
    .query(async ({ input, ctx }) => {
      const memes = await ctx.prisma.meme.findMany({
        take: input.limit,
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
      return {
        memes,
        nextCursor,
      };
    }),
});
