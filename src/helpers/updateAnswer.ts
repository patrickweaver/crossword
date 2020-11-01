import { clueAnswer } from '../types';

export default function updateAnswer(uca: clueAnswer, newValue: string, selectionStart: number): clueAnswer {
  let editIndex = selectionStart || 0;
  const oldLength: number = uca.answer.length;
  if (newValue.length < oldLength) {
  const filler = " ".repeat(oldLength - newValue.length);
  // Deleted characters: 
    uca.answer = (newValue.slice(0, editIndex) + filler + newValue.slice(editIndex, newValue.length));
  } else {
  // Added characteres:
  // Remove character after cursor and trim
  // to the correct length
    uca.answer = (newValue.slice(0, editIndex) + newValue.slice(editIndex + 1, newValue.length)).slice(0, oldLength);
  }
  return uca;
}