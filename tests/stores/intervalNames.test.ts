import { intervalNames as intervalNamesStore } from '@/stores';
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';

describe('intervalNames Store', () => {
  const defaultIntervalNames = [
    'Root',
    'Minor 2nd',
    'Major 2nd',
    'Minor 3rd',
    'Major 3rd',
    'Perfect 4th',
    'Augmented 4th/Diminished 5th',
    'Perfect 5th',
    'Minor 6th',
    'Major 6th',
    'Minor 7th',
    'Major 7th',
  ];

  it('Should initialise with default properties', () => {
    const intervalNames = get(intervalNamesStore);
    expect(intervalNames).toEqual(defaultIntervalNames);
  });

  describe('getIntervalName()', () => {
    it('Should return the interval name for a given root and note', () => {
      const intervals = [
        { root: 'C', note: 'C', interval: 'Root' },
        { root: 'C', note: 'C♯', interval: 'Minor 2nd' },
        { root: 'C', note: 'D', interval: 'Major 2nd' },
        { root: 'C', note: 'D♯', interval: 'Minor 3rd' },
        { root: 'C', note: 'E', interval: 'Major 3rd' },
        { root: 'C', note: 'F', interval: 'Perfect 4th' },
        { root: 'C', note: 'F♯', interval: 'Augmented 4th/Diminished 5th' },
        { root: 'C', note: 'G', interval: 'Perfect 5th' },
        { root: 'C', note: 'G♯', interval: 'Minor 6th' },
        { root: 'C', note: 'A', interval: 'Major 6th' },
        { root: 'C', note: 'A♯', interval: 'Minor 7th' },
        { root: 'C', note: 'B', interval: 'Major 7th' },
        { root: 'A', note: 'A', interval: 'Root' },
        { root: 'A', note: 'A♯', interval: 'Minor 2nd' },
        { root: 'A', note: 'B', interval: 'Major 2nd' },
        { root: 'A', note: 'C', interval: 'Minor 3rd' },
        { root: 'A', note: 'C♯', interval: 'Major 3rd' },
        { root: 'A', note: 'D', interval: 'Perfect 4th' },
        { root: 'A', note: 'D♯', interval: 'Augmented 4th/Diminished 5th' },
        { root: 'A', note: 'E', interval: 'Perfect 5th' },
        { root: 'A', note: 'F', interval: 'Minor 6th' },
        { root: 'A', note: 'F♯', interval: 'Major 6th' },
        { root: 'A', note: 'G', interval: 'Minor 7th' },
        { root: 'A', note: 'G♯', interval: 'Major 7th' },
      ];
      for (const { root, note, interval } of intervals) {
        const intervalName = intervalNamesStore.getIntervalName(root, note);
        expect(intervalName).toBe(interval);
      }
    });
  });
});
