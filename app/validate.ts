import { type AddItemState, addItemSchema } from "./types";

export function validateItem(formData: FormData): AddItemState {
  const formDataObj = Object.fromEntries(formData);
  const { data, error } = addItemSchema.safeParse(formDataObj);
  if (error) {
    return { formData, errors: error.flatten().fieldErrors };
  }
  return { data };
}
