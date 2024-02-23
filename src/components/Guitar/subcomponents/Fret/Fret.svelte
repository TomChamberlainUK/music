<script lang="ts">
  import type { SelectedNote } from '../../types/SelectedNote';

  export let note = 'E';
  export let scale: string[];
  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  function selectNote(note: string) {
    selectedNote = {
      value: note,
      name: '',
      color: '#76a0ff'
    };
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
</script>

<button
  class="fret"
  title={getHighlightedNote(note)?.name}
  on:click={() => selectNote(note)}
>
  <div
    class:fret__indicator={scale.includes(note) || isHighlighted(note) || isSelected(note)}
    class:fret__indicator--root={scale[0] === note}
    class:fret__indicator--selected={isSelected(note)}
    style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
  >
    {note}
  </div>
</button>

<style lang="scss">
  @import './Fret.scss';
</style>