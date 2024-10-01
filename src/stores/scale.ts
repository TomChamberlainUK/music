import { get, writable } from 'svelte/store';
import { getNotesFromRoot } from '@/utils';
import notesStore from './notes';

const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const defaultRoot = 'C';
const defaultScaleName = 'diatonic';
const defaultModeName = 'ionian';
const defaultModeNames = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];

let currentRoot = defaultRoot;
let currentNotes = defaultScale;
let currentScaleName = defaultScaleName;
let currentModeName = defaultModeName;
let currentModeNames = defaultModeNames;

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

const store = writable({
  notes: defaultScale,
  root: defaultRoot,
  scaleName: defaultScaleName,
  modeName: defaultModeName,
  modeNames: defaultModeNames
});

export default {
  ...store,
  reset: () => {
    currentRoot = defaultRoot;
    currentScaleName = defaultScaleName;
    currentModeName = defaultModeName;
    currentModeNames = defaultModeNames;
    store.set({
      notes: defaultScale,
      root: defaultRoot,
      scaleName: defaultScaleName,
      modeName: defaultModeName,
      modeNames: defaultModeNames
    });
  },
  set: ({ notes, root, scaleName, modeName }: { notes?: string[], root?: string, scaleName?: string, modeName?: string }) => {
    if (notes && !arraysAreEqual(notes, currentNotes)) {
      currentNotes = notes;
      store.set({
        root: currentRoot,
        notes: currentNotes,
        scaleName: currentScaleName,
        modeName: currentModeName,
        modeNames: currentModeNames
      });
      return;
    }
    if (root && root !== currentRoot) {
      currentRoot = root;
    }
    if (scaleName && scaleName !== currentScaleName) {
      currentScaleName = scaleName;
      currentModeNames = getAvailableModeNames();
      currentModeName = currentModeNames[0];
    }
    if (modeName && modeName !== currentModeName && currentModeNames.includes(modeName)) {
      currentModeName = modeName;
    }
    currentNotes = getScaleNotes();
    store.set({
      notes: currentNotes,
      root: currentRoot,
      scaleName: currentScaleName,
      modeName: currentModeName,
      modeNames: currentModeNames
    });
  }
};

function arraysAreEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) {
      return false;
    }
  }
  return true;
}

function getScaleNotes() {
  const allNotes = get(notesStore);
  const notesFromRoot = getNotesFromRoot(currentRoot, allNotes);
  const scalePattern = scalePatterns[currentScaleName][currentModeName];
  return scalePattern.map(interval => notesFromRoot[interval]);
}

function getAvailableModeNames() {
  return Object.keys(scalePatterns[currentScaleName]);
}