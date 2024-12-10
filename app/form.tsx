"use client";

import Form from "next/form";
import { useActionState, useRef } from "react";
import { useOptimisticContext } from "./optimistic";
import { AddItemState } from "./types";
import { FormError } from "./form-error";
import { FormSubmit } from "./form-submit";
import { addItemAction } from "./actions";

export function ItemForm() {
  const ref = useRef<HTMLFormElement>(null);
  const { addOptimistic } = useOptimisticContext();
  const [state, formAction] = useActionState<AddItemState, FormData>(
    addItemAction,
    {},
  );
  const optimisticAction = (formData: FormData) => {
    const data = {
      todo: formData.get("todo") as string,
    };
    addOptimistic(data);
    ref.current?.reset();
    formAction(formData);
  };
  return (
    <Form ref={ref} action={optimisticAction}>
      <FormError messages={state.errors?.todo} />
      <input
        required={true}
        name="todo"
        type="text"
        placeholder="todo here..."
        defaultValue={(state.formData?.get("todo") as string) ?? ""}
      />
      <FormSubmit text="Submit" />
    </Form>
  );
}
