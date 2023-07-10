export function intoMinutes(seconds: number): string {
  return `${Math.floor(seconds / 60)}:${seconds % 60}`
}
