import notes from './notes';

export default function getNotesFromRoot(root: string) {
  const rootIndex = notes.findIndex((note) => note === root);
  return [
    ...notes.slice(rootIndex),
    ...notes.slice(0, rootIndex)
  ];
}