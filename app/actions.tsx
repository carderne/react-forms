"use server";

import { revalidatePath } from "next/cache";
import { type AddItemState } from "./types";
import { addItem } from "./db";
import { validateItem } from "./validate";

export async function addItemAction(
  _: AddItemState,
  formData: FormData,
): Promise<AddItemState> {
  const res = validateItem(formData);
  if (res.errors) return res;
  addItem(res.data);
  revalidatePath("/");
  return { errors: {} };
}
