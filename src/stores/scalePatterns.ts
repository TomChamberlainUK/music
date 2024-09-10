import { readable } from 'svelte/store';

type ScalePatterns = Record<string, number[]>;

export default readable<Record<string, ScalePatterns>>({
  chromatic: {
    chromatic: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  diatonic: {
    ionian: [0, 2, 4, 5, 7, 9, 11],
    dorian: [0, 2, 3, 5, 7, 9, 10],
    phrygian: [0, 1, 3, 5, 7, 8, 10],
    lydian: [0, 2, 4, 6, 7, 9, 11],
    mixolydian: [0, 2, 4, 5, 7, 9, 10],
    aeolian: [0, 2, 3, 5, 7, 8, 10],
    locrian: [0, 1, 3, 5, 6, 8, 10]
  },
  pentatonic: {
    major: [0, 2, 4, 7, 9],
    minor: [0, 3, 5, 7, 10]
  }
});