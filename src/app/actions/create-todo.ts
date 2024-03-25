"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import { createTodoSchema } from "~/app/create-todo-schema";

export type CreateTodoFormState = {
  message: string;
  fields: {
    values: {
      text: string;
    };
    errors: { text?: string[] | undefined };
  };
};

export async function createTodo(
  prevState: CreateTodoFormState,
  formData?: FormData,
): Promise<{
  message: string;
  fields: {
    values: {
      text: string;
    };
    errors: { text?: string[] | undefined };
  };
}> {
  const values = Object.fromEntries(formData ?? [["text", ""]]) as {
    text: string;
  };
  const parse = createTodoSchema.safeParse(values);

  if (!parse.success) {
    return {
      message: parse.error.formErrors.fieldErrors.text?.[0] ?? "Invalid fields",
      fields: {
        values: {
          text: values?.text ?? "",
        },
        errors: parse.error.formErrors.fieldErrors,
      },
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    await api.todo.create({ text: parse.data.text });
    revalidatePath("");
    return {
      message: "Creation success",
      fields: {
        values: {
          text: "",
        },
        errors: {},
      },
    };
  } catch {
    return {
      message: "An error occurred. Please try again.",
      fields: {
        values: parse.data,
        errors: {},
      },
    };
  }
}
