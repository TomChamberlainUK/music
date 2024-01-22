import getNotesFromRoot from './getNotesFromRoot';

export default function getPentatonicScale(root: string) {
  return getNotesFromRoot(root)
    .filter((_, i) => (
      [0, 2, 4, 7, 9].includes(i)
    ));
}