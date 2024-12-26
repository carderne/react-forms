export function FormError({ messages }: { messages?: string[] }) {
  return (
    <div style={{ height: "2em", color: "red" }}>
      {messages?.map((message, idx) => (
        <div key={idx}>{message}</div>
      ))}
    </div>
  );
}
