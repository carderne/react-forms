"use client";

import { createContext, useContext, useOptimistic } from "react";
import { Item } from "./types";

type ContextType = {
  optimistic: Item[];
  addOptimistic: (_: Item) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export function OptimisticProvider({
  children,
  items,
}: {
  children: React.ReactNode;
  items: Item[];
}) {
  const [optimistic, addOptimistic] = useOptimistic(
    items,
    (state: Item[], newItem: Item) => {
      return [...state, newItem];
    }
  );

  return <Context value={{ optimistic, addOptimistic }}>{children}</Context>;
}

export function useOptimisticContext() {
  const context = useContext(Context);
  if (typeof context === "undefined") {
    throw new Error("Context must be used within provider");
  }
  return context;
}
