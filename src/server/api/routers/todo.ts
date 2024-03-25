import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const todoRouter = createTRPCRouter({
  getMyTodos: protectedProcedure.query(({ ctx }) =>
    ctx.db.todo.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
      orderBy: { createdAt: "desc" },
    }),
  ),
  create: protectedProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation(({ ctx, input }) =>
      ctx.db.todo.create({
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          text: input.text,
        },
      }),
    ),
});
