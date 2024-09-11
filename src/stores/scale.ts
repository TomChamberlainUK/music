import { get, writable } from 'svelte/store';
import { getNotesFromRoot } from '@/utils';
import notes from './notes';

const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

let root = 'C';
let currentScaleName = 'diatonic';
let currentModeName = 'ionian';

type ScalePatterns = Record<string, number[]>;

const scalePatterns: Record<string, ScalePatterns> = {
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
};

const store = writable(['C', 'D', 'E', 'F', 'G', 'A', 'B']);

export default {
  ...store,
  setRoot: (note: string) => {
    root = note;
    setScale(currentScaleName, currentModeName);
  },
  setScale,
  setMode,
  getRoot: () => root,
  getScaleName: () => currentScaleName,
  getModeName: () => currentModeName,
  reset: () => {
    root = 'C';
    currentScaleName = 'diatonic';
    currentModeName = 'ionian';
    store.set(defaultScale);
  }
};

function setScale(scaleName: string, modeName?: string) {
  currentScaleName = scaleName;
  currentModeName = modeName ?? Object.keys(scalePatterns[scaleName])[0];
  const notesFromRoot = getNotesFromRoot(root, get(notes));
  const scalePattern = scalePatterns[currentScaleName][currentModeName];
  const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
  store.set(scaleNotes);
}

function setMode(modeName: string) {
  currentModeName = modeName;
  setScale(currentScaleName, currentModeName);
}