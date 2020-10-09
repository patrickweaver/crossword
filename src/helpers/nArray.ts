export default function nArray(n: number): number[] {
  return Array.from({length: n}, (_: undefined, i: number): number => i)
}