import { getScalePattern, scalePatterns } from '@/components/ScaleConfig/utils';
import { describe, expect, it } from 'vitest';

describe('getScalePattern()', () => {
  describe('When passed a valid scale and mode', () => {
    it('Should return the correct scale pattern', () => {
      const chromaticPattern = getScalePattern('chromatic', 'chromatic');
      const chromaticExpectedPattern = scalePatterns.chromatic.chromatic;
      expect(chromaticPattern).toEqual(chromaticExpectedPattern);

      const diatonicPattern = getScalePattern('diatonic', 'phrygian');
      const diatonicExpectedPattern = scalePatterns.diatonic.phrygian;
      expect(diatonicPattern).toEqual(diatonicExpectedPattern);

      const pentatonicPattern = getScalePattern('pentatonic', 'minor');
      const pentatonicExpectedPattern = scalePatterns.pentatonic.minor;
      expect(pentatonicPattern).toEqual(pentatonicExpectedPattern);
    });
  });
});