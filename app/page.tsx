import { OptimisticProvider } from "./optimistic";
import { ItemForm } from "./form";
import { Table } from "./table";
import { getItems } from "./db";

export default function Home() {
  const items = getItems();
  return (
    <OptimisticProvider items={items}>
      <ItemForm />
      <Table />
    </OptimisticProvider>
  );
}
