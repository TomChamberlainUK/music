import { get, writable } from 'svelte/store';
import { getNotesFromRoot } from '@/utils';
import notesStore from './notes';

const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const defaultRoot = 'C';
const defaultScaleName = 'diatonic';

let currentRoot = defaultRoot;
let currentNotes = defaultScale;
let currentScaleName = defaultScaleName;
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

const store = writable({
  notes: defaultScale,
  root: defaultRoot,
  scaleName: defaultScaleName
});

export default {
  ...store,
  setMode,
  getModeName: () => currentModeName,
  reset: () => {
    currentRoot = defaultRoot;
    currentScaleName = defaultScaleName;
    currentModeName = 'ionian';
    store.set({
      notes: defaultScale,
      root: defaultRoot,
      scaleName: defaultScaleName
    });
  },
  set: ({ notes, root, scaleName }: { notes?: string[], root?: string, scaleName?: string }) => {
    if (root && root !== currentRoot) {
      currentRoot = root;
      const notesFromRoot = getNotesFromRoot(root, get(notesStore));
      const scalePattern = scalePatterns[currentScaleName][currentModeName];
      const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
      store.set({ notes: scaleNotes, root, scaleName: currentScaleName });
    }
    if (notes && notes !== currentNotes) {
      currentNotes = notes;
      store.set({ root: currentRoot, notes, scaleName: currentScaleName });
    }
    if (scaleName && scaleName !== currentScaleName) {
      currentScaleName = scaleName;
      setScale({ scaleName });
    }
  }
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
  if (modeName) currentModeName = modeName;
  if (scaleName) {
    currentScaleName = scaleName;
    currentModeName = Object.keys(scalePatterns[scaleName])[0];
  }
  const allNotes = get(notesStore);
  const notesFromRoot = getNotesFromRoot(currentRoot, allNotes);
  const scalePattern = scalePatterns[currentScaleName][currentModeName];
  const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
  store.set({
    notes: scaleNotes,
    root: currentRoot,
    scaleName: currentScaleName
  });
}

function setMode(modeName: string) {
  currentModeName = modeName;
  setScale({ modeName });
}