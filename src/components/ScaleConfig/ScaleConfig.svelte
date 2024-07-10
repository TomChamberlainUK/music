<script lang="ts">
  import type { SelectedNote } from '@/types';
  import { Dropdown, TextInput } from '@/components';
  import { highlightedNotes, mode, root, selectedNote } from '@/stores';
  import { notes } from '@/utils';
  import { getHighlightedNotes, getModeNames, getScaleNames, getScalePattern } from './utils';
  
  let scaleName: string = 'diatonic';
  
  const listFormatter = new Intl.ListFormat();
  
  const scaleNames = getScaleNames();
  
  $: modeNames = getModeNames(scaleName);
  $: scalePattern = getScalePattern(scaleName, $mode);

  $: $highlightedNotes = getHighlightedNotes($root, scalePattern);
  $: selectedNoteIsHighlighted = $highlightedNotes.some(({ value }) => value === $selectedNote?.value);
  
  function addToHighlightedNotes(note: SelectedNote) {
    $highlightedNotes = [...$highlightedNotes, note];
    selectedNote.reset();
  }

  function updateInHighlightedNote(note: SelectedNote) {
    const noteIndex = $highlightedNotes.findIndex(highlightedNote => (
      highlightedNote.value === note.value
    ));
    $highlightedNotes = [
      ...$highlightedNotes.slice(0, noteIndex),
      note,
      ...$highlightedNotes.slice(noteIndex + 1)
    ];
    selectedNote.reset();
  }

  function removeFromHighlightedNotes(note: SelectedNote) {
    const noteIndex = $highlightedNotes.findIndex(highlightedNote => (
      highlightedNote.value === note.value
    ));
    $highlightedNotes = [
      ...$highlightedNotes.slice(0, noteIndex),
      ...$highlightedNotes.slice(noteIndex + 1)
    ];
    selectedNote.reset();
  }
</script>

<form
  class="container"
  name="scale-config"
>
  <div>
    <h2>
      The {$root} {$mode} mode of the {scaleName} scale
    </h2>
    <Dropdown
      label="Root"
      options={notes}
      bind:value={$root}
    />
    <Dropdown
      label="Scale"
      options={scaleNames}
      on:change={() => $mode = modeNames[0]}
      bind:value={scaleName}
    />
    <Dropdown
      label="Mode"
      options={modeNames}
      bind:value={$mode}
    />
    <p>
      Featuring the notes: {listFormatter.format($highlightedNotes.map(({ value }) => value))}.
    </p>
  </div>
  <div>
    {#if $selectedNote}
      <h2>
        {$selectedNote.value}
      </h2>
      <div>
        <label>
          <span>Colour</span>
          <input type="color" bind:value={$selectedNote.color} />
        </label>
        <div
          class="colour-block"
          style="background-color: {$selectedNote.color};"
        />
        <span>
          {$selectedNote.color}
        </span>
      </div>
      <div>
        <TextInput
          label="Name"
          bind:value={$selectedNote.name}
        />
      </div>
      {#if !selectedNoteIsHighlighted}
        <button on:click={() => $selectedNote && addToHighlightedNotes($selectedNote)}>
          Add
        </button>
      {:else}
        <button on:click={() => $selectedNote && updateInHighlightedNote($selectedNote)}>
          Update
        </button>
        <button on:click={() => $selectedNote && removeFromHighlightedNotes($selectedNote)}>
          Remove
        </button>
      {/if}
    {/if}
  </div>
</form>

<style lang="scss">
  @import './ScaleConfig.scss';
</style>