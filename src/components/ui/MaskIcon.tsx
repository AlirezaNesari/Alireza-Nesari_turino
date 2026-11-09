export default function MaskIcon({ src, size = 16, className = '' }: { src: string; size?: number; className?: string }) {
  const mask = `url(${src}) center / contain no-repeat`
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ width: size, height: size, mask, WebkitMask: mask }}
    />
  )
}