import { z } from 'zod';
import { t } from '../trpc';

export const memeRouter = t.router({
  getMeme: t.procedure.input(z.object({ id: z.number().min(1) })).query(({ input, ctx }) => {
    return {
      user: ctx.prisma.meme.findUnique({
        where: {
          id: input.id,
        },
      }),
    };
  }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.meme.findMany();
  }),
});
