import { readable } from 'svelte/store';

const store = readable([
  {
    name: 'Standard E Tuning',
    value: 'standard-e-tuning',
    stringTunings: ['E', 'A', 'D', 'G', 'B', 'E']
  },
  {
    name: 'Flat E Tuning',
    value: 'flat-e-tuning',
    stringTunings: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#']
  },
  {
    name: 'Standard D Tuning',
    value: 'standard-d-tuning',
    stringTunings: ['D', 'G', 'C', 'F', 'A', 'D']
  },
  {
    name: 'Drop D Tuning',
    value: 'drop-d-tuning',
    stringTunings: ['D', 'A', 'D', 'G', 'B', 'E']
  },
  {
    name: 'Drop Flat D Tuning',
    value: 'drop-flat-e-tuning',
    stringTunings: ['C#', 'G#', 'C#', 'F#', 'A#', 'D#']
  },
  {
    name: 'Drop C Tuning',
    value: 'drop-c-tuning',
    stringTunings: ['C', 'G', 'C', 'F', 'A', 'D']
  }
]);

export default {
  ...store
};