export function intoMinutes(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const second = Math.floor(seconds % 60)
  return `${minutes}:${second < 10 ? '0' : ''}${second}`
}
