export default function onSelectSquare(setSelectedSquare: (selectedSquare: [number, number]) => void, rowIndex: number, colIndex: number): void {
  setSelectedSquare([rowIndex, colIndex]);

}