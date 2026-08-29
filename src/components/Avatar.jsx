const LETTER_COLORS = [
  'bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-lime-600',
  'bg-emerald-500', 'bg-teal-500', 'bg-cyan-600', 'bg-sky-600',
  'bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600',
  'bg-fuchsia-600', 'bg-pink-600',
]
function colorForLetter(letter) {
  const code = letter.toUpperCase().charCodeAt(0) - 65 
  const index = ((code % LETTER_COLORS.length) + LETTER_COLORS.length) % LETTER_COLORS.length
  return LETTER_COLORS[index]
}
function getDisplayInitial(name) {
  if (!name) return '?'
  const match = String(name).match(/[A-Za-z]/)
  if (!match) return '?'
  return match[0].toUpperCase()
}
export default function Avatar({ name, size = 12 }) {
  const initial = getDisplayInitial(name)
  const bg = colorForLetter(initial)
  return (
    <div
      className={`rounded-full ${bg} flex items-center justify-center text-white font-bold border border-white/40 shrink-0`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      aria-label={`Avatar for ${name}`}
    >
      {initial}
    </div>
  )
}
