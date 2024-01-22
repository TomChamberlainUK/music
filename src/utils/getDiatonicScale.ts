import getNotesFromRoot from './getNotesFromRoot';

export default function getDiatonicScale(root: string) {
  return getNotesFromRoot(root)
    .filter((_, i) => (
      [0, 2, 4, 5, 7, 9, 11].includes(i)
    ));
}