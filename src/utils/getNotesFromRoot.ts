import chromaticNotes from './notes';

export default function getNotesFromRoot(root: string, notes?: string[]) {
  const notesToProcess = notes ?? chromaticNotes;
  const rootIndex = notesToProcess.findIndex((note) => note === root);
  return [
    ...notesToProcess.slice(rootIndex),
    ...notesToProcess.slice(0, rootIndex)
  ];
}