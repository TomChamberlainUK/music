import { get, writable } from 'svelte/store';
import { getNotesFromRoot } from '@/utils';
import notesStore from './notes';

const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const defaultRoot = 'C';
const defaultScaleName = 'diatonic';
const defaultModeName = 'ionian';

let currentRoot = defaultRoot;
let currentNotes = defaultScale;
let currentScaleName = defaultScaleName;
let currentModeName = defaultModeName;

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
  modeName: defaultModeName
});

export default {
  ...store,
  reset: () => {
    currentRoot = defaultRoot;
    currentScaleName = defaultScaleName;
    currentModeName = 'ionian';
    store.set({
      notes: defaultScale,
      root: defaultRoot,
      scaleName: defaultScaleName,
      modeName: defaultModeName
    });
  },
  set: ({ notes, root, scaleName, modeName }: { notes?: string[], root?: string, scaleName?: string, modeName?: string }) => {
    if (notes && !arraysAreEqual(notes, currentNotes)) {
      currentNotes = notes;
      store.set({
        root: currentRoot,
        notes: currentNotes,
        scaleName: currentScaleName,
        modeName: currentModeName
      });
    } else {
      if (root && root !== currentRoot) {
        currentRoot = root;
        setScale({ root });
      }
      if (scaleName && scaleName !== currentScaleName) {
        currentScaleName = scaleName;
        currentModeName = getAvailableModeNames()[0];
        setScale({ scaleName });
      }
      if (modeName && modeName !== currentModeName && getAvailableModeNames().includes(modeName)) {
        currentModeName = modeName;
        setScale({ modeName });
      }
    }
  },
  getAvailableModeNames
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


function setScale({
  scaleName,
  modeName,
  root
}: {
  scaleName?: string;
  modeName?: string;
  root?: string;
} = {}) {
  if (root) currentRoot = root;
  if (modeName) {
    if (!getAvailableModeNames().includes(modeName)) return;
    currentModeName = modeName;
  }
  if (scaleName) {
    currentScaleName = scaleName;
    currentModeName = getAvailableModeNames()[0];
  }
  const allNotes = get(notesStore);
  const notesFromRoot = getNotesFromRoot(currentRoot, allNotes);
  const scalePattern = scalePatterns[currentScaleName][currentModeName];
  const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
  currentNotes = scaleNotes;
  store.set({
    notes: scaleNotes,
    root: currentRoot,
    scaleName: currentScaleName,
    modeName: currentModeName
  });
}

function getAvailableModeNames() {
  return Object.keys(scalePatterns[currentScaleName]);
}