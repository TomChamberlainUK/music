import { get } from 'svelte/store';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { scale } from '@/stores';

describe('Scale Store', () => {
  const defaultRoot = 'C';
  const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  afterEach(() => {
    scale.reset();
  });

  it('Should initialise with default properties', () => {
    const { notes, root } = get(scale);
    expect(notes).toEqual(defaultScale);
    expect(root).toBe(defaultRoot);
  });

  describe('getRoot()', () => {
    it('Should return the current root note', () => {
      const root = scale.getRoot();
      expect(root).toBe('C');
    });
  });

  describe('getScaleName()', () => {
    it('Should return the current scale name', () => {
      const scaleName = scale.getScaleName();
      expect(scaleName).toBe('diatonic');
    });
  });

  describe('getModeName()', () => {
    it('Should return the current mode name', () => {
      const modeName = scale.getModeName();
      expect(modeName).toBe('ionian');
    });
  });

  describe('reset()', () => {
    it('Should reset values to their defaults', () => {
      scale.set({ notes: [], root: 'A' });
      scale.reset();
      const { notes, root } = get(scale);
      expect(notes).toEqual(defaultScale);
      expect(root).toBe('C');
      expect(scale.getScaleName()).toBe('diatonic');
      expect(scale.getModeName()).toBe('ionian');
    });
  });

  describe('setScale()', () => {
    it('Should set the current scale notes based on a scale name', () => {
      const { root } = get(scale);
      scale.setScale('pentatonic');
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should set the current scale notes based on a scale and mode name', () => {
      scale.setScale('pentatonic', { modeName: 'minor' });
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D♯', 'F', 'G', 'A♯']);
    });
  });

  describe('setMode()', () => {
    it('Should set the current scale notes based on a mode name', () => {
      scale.setMode('dorian');
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'D♯', 'F', 'G', 'A', 'A♯']);
    });
  });

  describe('update()', () => {
    it('Should update the current scale notes', () => {
      scale.update(({ root }) => ({ root, notes: ['C', 'D', 'E', 'G', 'A'] }));
      const { notes } = get(scale);
      expect(notes).toEqual(['C', 'D', 'E', 'G', 'A']);
    });

    it('Should update the current root note', () => {
      scale.update(({ notes }) => ({ notes, root: 'D' }));
      const { root } = get(scale);
      expect(root).toBe('D');
    });
  });

  describe('set()', () => {
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
  });
});