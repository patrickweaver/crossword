export default function onSelectSquare(
  selectedSquare: [number, number],
  setSelectedSquare: (selectedSquare: [number, number]) => void,
  selectedDirection: string,
  setSelectedDirection: (selectedDirection: string) => void,
  acrossWordNumber: number,
  downWordNumber: number,
): void {
  let updatedSelectedDirection = selectedDirection;
  // Cancel on double click, reset direction, don't update square
  if (acrossWordNumber === -1 && downWordNumber === -1) {
    updatedSelectedDirection = selectedDirection === "across" ? "down" : "across";
  } else {
    if (acrossWordNumber === selectedSquare[0] && downWordNumber === selectedSquare[1]) {
      updatedSelectedDirection = selectedDirection === "across" ? "down" : "across";
    } else if (selectedDirection === "none") {
      updatedSelectedDirection = "across";
    }
    setSelectedSquare([acrossWordNumber, downWordNumber]);
  }
  setSelectedDirection(updatedSelectedDirection);
}