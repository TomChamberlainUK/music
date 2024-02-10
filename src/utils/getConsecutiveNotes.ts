import notes from './notes';

export default function getConsecutiveNotes(root: string, count: number) {
  const rootIndex = notes.findIndex(note => note === root);
  const consecutiveNotes = [];
  for (let i = 0; i < count; i++) {
    const nextNote = notes[(rootIndex + i) % notes.length];
    consecutiveNotes.push(nextNote);
  }
  return consecutiveNotes;
}