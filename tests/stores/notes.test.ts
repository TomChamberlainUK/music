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
    'G♯'
  ];

  it('Should initialise with default properties', () => {
    const notes = get(notesStore);
    expect(notes).toEqual(defaultNotes);
  });
});