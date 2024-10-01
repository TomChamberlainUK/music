import { get } from 'svelte/store';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { scale } from '@/stores';

describe('Scale Store', () => {
  const defaultRoot = 'C';
  const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const defaultScaleName = 'diatonic';
  const defaultModeName = 'ionian';
  const defaultModeNames = ['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian'];

  afterEach(() => {
    scale.reset();
  });

  it('Should initialise with default properties', () => {
    const { notes, root, scaleName, modeName, modeNames } = get(scale);
    expect(notes).toEqual(defaultScale);
    expect(root).toBe(defaultRoot);
    expect(scaleName).toBe(defaultScaleName);
    expect(modeName).toBe(defaultModeName);
    expect(modeNames).toEqual(defaultModeNames);
  });

  describe('reset()', () => {
    it('Should reset values to their defaults', () => {
      scale.set({ notes: [], root: 'A', scaleName: 'pentatonic', modeName: 'minor' });
      scale.reset();
      const { notes, root, scaleName, modeName, modeNames } = get(scale);
      expect(notes).toEqual(defaultScale);
      expect(root).toBe(defaultRoot);
      expect(scaleName).toBe(defaultScaleName);
      expect(modeName).toBe(defaultModeName);
      expect(modeNames).toEqual(defaultModeNames);
    });
  });

  describe('update()', () => {
    afterEach(() => {
      scale.reset();
    });

    it('Should update the current scale notes', () => {
      scale.update(({ root, scaleName, modeName, modeNames }) => ({ notes: ['C', 'D', 'E', 'G', 'A'], root, scaleName, modeName, modeNames }));
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should update the current root note', () => {
      scale.update(({ notes, scaleName, modeName, modeNames }) => ({ notes, root: 'D', scaleName, modeName, modeNames }));
      const { root } = get(scale);
      expect(root).toBe('D');
    });
  });

  describe('set()', () => {
    afterEach(() => {
      scale.reset();
    });

    it('Should set the current scale notes', () => {
      scale.set({ notes: ['C', 'D', 'E', 'G', 'A'] });
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should update the current scale to be relative to the new root note', () => {
      const scales = [
        { root: 'A', notes: ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'] },
        { root: 'A♯', notes: ['A♯', 'C', 'D', 'D♯', 'F', 'G', 'A'] },
        { root: 'B', notes: ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'] },
        { root: 'C', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        { root: 'C♯', notes: ['C♯', 'D♯', 'F', 'F♯', 'G♯', 'A♯', 'C'] },
        { root: 'D', notes: ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'] },
        { root: 'D♯', notes: ['D♯', 'F', 'G', 'G♯', 'A♯', 'C', 'D'] },
        { root: 'E', notes: ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'] },
        { root: 'F', notes: ['F', 'G', 'A', 'A♯', 'C', 'D', 'E'] },
        { root: 'F♯', notes: ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'F'] },
        { root: 'G', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'] },
        { root: 'G♯', notes: ['G♯', 'A♯', 'C', 'C♯', 'D♯', 'F', 'G'] }
      ];
      for (const { root, notes } of scales) {
        scale.set({ root });
        const { notes: currentNotes } = get(scale);
        expect(currentNotes).toEqual(notes);
      }
    });

    it('Should update the current notes from a scale name', () => {
      const scales = [
        { scaleName: 'chromatic', notes: ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] },
        { scaleName: 'diatonic', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        { scaleName: 'pentatonic', notes: ['C', 'D', 'E', 'G', 'A'] }
      ];
      for (const { scaleName, notes } of scales) {
        scale.set({ scaleName });
        const { notes: currentNotes } = get(scale);
        expect(currentNotes).toEqual(notes);
      }
    });

    it('Should update the current notes from a mode name', () => {
      const scales = [
        { modeName: 'ionian', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
        { modeName: 'dorian', notes: ['C', 'D', 'D♯', 'F', 'G', 'A', 'A♯'] },
        { modeName: 'phrygian', notes: ['C', 'C♯', 'D♯', 'F', 'G', 'G♯', 'A♯'] },
        { modeName: 'lydian', notes: ['C', 'D', 'E', 'F♯', 'G', 'A', 'B'] },
        { modeName: 'mixolydian', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'A♯'] },
        { modeName: 'aeolian', notes: ['C', 'D', 'D♯', 'F', 'G', 'G♯', 'A♯'] },
        { modeName: 'locrian', notes: ['C', 'C♯', 'D♯', 'F', 'F♯', 'G♯', 'A♯'] }
      ];
      for (const { modeName, notes } of scales) {
        scale.set({ modeName });
        const { notes: currentNotes } = get(scale);
        expect(currentNotes).toEqual(notes);
      }
    });
  });

  describe('getAvailableModeNames()', () => {
    it('Should return the available mode names for the current scale', () => {
      const { modeNames } = get(scale);
      expect(modeNames).toEqual(['ionian', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'aeolian', 'locrian']);
    });

    it('Should update the available mode names when the scale name changes', () => {
      scale.set({ scaleName: 'pentatonic' });
      const { modeNames } = get(scale);
      expect(modeNames).toEqual(['major', 'minor']);
    });
  });
});