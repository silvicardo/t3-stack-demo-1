"use client";

import type { Todo } from "@prisma/client";

export function TodoListItem(todo: Todo) {
  return (
    <div className="flex w-full max-w-xl flex-col rounded-xl border p-5 shadow-md">
      <div className="text">{todo.text}</div>
      <div className="created flex w-full items-center justify-end gap-1">
        <div className="text-xs">
          {new Date(todo.createdAt).toLocaleString("it")}
        </div>
      </div>
    </div>
  );
}
