import { createContext, useContext, useOptimistic } from "react";
import { z } from "zod";

type InferFieldErrors<T extends z.ZodType> = {
  [K in keyof z.infer<T>]?: string[] | undefined;
};

type ActionStateError<T extends z.ZodType> = {
  data?: never;
  formData?: FormData;
  errors: InferFieldErrors<T>;
};

type ActionStateSuccess<T extends z.ZodType> = {
  data: z.infer<T>;
  formData?: never;
  errors?: never;
};

export type ActionState<T extends z.ZodType> =
  | ActionStateSuccess<T>
  | ActionStateError<T>;

export function createOptimisticContext<T>() {
  type ContextType = {
    optimistic: T[];
    addOptimistic: (_: T) => void;
  };

  const Context = createContext<ContextType | undefined>(undefined);

  function OptimisticProvider({
    children,
    items,
  }: {
    children: React.ReactNode;
    items: T[];
  }) {
    const [optimistic, addOptimistic] = useOptimistic(
      items,
      (state: T[], newItem: T) => {
        return [...state, newItem];
      },
    );

    return <Context value={{ optimistic, addOptimistic }}>{children}</Context>;
  }

  function useOptimisticContext() {
    const context = useContext(Context);
    if (typeof context === "undefined") {
      throw new Error("Context must be used within provider");
    }
    return context;
  }

  return { OptimisticProvider, useOptimisticContext };
}
