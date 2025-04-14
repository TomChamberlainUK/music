import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { notes as notesStore } from '@/stores';

describe('Notes Store', () => {
  const defaultNotes = [
    'A',
    'A♯',
    'B',
    'C',
    'C♯',
    'D',
    'D♯',
    'E',
    'F',
    'F♯',
    'G',
    'G♯',
  ];

  it('Should initialise with default properties', () => {
    const notes = get(notesStore);
    expect(notes).toEqual(defaultNotes);
  });

  describe('getConsecutiveNotes()', () => {
    it('Should return all consecutive notes from a root', () => {
      const consecutiveNotes = notesStore.getConsecutiveNotes('C');
      expect(consecutiveNotes).toEqual(['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']);
    });

    it('Should return X amount of consecutive notes when passed a number', () => {
      const consecutiveNotes = notesStore.getConsecutiveNotes('G', 7);
      expect(consecutiveNotes).toEqual(['G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯']);
    });
  });
});
