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
    if (root && root !== currentRoot) {
      currentRoot = root;
      const notesFromRoot = getNotesFromRoot(root, get(notesStore));
      const scalePattern = scalePatterns[currentScaleName][currentModeName];
      const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
      store.set({ notes: scaleNotes, root, scaleName: currentScaleName, modeName: currentModeName });
    }
    if (notes && notes !== currentNotes) {
      currentNotes = notes;
      store.set({ root: currentRoot, notes, scaleName: currentScaleName, modeName: currentModeName });
    }
    if (scaleName && scaleName !== currentScaleName) {
      currentScaleName = scaleName;
      setScale({ scaleName });
    }
    if (modeName && modeName !== currentModeName) {
      currentModeName = modeName;
      setScale({ modeName });
    }
  },
  getAvailableModeNames
};

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