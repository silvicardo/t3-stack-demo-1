"use server";

import { api } from "~/trpc/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { TRPCError } from "@trpc/server";

type Errors = { text?: string[] | undefined };
type Fields = { text: string };

export type CreateTodoFormState = {
  message: string;
  fields: Fields;
  errors: Errors;
};

export async function createTodo(
  prevState: CreateTodoFormState,
  formValues: CreateTodoFormState["fields"] = { text: "" },
): Promise<CreateTodoFormState> {
  try {
    await api.todo.create(formValues);
    revalidatePath("");
    return {
      message: "Creation success",
      fields: {
        text: "",
      },
      errors: {},
    };
  } catch (error) {
    if (error instanceof TRPCError) {
      const response = {
        message: error.code,
        fields: formValues,
        errors: {},
      };
      if (error.cause instanceof ZodError) {
        return {
          ...response,
          errors: error.cause.formErrors.fieldErrors,
        };
      }
      return response;
    }

    return {
      message: "Generic error. Please try again.",
      fields: formValues,
      errors: {},
    };
  }
}
