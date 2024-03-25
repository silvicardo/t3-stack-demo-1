import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createTodoSchema } from "~/app/create-todo-schema";

export const todoRouter = createTRPCRouter({
  getMyTodos: protectedProcedure.query(({ ctx }) =>
    ctx.db.todo.findMany({
      where: {
        createdBy: { id: ctx.session.user.id },
      },
      orderBy: { createdAt: "desc" },
    }),
  ),
  //https://github.com/colinhacks/zod/issues/63#issuecomment-1429974422
  create: protectedProcedure
    .input(createTodoSchema)
    .mutation(({ ctx, input }) =>
      ctx.db.todo.create({
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          text: input.text,
        },
      }),
    ),
});
