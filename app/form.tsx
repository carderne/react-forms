"use client";

import Form from "next/form";
import { useActionState, useRef } from "react";
import { useOptimisticContext } from "./optimistic";
import { AddItemState } from "./types";
import { FormError } from "./form-error";
import { FormSubmit } from "./form-submit";
import { addItemAction } from "./actions";
import { validateItem } from "./validate";

export function ItemForm() {
  const ref = useRef<HTMLFormElement>(null);
  const { addOptimistic } = useOptimisticContext();
  const [state, formAction] = useActionState<AddItemState, FormData>(
    (prev, formData) => {
      const res = validateItem(formData);
      if (res.errors) return res;
      addOptimistic(res.data);
      ref.current?.reset();
      return addItemAction(prev, formData);
    },
    { errors: {} },
  );
  return (
    <Form ref={ref} action={formAction}>
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
