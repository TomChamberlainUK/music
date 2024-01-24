import getNotesFromRoot from './getNotesFromRoot';

export default function getPentatonicScale(root: string) {
  const notes = getNotesFromRoot(root)
  const scaleNotes = notes.filter((_, i) => (
      [0, 2, 4, 7, 9].includes(i)
    ));
  
  const modes = [
    'major',
    'blues major',
    'suspended',
    'blues minor',
    'minor'
  ];

  return {
    notes: scaleNotes,
    modes
  }
}