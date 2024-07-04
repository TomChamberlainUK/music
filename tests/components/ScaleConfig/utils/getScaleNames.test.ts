import { getScaleNames } from '@/components/ScaleConfig/utils';
import { describe, expect, it } from 'vitest';

describe('getScaleNames()', () => {
  const scaleNames = getScaleNames();

  it('Should return a list of scale names', () => {
    expect(scaleNames).toEqual([
      'chromatic',
      'diatonic',
      'pentatonic'
    ]);
  });
});