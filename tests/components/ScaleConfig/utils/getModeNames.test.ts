import { getModeNames } from '@/components/ScaleConfig/utils';
import { describe, expect, it } from 'vitest';

describe('getModeNames()', () => {
  describe('When called with the chromatic scale', () => {
    const modes = getModeNames('chromatic');

    it('Should return a list of chromatic modes', () => {
      expect(modes).toEqual(['chromatic']);
    });
  });

  describe('When called with the diatonic scale', () => {
    const modes = getModeNames('diatonic');

    it('Should return a list of diatonic modes', () => {
      expect(modes).toEqual([
        'ionian',
        'dorian',
        'phrygian',
        'lydian',
        'mixolydian',
        'aeolian',
        'locrian'
      ]);
    });
  });
  
  describe('When called with the pentatonic scale', () => {
    const modes = getModeNames('pentatonic');

    it('Should return a list of pentatonic modes', () => {
      expect(modes).toEqual([
        'major',
        'minor'
      ]);
    });
  });
});