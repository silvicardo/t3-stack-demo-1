"use client";

import { useFormState, useFormStatus } from "react-dom";
import {
  createTodo,
  type CreateTodoFormState,
} from "~/app/actions/create-todo";
import { type FormEvent, useRef, useState } from "react";
import { createTodoSchema } from "~/app/create-todo-schema";

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

export function CreateTodoActions() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState<CreateTodoFormState>(createTodo, {
    message: "",
    fields: {
      values: {
        text: "",
      },
      errors: {},
    },
  });
  const [clientFormState, setClientFormState] = useState<
    CreateTodoFormState["fields"]
  >(state.fields);

  const onClientSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parse = createTodoSchema.safeParse(clientFormState.values);
    if (!parse.success) {
      setClientFormState((prevState) => ({
        ...prevState,
        errors: parse.error.formErrors.fieldErrors,
      }));
      return;
    }
    formRef.current?.submit();
  };

  return (
    <form
      ref={formRef}
      action={dispatch}
      className={`group flex w-full max-w-xl flex-col gap-2 rounded-xl border p-5 shadow-md ${clientFormState.errors.text?.[0] ? "is-invalid" : ""}`}
      onSubmit={onClientSubmit}
      noValidate
    >
      <div className={`form-field`}>
        <label htmlFor={"text"}>Text</label>
        <textarea
          name={"text"}
          value={clientFormState.values.text}
          onChange={(e) => {
            setClientFormState(() => ({
              errors: {},
              values: {
                text: e.target.value,
              },
            }));
          }}
          placeholder="Write text..."
          className="w-full rounded-xl border p-2 group-[.is-invalid]:border-red-500"
        />
        <span
          className={"hidden text-sm text-red-500 group-[.is-invalid]:block"}
        >
          {clientFormState.errors.text?.[0]}
        </span>
      </div>
      <SubmitButton />
    </form>
  );
}
