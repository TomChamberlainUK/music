import chromaticNotes from './notes';

export default function getNotesFromIndex(index: number, notes?: string[]) {
  const notesToProcess = notes ?? chromaticNotes;
  return [
    ...notesToProcess.slice(index),
    ...notesToProcess.slice(0, index)
  ];
}