<script lang="ts">
  import type { SelectedNote } from '@/types';
  import { notes } from '@/utils';
  import { getHighlightedNotes, getModeNames, getScaleNames, getScalePattern } from './utils';

  export let root = 'C';
  export let highlightedNotes: SelectedNote[] = [];
  export let selectedNote: SelectedNote | null;

  let scaleName: string = 'diatonic';
  let modeName: string;
  
  const listFormatter = new Intl.ListFormat();
  
  const scaleNames = getScaleNames();
  
  $: modeNames = getModeNames(scaleName);
  $: scalePattern = getScalePattern(scaleName, modeName);

  $: highlightedNotes = getHighlightedNotes(root, scalePattern);
  $: selectedNoteIsHighlighted = highlightedNotes.some(({ value }) => value === selectedNote?.value);
  
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
</script>

<div class="container">
  <div>
    <h2>
      The {root} {modeName} mode of the {scaleName} scale
    </h2>
    <label>
      <span>Root</span>
      <select bind:value={root}>
        {#each notes as note}
          <option>{note}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Scale</span>
      <select
        bind:value={scaleName}
        on:change={() => modeName = modeNames[0]}
      >
        {#each scaleNames as scaleName}
          <option>{scaleName}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Mode</span>
      <select bind:value={modeName}>
        {#each modeNames as modeName}
          <option>{modeName}</option>
        {/each}
      </select>
    </label>
    <p>
      Featuring the notes: {listFormatter.format(highlightedNotes.map(({ value }) => value))}.
    </p>
  </div>
  <div>
    {#if selectedNote}
      <h2>
        {selectedNote.value}
      </h2>
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
    {/if}
  </div>
</div>

<style lang="scss">
  @import './ScaleConfig.scss';
</style>