import { readable } from 'svelte/store';

export default readable<string[]>([
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
  'Major 7th'
]);