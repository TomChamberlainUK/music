import { get, readable } from 'svelte/store';

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
    value: 'drop-flat-d-tuning',
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
    value: 'drop-flat-b-tuning',
    stringTunings: ['G♯', 'D♯', 'G♯', 'C♯', 'F♯']
  },
  {
    name: 'Drop G Tuning',
    value: 'drop-g-tuning',
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
    value: 'drop-flat-d-tuning',
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

const store = readable(defaultGuitarTunings);

export default {
  ...store,
  getTuningsForNumberOfStrings,
  getTuning
};

function getTuning(numberOfStrings: number, identifier: string) {
  const tuningObjects = getTuningsForNumberOfStrings(numberOfStrings);
  const { stringTunings } = tuningObjects.find(({ value }) => value === identifier) ?? {};
  return [...stringTunings ?? []];
}

function getTuningsForNumberOfStrings(numberOfStrings: number) {
  return get(store)[numberOfStrings] ?? [];
}