import { z } from 'zod';
import { t } from '../trpc';

export const userRouter = t.router({
  hello: t.procedure.input(z.object({ text: z.string().nullish() }).nullish()).query(({ input }) => {
    return {
      greeting: `Hello ${input?.text ?? 'world'}`,
    };
  }),
  getUser: t.procedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return {
      user: ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      }),
    };
  }),
  getAll: t.procedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
});
