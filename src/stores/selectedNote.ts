import { writable } from 'svelte/store';
import type { SelectedNote } from '@/types';

function createSelectedNote() {
  const { set, subscribe, update } = writable<SelectedNote | null>(null);

  return {
    subscribe,
    set: (value: string) => update((currentSelection) => (
      currentSelection?.value === value
        ? null
        : {
          value,
          name: '',
          color: '#76a0ff'
        }
    )),
    reset: () => set(null)
  };
}

const selectedNote = createSelectedNote();

export default selectedNote;