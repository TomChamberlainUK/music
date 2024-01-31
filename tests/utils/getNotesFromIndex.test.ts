import { describe, it, expect } from 'vitest';
import getNotesFromIndex from '../../src/utils/getNotesFromIndex';

describe('getNotesFromIndex', () => {

  describe('Given a root note', () => {
    it('Should return an array of chromatic notes from the chromatic scale starting at, and ending just before, a specified root note', () => {
      const notes = getNotesFromIndex(2);
      expect(notes).toEqual(['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#']);
    });
  });

  describe('Given a root note and array of notes', () => {
    it('Should return an array of those notes starting at, and ending just before, a specified root note', () => {
      const notes = getNotesFromIndex(1, ['A', 'B', 'C']);
      expect(notes).toEqual(['B', 'C', 'A']);
    });
  });

});
