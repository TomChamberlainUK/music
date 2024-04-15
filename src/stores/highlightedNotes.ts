import type { SelectedNote } from '@/types';
import { writable } from 'svelte/store';

const highlightedNotes = writable<SelectedNote[]>([
  {
    color: '#ff0000',
    name: 'Root',
    value: 'C'
  },
  {
    color: '#ffffff',
    name: 'Major 2nd',
    value: 'D'
  },
  {
    color: '#ffffff',
    name: 'Major 3rd',
    value: 'E'
  },
  {
    color: '#ffffff',
    name: 'Perfect 4th',
    value: 'F'
  },
  {
    color: '#ffffff',
    name: 'Perfect 5th',
    value: 'G'
  },
  {
    color: '#ffffff',
    name: 'Major 6th',
    value: 'A'
  },
  {
    color: '#ffffff',
    name: 'Major 7th',
    value: 'B'
  }
]);

export default highlightedNotes;
