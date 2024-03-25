import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { TodoListItem } from "~/app/_components/todo-list-item";
import { Suspense } from "react";
import { CreateTodoActions } from "~/app/_components/create-todo-actions";

async function ToDoList() {
  //wait for 1 second to simulate loading
  await (() => new Promise((resolve) => setTimeout(resolve, 1000)))();

  const todos = await api.todo.getMyTodos();

  if (!todos.length) return <div>No todos, all done 🤩🥳</div>;

  return (
    <div>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-5 p-5 pt-20">
      <div className="text-xl">
        {session?.user === undefined ? "Login required" : "AuthorizedContent"}
      </div>
      {session?.user !== undefined && (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <ToDoList />
          </Suspense>
          <CreateTodoActions />
        </>
      )}
    </main>
  );
}
