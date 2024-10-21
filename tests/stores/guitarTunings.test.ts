import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { guitarTunings as guitarTuningsStore } from '@/stores';

describe('guitarTunings', () => {
  const default6StringGuitarTunings = [
    {
      name: 'Standard E Tuning',
      value: 'standard-e-tuning',
      stringTunings: ['E', 'A', 'D', 'G', 'B', 'E']
    },
    {
      name: 'Flat E Tuning',
      value: 'flat-e-tuning',
      stringTunings: ['D♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯']
    },
    {
      name: 'Standard D Tuning',
      value: 'standard-d-tuning',
      stringTunings: ['D', 'G', 'C', 'F', 'A', 'D']
    },
    {
      name: 'Drop D Tuning',
      value: 'drop-d-tuning',
      stringTunings: ['D', 'A', 'D', 'G', 'B', 'E']
    },
    {
      name: 'Drop Flat D Tuning',
      value: 'drop-flat-e-tuning',
      stringTunings: ['C♯', 'G♯', 'C♯', 'F♯', 'A♯', 'D♯']
    },
    {
      name: 'Drop C Tuning',
      value: 'drop-c-tuning',
      stringTunings: ['C', 'G', 'C', 'F', 'A', 'D']
    }
  ];

  const defaultGuitarTunings = [
    null,
    null,
    null,
    null,
    null,
    null,
    default6StringGuitarTunings
  ];

  it('Should initialise with default properties', () => {
    const guitarTunings = get(guitarTuningsStore);
    expect(guitarTunings).toEqual(defaultGuitarTunings);
  });

  describe('getTunings()', () => {
    it('Should return the tunings for a given number of strings', () => {
      const tunings = guitarTuningsStore.getTunings(6);
      expect(tunings).toEqual(default6StringGuitarTunings);
    });
  });
});