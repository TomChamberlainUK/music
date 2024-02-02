import { describe, it, expect } from 'vitest';
import getScale from '../../src/utils/getScale';
import { DiatonicScale, PentatonicScale } from '../../src/scales';

describe('getScale', () => {

  describe('When passed the type "pentatonic"', () => {
    const scale = getScale({
      root: 'C',
      type: 'pentatonic'
    });

    it('Should return a pentatonic scale', () => {
      expect(scale).toBeInstanceOf(PentatonicScale);
    });
  });

  describe('When passed the type "diatonic"', () => {
    const scale = getScale({
      root: 'C',
      type: 'diatonic'
    });

    it('Should return a diatonic scale', () => {
      expect(scale).toBeInstanceOf(DiatonicScale);
    });
  });

  describe('When passed an incorrect type', () => {
    const getScaleWithError = () => getScale({
      root: 'C',
      type: 'gin and tonic'
    });

    it('Should throw an error', () => {
      expect(getScaleWithError).toThrowError();
    });
  });

  describe('When passed a specific root', () => {
    const scale = getScale({
      root: 'G',
      type: 'pentatonic'
    });

    it('Should return a scale from that root', () => {
      expect(scale.root).toBe('G');
      expect(scale.notes).toEqual(['G', 'A', 'B', 'D', 'E']);
    });
  });
  
});