"use server";

import { revalidatePath } from "next/cache";
import { AddItemState, addItemSchema } from "./types";
import { addItem } from "./db";

export async function addItemAction(
  _: AddItemState,
  formData: FormData,
): Promise<AddItemState> {
  const formDataObj = Object.fromEntries(formData);
  const { data, error } = addItemSchema.safeParse(formDataObj);
  if (error) {
    return { formData, errors: error.flatten().fieldErrors };
  }
  addItem(data);
  revalidatePath("/");
  return {};
}
