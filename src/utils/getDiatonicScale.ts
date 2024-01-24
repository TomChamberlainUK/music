import getNotesFromRoot from './getNotesFromRoot';

export default function getDiatonicScale(root: string) {
  const notes = getNotesFromRoot(root);
  const scaleNotes = notes.filter((_, i) => (
      [0, 2, 4, 5, 7, 9, 11].includes(i)
    ));

  const modes = [
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian'
  ];

  return {
    notes: scaleNotes,
    modes
  }
}