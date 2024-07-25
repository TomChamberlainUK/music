<script lang="ts">
  import type { SelectedNote } from '@/types';
  import { Form, FormControlColor, FormControlDropdown, FormControlText } from '@/components';
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

<div class="container">
  <Form label="Scale Config">
    <h2>
      The {$root} {$mode} mode of the {scaleName} scale
    </h2>
    <FormControlDropdown
      label="Root"
      options={notes}
      bind:value={$root}
    />
    <FormControlDropdown
      label="Scale"
      options={scaleNames}
      on:change={() => $mode = modeNames[0]}
      bind:value={scaleName}
    />
    <FormControlDropdown
      label="Mode"
      options={modeNames}
      bind:value={$mode}
    />
    <p>
      Featuring the notes: {listFormatter.format($highlightedNotes.map(({ value }) => value))}.
    </p>
  </Form>
  <Form label="Note Config">
    <div>
      {#if $selectedNote}
        <h2>
          {$selectedNote.value}
        </h2>
        <div>
          <FormControlColor
            label="Colour"
            bind:value={$selectedNote.color}
          />
          <div
            class="colour-block"
            style="background-color: {$selectedNote.color};"
          />
          <span>
            {$selectedNote.color}
          </span>
        </div>
        <div>
          <FormControlText
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
  </Form>
</div>

<style lang="scss">
  @import './ScaleConfig.scss';
</style>