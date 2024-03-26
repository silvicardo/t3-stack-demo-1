"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  createTodo,
  type CreateTodoFormState,
} from "~/app/actions/create-todo";
import { createTodoSchema } from "~/app/create-todo-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={
        "btn rounded-full bg-blue-700 text-white disabled:pointer-events-none disabled:opacity-80 group-[.is-invalid]:pointer-events-none group-[.is-invalid]:bg-red-500"
      }
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      Submit
    </button>
  );
}

type FormValues = CreateTodoFormState["fields"];

export function CreateTodoActions() {
  const [state, dispatch] = useFormState<CreateTodoFormState>(createTodo, {
    message: "",
    fields: {
      text: "",
    },
    errors: {},
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      text: state.fields.text ?? "",
    },
  });

  useLayoutEffect(() => {
    //TODO:: this should be set in useForm error prop
    if (state.errors.text?.[0]) {
      setError("text", { type: "custom", message: state.errors.text[0] });
    }
  }, [state.errors.text, setError]);

  return (
    <form
      className={`group flex w-full max-w-xl flex-col gap-2 rounded-xl border p-5 shadow-md ${isSubmitted && !isValid ? "is-invalid" : ""}`}
      onSubmit={handleSubmit(dispatch)}
    >
      <div
        className={`form-field group ${errors.text?.message ? "has-error" : ""}`}
      >
        <label htmlFor={"text"}>Text</label>
        <textarea
          {...register("text")}
          placeholder="Write text..."
          className="w-full rounded-xl border p-2 group-[.has-error]:border-red-500"
        />
        <span
          className={"hidden text-sm text-red-500 group-[.has-error]:block"}
        >
          {errors.text?.message?.toString()}
        </span>
      </div>
      <SubmitButton />
    </form>
  );
}
