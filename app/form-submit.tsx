"use client";

import { useFormStatus } from "react-dom";

export function FormSubmit({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Loading" : text}
    </button>
  );
}