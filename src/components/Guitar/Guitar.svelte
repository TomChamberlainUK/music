<script lang="ts">
  import Config from './subcomponents/Config/Config.svelte';
  import String from './subcomponents/String/String.svelte';
  import type { SelectedNote } from './types/SelectedNote';

  export let scale: string[] = [];

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let displayConfig = false;

  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  let guitarElement: HTMLElement;

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

  function handleWindowClick({ target }: MouseEvent) {
    assertEventTargetIsNode(target);
    if (!guitarElement.contains(target)) {
      selectedNote = null;
    }
  }

  function assertEventTargetIsNode(eventTarget: EventTarget | null): asserts eventTarget is Node {
    if (!eventTarget || !('nodeType' in eventTarget)) {
      throw new Error('Expected event target to be Node');
    }
  }
</script>

<svelte:window on:click={handleWindowClick} />

<div bind:this={guitarElement}>
  <div class="guitar">
    <div class="fret-indicators">
      {#each { length: numberOfFrets + 1 } as _, i}
        <div class="fret-indicator">
          {i}
        </div>
      {/each}
    </div>
    {#each stringTunings.toReversed() as tuning}
      <String
        {tuning}
        {numberOfFrets}
        {scale}
        {highlightedNotes}
        bind:selectedNote={selectedNote}
      />
    {/each}
  </div>
  {#if selectedNote}
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
  {/if}
  <button
    on:click={() => displayConfig = !displayConfig}
    type="button"
  >
    Configure
  </button>
  {#if displayConfig}
    <Config
      bind:numberOfFrets={numberOfFrets}
      bind:numberOfStrings={numberOfStrings}
      bind:stringTunings={stringTunings}
    />
  {/if}
</div>

<style lang="scss">
  @import './Guitar.scss';
</style>