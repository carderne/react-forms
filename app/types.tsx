import { z } from "zod";

export const addItemSchema = z.object({
  todo: z.string().min(3, { message: "Text must be longer" }),
});

export type Item = z.infer<typeof addItemSchema>;

type InferFieldErrors<T extends z.ZodType> = {
  [K in keyof z.infer<T>]?: string[] | undefined;
};
export type ActionState<T extends z.ZodType> = {
  formData?: FormData;
  errors?: InferFieldErrors<T>;
  rootErrors?: string[];
};

export type AddItemState = ActionState<typeof addItemSchema>;
