import { get, readable } from 'svelte/store';
import notesStore from './notes';

const store = readable<string[]>([
  'Root',
  'Minor 2nd',
  'Major 2nd',
  'Minor 3rd',
  'Major 3rd',
  'Perfect 4th',
  'Augmented 4th/Diminished 5th',
  'Perfect 5th',
  'Minor 6th',
  'Major 6th',
  'Minor 7th',
  'Major 7th',
]);

export default {
  ...store,
  getIntervalName: (root: string, note: string) => {
    const intervalNames = get(store);
    const consecutiveNotes = notesStore.getConsecutiveNotes(root, 12);
    const index = consecutiveNotes.indexOf(note);
    return intervalNames[index];
  },
};
