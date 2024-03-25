"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

/**
 * This is the classic way
 * client submit
 */
export function CreateTodoClient() {
  const router = useRouter();
  const [text, setText] = useState("");

  const { mutate: createTodo, isPending } = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setText("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({ text });
      }}
      className="flex w-full max-w-xl flex-col gap-2 rounded-xl border p-5 shadow-md"
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write text..."
        className="w-full rounded-xl border p-2"
      />

      <button
        type="submit"
        className="btn"
        disabled={!text?.trim() || isPending}
      >
        {isPending ? "..." : "Submit"}
      </button>
    </form>
  );
}
