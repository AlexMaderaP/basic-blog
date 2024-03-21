export default function TodosFallback({ lines }) {
  return (
    <ul>
      {Array.from({ length: lines }, (_, idx) => idx).map((idx) => (
        <li key={idx} className="skeleton"></li>
      ))}
    </ul>
  );
}
