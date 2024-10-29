import { get, readable } from 'svelte/store';
import { fiveStringGuitarTunings, fourStringGuitarTunings, sixStringGuitarTunings } from '@/data';

const store = readable([
  null,
  null,
  null,
  null,
  fourStringGuitarTunings,
  fiveStringGuitarTunings,
  sixStringGuitarTunings,
]);

export default {
  ...store,
  getTuningsForNumberOfStrings,
  getTuning,
};

function getTuning(numberOfStrings: number, identifier: string) {
  const tuningObjects = getTuningsForNumberOfStrings(numberOfStrings);
  const { stringTunings } = tuningObjects.find(({ value }) => value === identifier) ?? {};
  return [...stringTunings ?? []];
}

function getTuningsForNumberOfStrings(numberOfStrings: number) {
  return get(store)[numberOfStrings] ?? [];
}
