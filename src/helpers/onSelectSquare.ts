export default function onSelectSquare(
  selectedSquare: [number, number],
  setSelectedSquare: (selectedSquare: [number, number]) => void,
  selectedDirection: string,
  setSelectedDirection: (selectedDirection: string) => void,
  rowIndex: number,
  colIndex: number
): void {
  let updatedSelectedDirection = selectedDirection;
  if (rowIndex === selectedSquare[0] && colIndex === selectedSquare[1]) {
    updatedSelectedDirection = selectedDirection === "across" ? "down" : "across";
  }
  setSelectedDirection(updatedSelectedDirection);
  setSelectedSquare([rowIndex, colIndex]);
}