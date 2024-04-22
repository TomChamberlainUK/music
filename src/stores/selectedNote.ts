import { writable } from 'svelte/store';
import { highlightedNotes as highlightedNotesStore } from '@/stores';
import type { SelectedNote } from '@/types';

function createSelectedNote() {
  const { set, subscribe, update } = writable<SelectedNote | null>(null);

  let highlightedNotes: SelectedNote[];

  highlightedNotesStore.subscribe((value) => {
    highlightedNotes = value;
  });

  return {
    subscribe,
    select: (value: string) => update((currentSelection) => {
      const {
        name = '',
        color = '#76a0ff'
      } = highlightedNotes.find(note => note.value === value) ?? {};
      return currentSelection?.value === value
        ? null
        : {
          value,
          name,
          color
        };
    }),
    set,
    reset: () => set(null)
  };
}

const selectedNote = createSelectedNote();

export default selectedNote;