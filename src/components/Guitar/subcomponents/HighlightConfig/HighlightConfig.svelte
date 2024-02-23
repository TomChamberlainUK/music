<script lang="ts">
  import type { SelectedNote } from '../../types/SelectedNote';

  export let highlightedNotes: SelectedNote[] = [];
  export let selectedNote: SelectedNote;

  function highlightNote(note: SelectedNote) {
    const noteIndex = highlightedNotes.findIndex(highlightedNote => highlightedNote.value === note.value);
    const noteIsAlreadyHighlighted = noteIndex > -1;
    if (!noteIsAlreadyHighlighted) {
      highlightedNotes = [...highlightedNotes, note];
    } else {
      highlightedNotes = [
        ...highlightedNotes.slice(0, noteIndex),
        ...highlightedNotes.slice(noteIndex + 1)
      ];
    }
  }

  $: selectedNoteIsHighlighted = highlightedNotes.some(({ value }) => value === selectedNote?.value);
</script>

<div>
  <h1>
    {selectedNote.value}
  </h1>
  <div>
    <label>
      <span>Colour</span>
      <input type="color" bind:value={selectedNote.color} />
    </label>
    <div
      class="colour-block"
      style="background-color: {selectedNote.color};"
    />
    <span>
      {selectedNote.color}
    </span>
  </div>
  <div>
    <label>
      <span>Name</span>
      <input type="text" bind:value={selectedNote.name} />
    </label>
  </div>
  <button on:click={() => selectedNote && highlightNote(selectedNote)}>
    {selectedNoteIsHighlighted ? 'Remove' : 'Add'}
  </button>
  <hr>
</div>

<style lang="scss">
  @import './HighlightConfig.scss';
</style>