import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { guitarTunings as guitarTuningsStore } from '@/stores';
import { getRange } from '@/utils';
import { fiveStringGuitarTunings, fourStringGuitarTunings, sixStringGuitarTunings } from '@/data';

describe('guitarTunings', () => {  
  const defaultGuitarTunings = [
    null,
    null,
    null,
    null,
    fourStringGuitarTunings,
    fiveStringGuitarTunings,
    sixStringGuitarTunings
  ];

  it('Should initialise with default properties', () => {
    const guitarTunings = get(guitarTuningsStore);
    expect(guitarTunings).toEqual(defaultGuitarTunings);
  });

  describe('getTuningsForNumberOfStrings()', () => {
    it('Should return the tunings for a given number of strings', () => {
      const stringRange = getRange(1, 6);
      for (const numberOfStrings of stringRange) {
        const tunings = guitarTuningsStore.getTuningsForNumberOfStrings(numberOfStrings);
        expect(tunings).toEqual(defaultGuitarTunings[numberOfStrings] ?? []);
      }
    });
  });

  describe('getTuning()', () => {
    it('Should return the tuning for a given number of strings and identifier', () => {
      const stringRange = getRange(1, 6);
      for (const numberOfStrings of stringRange) {
        const tuningObjects = guitarTuningsStore.getTuningsForNumberOfStrings(numberOfStrings);
        for (const { value, stringTunings } of tuningObjects) {
          const tuning = guitarTuningsStore.getTuning(numberOfStrings, value);
          expect(tuning).toEqual(stringTunings);
        }
      }
    });
  });
});