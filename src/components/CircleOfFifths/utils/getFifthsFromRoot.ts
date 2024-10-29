import { notes as notesStore } from '@/stores';

export default function getFifthsFromRoot(root: string) {
  const notes = notesStore.getConsecutiveNotes(root);
  const startingIndex = notes.findIndex(note => note === root);

  let currentIndex = startingIndex;
  let iterationCount = 0;
  const output = [];

  do {
    output.push(notes[currentIndex]);
    // Prevent infinite loops
    iterationCount++;
    if (iterationCount > 12) {
      throw new Error('Iterated more than expected when generating fifths');
    }
    // Increase index by 5 and loop array when reaching the end
    currentIndex += 7;
    if (currentIndex >= notes.length) {
      currentIndex = currentIndex % notes.length;
    }
  } while (currentIndex !== startingIndex);

  return output;
}
