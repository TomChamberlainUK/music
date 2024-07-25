import { writable } from 'svelte/store';
import { getUID } from '@/utils';

type Instrument = {
  id: number;
  type: 'guitar' | 'piano';
};

const defaultInstruments: Instrument[] = [
  {
    id: getUID(),
    type: 'guitar'
  },
  {
    id: getUID(),
    type: 'piano'
  }
];

const { set, subscribe, update } = writable<Instrument[]>(defaultInstruments);

const localInstruments = window.localStorage.getItem('instruments');

function updateLocalInstruments(instruments: Instrument[]) {
  window.localStorage.setItem(
    'instruments',
    JSON.stringify(instruments)
  );
}

if (localInstruments) {
  const instruments = JSON.parse(localInstruments);
  if (instruments.length) {
    set(instruments);
  }
}

export default {
  subscribe,
  add: (type: Instrument['type']) => {
    update(instruments => {
      const updatedInstruments = [
        ...instruments,
        {
          id: getUID(),
          type
        }
      ];
      updateLocalInstruments(updatedInstruments);
      return updatedInstruments;
    });

  },
  remove: (id: number) => {
    update(instruments => {
      const index = instruments.findIndex(instrument => instrument.id === id);
      const updatedInstruments = [
        ...instruments.slice(0, index),
        ...instruments.slice(index + 1)
      ];
      updateLocalInstruments(updatedInstruments);
      return updatedInstruments;
    });
  },
  reset: () => {
    set(defaultInstruments);
  }
};