import { writable } from 'svelte/store';

export default writable<Record<string, string>>({
  'C': 'Root',
  'D': 'Major 2nd',
  'E': 'Major 3rd',
  'F': 'Perfect 4th',
  'G': 'Perfect 5th',
  'A': 'Major 6th',
  'B': 'Major 7th'
});