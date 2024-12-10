"use client";

import { useOptimisticContext } from "./optimistic";

export function Table() {
  const { optimistic } = useOptimisticContext();
  return (
    <div>
      {optimistic.map((item, idx) => (
        <div key={idx}>{item.todo}</div>
      ))}
    </div>
  );
}
