import { remember } from "@epic-web/remember";
import { Item } from "./types";

const items = remember("items", () => [] as Item[]);

export function getItems() {
  return items;
}

export function addItem(item: Item) {
  items.push(item);
}
