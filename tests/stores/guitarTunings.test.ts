import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import { guitarTunings as guitarTuningsStore } from '@/stores';

describe('guitarTunings', () => {
  const default4StringGuitarTunings = [
    {
      name: 'Standard E Tuning',
      value: 'standard-e-tuning',
      stringTunings: ['E', 'A', 'D', 'G']
    },
    {
      name: 'Flat E Tuning',
      value: 'flat-e-tuning',
      stringTunings: ['D♯', 'G♯', 'C♯', 'F♯']
    },
    {
      name: 'Standard D Tuning',
      value: 'standard-d-tuning',
      stringTunings: ['D', 'G', 'C', 'F']
    },
    {
      name: 'Drop D Tuning',
      value: 'drop-d-tuning',
      stringTunings: ['D', 'A', 'D', 'G']
    },
    {
      name: 'Drop Flat D Tuning',
      value: 'drop-flat-e-tuning',
      stringTunings: ['C♯', 'G♯', 'C♯', 'F♯']
    },
    {
      name: 'Drop C Tuning',
      value: 'drop-c-tuning',
      stringTunings: ['C', 'G', 'C', 'F']
    }
  ];
  
  const default5StringGuitarTunings = [
    {
      name: 'Standard B Tuning',
      value: 'standard-b-tuning',
      stringTunings: ['B', 'E', 'A', 'D', 'G']
    },
    {
      name: 'Flat B Tuning',
      value: 'flat-b-tuning',
      stringTunings: ['A♯', 'D♯', 'G♯', 'C♯', 'F♯']
    },
    {
      name: 'Standard A Tuning',
      value: 'standard-a-tuning',
      stringTunings: ['A', 'D', 'G', 'C', 'F']
    },
    {
      name: 'Drop A Tuning',
      value: 'drop-a-tuning',
      stringTunings: ['A', 'E', 'A', 'D', 'G']
    },
    {
      name: 'Drop Flat A Tuning',
      value: 'flat-b-tuning',
      stringTunings: ['G♯', 'D♯', 'G♯', 'C♯', 'F♯']
    },
    {
      name: 'Drop G Tuning',
      value: 'standard-a-tuning',
      stringTunings: ['G', 'D', 'G', 'C', 'F']
    }
  ];
  
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
    default4StringGuitarTunings,
    default5StringGuitarTunings,
    default6StringGuitarTunings
  ];

  it('Should initialise with default properties', () => {
    const guitarTunings = get(guitarTuningsStore);
    expect(guitarTunings).toEqual(defaultGuitarTunings);
  });

  describe('getTuningsForNumberOfStrings()', () => {
    it('Should return the tunings for a given number of strings', () => {
      for (let numberOfStrings = 1; numberOfStrings <= 6; numberOfStrings++) {
        const tunings = guitarTuningsStore.getTuningsForNumberOfStrings(numberOfStrings);
        expect(tunings).toEqual(defaultGuitarTunings[numberOfStrings] ?? []);
      }
    });
  });
});