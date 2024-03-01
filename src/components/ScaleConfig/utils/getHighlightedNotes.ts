import { getNotesFromRoot } from '@/utils';

export default function getHighlightedNotes(root: string, scalePattern: number[] = []) {
  const noteValues = getNotesFromRoot(root);
  const notes = [
    {
      value: noteValues[0],
      name: 'Root'
    },
    {
      value: noteValues[1],
      name: 'Minor 2nd'
    },
    {
      value: noteValues[2],
      name: 'Major 2nd'
    },
    {
      value: noteValues[3],
      name: 'Minor 3rd'
    },
    {
      value: noteValues[4],
      name: 'Major 3rd'
    },
    {
      value: noteValues[5],
      name: 'Perfect 4th'
    },
    {
      value: noteValues[6],
      name: 'Augmented 4th/Diminished 5th'
    },
    {
      value: noteValues[7],
      name: 'Perfect 5th'
    },
    {
      value: noteValues[8],
      name: 'Minor 6th'
    },
    {
      value: noteValues[9],
      name: 'Major 6th'
    },
    {
      value: noteValues[10],
      name: 'Minor 7th'
    },
    {
      value: noteValues[11],
      name: 'Major 7th'
    },
  ];

  const highlightedNotes = notes
    .filter((note, i) => scalePattern.includes(i))
    .map(({ value, name }, i) => (
      i === 0
        ? {
          color: '#ff0000',
          name,
          value
        }
        : {
          color: '#ffffff',
          name,
          value
        }
    ));
  return highlightedNotes;
}