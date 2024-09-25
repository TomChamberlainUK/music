import { get } from 'svelte/store';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { scale } from '@/stores';

describe('Scale Store', () => {
  const defaultRoot = 'C';
  const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const defaultScaleName = 'diatonic';
  const defaultModeName = 'ionian';

  afterEach(() => {
    scale.reset();
  });

  it('Should initialise with default properties', () => {
    const { notes, root, scaleName } = get(scale);
    expect(notes).toEqual(defaultScale);
    expect(root).toBe(defaultRoot);
    expect(scaleName).toBe(defaultScaleName);
  });

  describe('reset()', () => {
    it('Should reset values to their defaults', () => {
      scale.set({ notes: [], root: 'A', scaleName: 'pentatonic', modeName: 'minor' });
      scale.reset();
      const { notes, root, scaleName, modeName } = get(scale);
      expect(notes).toEqual(defaultScale);
      expect(root).toBe(defaultRoot);
      expect(scaleName).toBe(defaultScaleName);
      expect(modeName).toBe(defaultModeName);
    });
  });

  describe('update()', () => {
    afterEach(() => {
      scale.reset();
    });

    it('Should update the current scale notes', () => {
      scale.update(({ root, scaleName, modeName }) => ({ notes: ['C', 'D', 'E', 'G', 'A'], root, scaleName, modeName }));
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should update the current root note', () => {
      scale.update(({ notes, scaleName, modeName }) => ({ notes, root: 'D', scaleName, modeName }));
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
      scale.set({ root: 'D' });
      const { notes } = get(scale);
      expect(notes).toEqual(['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯']);
    });

    it('Should update the current notes from a scale name', () => {
      scale.set({ scaleName: 'pentatonic' });
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should update the current notes from a mode name', () => {
      scale.set({ modeName: 'dorian' });
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'D♯', 'F', 'G', 'A', 'A♯']);
    });
  });
});