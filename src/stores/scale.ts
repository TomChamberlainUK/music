import { get, writable } from 'svelte/store';
import { getNotesFromRoot } from '@/utils';
import notesStore from './notes';

const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const defaultRoot = 'C';

let currentRoot = defaultRoot;
let currentNotes = defaultScale;
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

const store = writable({
  notes: defaultScale,
  root: defaultRoot
});

export default {
  ...store,
  setScale,
  setMode,
  getRoot: () => currentRoot,
  getScaleName: () => currentScaleName,
  getModeName: () => currentModeName,
  reset: () => {
    // root = 'C';
    currentScaleName = 'diatonic';
    currentModeName = 'ionian';
    store.set({
      notes: defaultScale,
      root: defaultRoot
    });
  },
  set: ({ notes, root }: { notes?: string[], root?: string }) => {
    if (root && root !== currentRoot) {
      currentRoot = root;
      const notesFromRoot = getNotesFromRoot(root, get(notesStore));
      const scalePattern = scalePatterns[currentScaleName][currentModeName];
      const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
      store.set({ notes: scaleNotes, root });
    }
    if (notes && notes !== currentNotes) {
      currentNotes = notes;
      store.set({ root: currentRoot, notes });
    }
  }
};

function setScale(scaleName: string, {
  modeName,
  root
}: {
  modeName?: string;
  root?: string;
} = {}) {
  currentScaleName = scaleName;
  currentModeName = modeName ?? Object.keys(scalePatterns[scaleName])[0];
  currentRoot = root ?? get(store).root;
  const notesFromRoot = getNotesFromRoot(currentRoot, get(notesStore));
  const scalePattern = scalePatterns[currentScaleName][currentModeName];
  const scaleNotes = scalePattern.map(interval => notesFromRoot[interval]);
  store.set({ root: currentRoot, notes: scaleNotes });
}

function setMode(modeName: string) {
  currentModeName = modeName;
  setScale(currentScaleName, { modeName: currentModeName });
}