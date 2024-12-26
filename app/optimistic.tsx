"use client";

import { createOptimisticContext } from "./lib";
import { type Item } from "./types";

export const { OptimisticProvider, useOptimisticContext } =
  createOptimisticContext<Item>();
