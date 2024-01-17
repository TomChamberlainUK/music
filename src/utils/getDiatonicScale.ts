import notes from './notes';

export default function getDiatonicScale(root: string) {
  const rootIndex = notes.findIndex((note) => note === root);
  const notesFromRoot = [
    ...notes.slice(rootIndex),
    ...notes.slice(0, rootIndex)
  ];
  const diatonicNotes = notesFromRoot.filter((_, i) => (
    [0, 2, 4, 5, 7, 9, 11].includes(i)
  ));
  return diatonicNotes;
}