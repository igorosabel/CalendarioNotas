export function padNumber(num: number, length: number = 2): string {
  return String(num).padStart(length, '0');
}
