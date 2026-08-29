export default function HighlightText({ text, query }) {
  const trimmed = query?.trim()
  if (!trimmed) return <>{text}</>
  const parts = String(text).split(new RegExp(`(${trimmed})`, 'gi'))
  if (parts.length === 1) return <>{text}</>
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>{part}</span>
      ))}
    </>
  )
}
