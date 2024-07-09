import { writable } from 'svelte/store';
import { getUID } from '@/utils';

type Instrument = {
  id: number;
  type: 'guitar' | 'piano';
};

const { subscribe, update } = writable<Instrument[]>([
  {
    id: getUID(),
    type: 'guitar'
  },
  {
    id: getUID(),
    type: 'piano'
  }
]);

export default {
  subscribe,
  add: (type: Instrument['type']) => {
    update(instruments => (
      [
        ...instruments,
        {
          id: getUID(),
          type
        }
      ]
    ));
  },
  remove: (id: number) => {
    update(instruments => {
      const index = instruments.findIndex(instrument => instrument.id === id);
      return [
        ...instruments.slice(0, index),
        ...instruments.slice(index + 1)
      ];
    });
  }
};