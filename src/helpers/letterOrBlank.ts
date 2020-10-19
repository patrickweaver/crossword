// Return either the letter passed in or a space char if null

export default function letterOrBlank(letter: (string | null)): string {
  return (letter || " ");
}