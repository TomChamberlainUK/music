<script lang="ts">
  import notes from '../utils/notes';
  import formatOrdinal from '../utils/formatOrdinal';
  import getConsecutiveNotes from '../utils/getConsecutiveNotes';

  export let scale: string[] = [];

  let displayConfig = false;

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

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
            class:scale-root-indicator={scale[0] === note}
            class:scale-note-indicator={scale.slice(1).includes(note)}
            class:scale-custom-indicator={highlightedNotes.some(({ value }) => value === note)}
            class:scale-selected-indicator={selectedNote?.value === note}
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
    <form>
      <label>
        <span>Number of Strings:</span>
        <input
          bind:value={numberOfStrings}
          on:input={() => stringTunings.length = numberOfStrings}
          type="number"
        />
      </label>
      <label>
        <span>Number of Frets:</span>
        <input
          bind:value={numberOfFrets}
          type="number"
        />
      </label>
      <fieldset>
        <legend>
          Tuning
        </legend>
        {#each { length: numberOfStrings } as _, i}
          <label>
            <span>{formatOrdinal(numberOfStrings - i)}</span>
            <select bind:value={stringTunings[i]}>
              {#each notes as note}
                <option>{note}</option>
              {/each}
            </select>
          </label>
        {/each}
      </fieldset>
    </form>
  {/if}
</div>

<style lang="scss">
  .fret-indicators {
    display: flex;
    height: 2rem;
    width: 100%;
  }

  .fret-indicator {
    display: grid;
    place-content: center;
    flex: 1 1 0px;
    height: 100%;
    color: var(--text-dark-high-emphasis);
    font-weight: 600;
  }

  .guitar {
    width: 100%;
  }
    
  .string {
    display: flex;
    height: 2rem;
    width: 100%;
  }

  .fret {
    --background-color: saddlebrown;
    all: unset;
    display: grid;
    place-content: center;
    flex: 1 1 0px;
    height: 100%;
    border: white solid 1px;
    color: var(--text-dark-low-emphasis);
    background-color: var(--background-color);
    cursor: pointer;

    &:hover {
      background-color: hsl(from var(--background-color) h s 50);
    }

    &:first-child {
      --background-color: black;
      color: var(--text-light-low-emphasis-locked);
    }

    :global([data-theme="dark"]) & {
      --background-color: black;

      &:first-child {
        --background-color: rgb(150, 150, 150);
        color: var(--text-dark-low-emphasis-locked);

        &:hover {
          background-color: hsl(from var(--background-color) h s 80);
        }
      }
    }
  }

  .scale-root-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: rgb(255, 0, 0);
    color: var(--text-dark-contrast);
    font-weight: 700;
  }

  .scale-note-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    color: var(--text-dark-contrast);
    font-weight: 700;

    :global([data-theme="dark"]) & {
      background-color: rgb(100, 100, 100);
    }
  }

  .scale-custom-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    color: var(--text-dark-contrast);
    font-weight: 700;
  }

  .scale-selected-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: var(--text-light-low-emphasis-locked) 0.25rem solid;
    color: var(--text-dark-contrast);
    background-color: var(--text-light-disabled-locked);
    font-weight: 700;
  }

  .colour-block {
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }
</style>