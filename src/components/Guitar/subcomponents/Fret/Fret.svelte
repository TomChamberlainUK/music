<script lang="ts">
  import type { SelectedNote } from '@/types/SelectedNote';
  import { tooltip } from '@/actions';

  export let note = 'E';
  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  function selectNote(note: string) {
    if (selectedNote && selectedNote.value === note) {
      selectedNote = null;
    } else {
      selectedNote = {
        value: note,
        name: '',
        color: '#76a0ff'
      };
    }
  }

  $: isSelected = (note: string) => (
    selectedNote?.value === note
  );

  $: isHighlighted = (note: string) => (
    highlightedNotes.some(({ value }) => value === note)
  );

  $: getHighlightedNote = (note: string) => (
    highlightedNotes.find(({ value }) => value === note)
  );

  $: getIntervalName = (note:string) => (
    getHighlightedNote(note)?.name
  );
</script>

<button
  class="fret"
  title={getHighlightedNote(note)?.name}
  on:click={() => selectNote(note)}
  use:tooltip={{ text: getIntervalName(note) }}
>
  <div
    class:fret__indicator={isHighlighted(note) || isSelected(note)}
    class:fret__indicator--selected={isSelected(note)}
    style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
  >
    {note}
  </div>
</button>

<style lang="scss">
  @import './Fret.scss';
</style>