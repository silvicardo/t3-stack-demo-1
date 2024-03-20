import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  getMyTodos: protectedProcedure.query(({ ctx }) =>
    ctx.db.todo.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
      orderBy: { createdAt: "desc" },
    }),
  ),
});
