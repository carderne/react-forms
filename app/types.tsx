import { z } from "zod";
import { ActionState } from "./lib";

export const addItemSchema = z.object({
  todo: z.string().min(3, { message: "Text must be longer" }),
});

export type Item = z.infer<typeof addItemSchema>;

export type AddItemState = ActionState<typeof addItemSchema>;
