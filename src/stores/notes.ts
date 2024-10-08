import { get, readable } from 'svelte/store';

const store = readable([
  'A',
  'A♯',
  'B',
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯'
]);

export default {
  ...store,
  getConsecutiveNotes: (root: string, numberOfNotes: number) => {
    const notes = get(store);
    const rootIndex = notes.indexOf(root);
    const consecutiveNotes = [];
    for (let i = 0; i < numberOfNotes; i++) {
      const index = (rootIndex + i) % notes.length;
      const nextNote = notes[index];
      consecutiveNotes.push(nextNote);
    }
    return consecutiveNotes;
  }
};
