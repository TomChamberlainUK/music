import { writable } from 'svelte/store';
import type { SelectedNote } from '@/types';

function createSelectedNote() {
  const { set, subscribe, update } = writable<SelectedNote | null>(null);

  return {
    subscribe,
    select: (value: string) => update((currentSelection) => {
      return currentSelection?.value === value
        ? null
        : {
          value,
          name: '',
          color: '#76a0ff'
        };
    }),
    set,
    reset: () => set(null)
  };
}

const selectedNote = createSelectedNote();

export default selectedNote;