<script lang="ts">
  import getConsecutiveNotes from '../../../../utils/getConsecutiveNotes';
  import type { SelectedNote } from '../../types/SelectedNote';

  export let tuning: string = 'E';
  export let numberOfFrets: number = 22;
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

  $: notes = getConsecutiveNotes(tuning, numberOfFrets + 1);

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

<div class="string">
  {#each notes as note}
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
  {/each}
</div>

<style lang="scss">
  @import './String.scss';
</style>