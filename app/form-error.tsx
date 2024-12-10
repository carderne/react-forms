export function FormError({ messages }: { messages?: string[] }) {
  if (typeof messages === "undefined" || messages.length === 0) {
    return null;
  }
  return (
    <div>
      {messages.map((message, idx) => (
        <div key={idx}>{message}</div>
      ))}
    </div>
  );
}
