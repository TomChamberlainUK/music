<script lang="ts">
  import getConsecutiveNotes from '../../utils/getConsecutiveNotes';
  import Config from './subcomponents/Config/Config.svelte';

  export let scale: string[] = [];

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let displayConfig = false;
  
  type SelectedNote = {
    value: string;
    name: string;
    color: string;
  };

  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  let guitarElement: HTMLElement;

  $: strings = stringTunings
    .toReversed()
    .map(string => (
      getConsecutiveNotes(string, numberOfFrets + 1)
    ));

  $: selectedNoteIsHighlighted = highlightedNotes.some(({ value }) => value === selectedNote?.value);

  $: isSelected = (note: string) => (
    selectedNote?.value === note
  );

  $: isHighlighted = (note: string) => (
    highlightedNotes.some(({ value }) => value === note)
  );

  $: getHighlightedNote = (note: string) => (
    highlightedNotes.find(({ value }) => value === note)
  );

  function selectNote(note: string) {
    selectedNote = {
      value: note,
      name: '',
      color: '#76a0ff'
    };
  }

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
    {#each strings as string}
      <div class="string">
        {#each string as note}
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