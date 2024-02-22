<script lang="ts">
  import notes from '../utils/notes';
  import formatOrdinal from '../utils/formatOrdinal';
  import getConsecutiveNotes from '../utils/getConsecutiveNotes';

  export let scale: string[] = [];

  let displayConfig = false;

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let selectedPreset: string;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

  const tuningPresetsPerNumberOfStrings = [
    null,
    null,
    null,
    null,
    [
      {
        name: 'Standard E Tuning',
        value: 'standard-e-tuning',
        stringTunings: ['E', 'A', 'D', 'G']
      },
      {
        name: 'Flat E Tuning',
        value: 'flat-e-tuning',
        stringTunings: ['D#', 'G#', 'C#', 'F#']
      },
      {
        name: 'Standard D Tuning',
        value: 'standard-d-tuning',
        stringTunings: ['D', 'G', 'C', 'F']
      },
      {
        name: 'Drop D Tuning',
        value: 'drop-d-tuning',
        stringTunings: ['D', 'A', 'D', 'G']
      },
      {
        name: 'Drop Flat D Tuning',
        value: 'drop-flat-e-tuning',
        stringTunings: ['C#', 'G#', 'C#', 'F#']
      },
      {
        name: 'Drop C Tuning',
        value: 'drop-c-tuning',
        stringTunings: ['C', 'G', 'C', 'F']
      },
    ],
    [
      {
        name: 'Standard B Tuning',
        value: 'standard-b-tuning',
        stringTunings: ['B', 'E', 'A', 'D', 'G']
      },
      {
        name: 'Flat B Tuning',
        value: 'flat-b-tuning',
        stringTunings: ['A#', 'D#', 'G#', 'C#', 'F#']
      },
      {
        name: 'Standard A Tuning',
        value: 'standard-a-tuning',
        stringTunings: ['A', 'D', 'G', 'C', 'F']
      }
    ],
    [
      {
        name: 'Standard E Tuning',
        value: 'standard-e-tuning',
        stringTunings: ['E', 'A', 'D', 'G', 'B', 'E']
      },
      {
        name: 'Flat E Tuning',
        value: 'flat-e-tuning',
        stringTunings: ['D#', 'G#', 'C#', 'F#', 'A#', 'D#']
      },
      {
        name: 'Standard D Tuning',
        value: 'standard-d-tuning',
        stringTunings: ['D', 'G', 'C', 'F', 'A', 'D']
      },
      {
        name: 'Drop D Tuning',
        value: 'drop-d-tuning',
        stringTunings: ['D', 'A', 'D', 'G', 'B', 'E']
      },
      {
        name: 'Drop Flat D Tuning',
        value: 'drop-flat-e-tuning',
        stringTunings: ['C#', 'G#', 'C#', 'F#', 'A#', 'D#']
      },
      {
        name: 'Drop C Tuning',
        value: 'drop-c-tuning',
        stringTunings: ['C', 'G', 'C', 'F', 'A', 'D']
      }
    ]
  ];

  type SelectedNote = {
    value: string;
    name: string;
    color: string;
  };

  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  let guitarElement: HTMLElement;

  function setStringTunings(tunings: string[]) {
    stringTunings = [...tunings];
  }

  $: strings = stringTunings
    .toReversed()  
    .map(string => (
      getConsecutiveNotes(string, numberOfFrets + 1)
    ));

    
  $: tuningPresets = tuningPresetsPerNumberOfStrings[numberOfStrings];
    
  $: presetTuning = tuningPresets?.find(preset => selectedPreset === preset.value)?.stringTunings;

  $: {
    if (presetTuning) {
      setStringTunings(presetTuning);
    }
  }

  $: {
    if (tuningPresets && !tuningPresets.find(({value}) => selectedPreset === value)) {
      selectedPreset = tuningPresets[0].value;
    }
  }
    
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
        {#if tuningPresets}
          <label>
            <span>Presets:</span>
            <select bind:value={selectedPreset}>
              {#each tuningPresets as { name, value }}
                <option {value}>
                  {name}
                </option>
              {/each}
            </select>
          </label>
          <br />
          <br />
        {/if}
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

    &__indicator {
      display: grid;
      place-content: center;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background-color: rgb(255, 255, 255);
      color: var(--text-dark-contrast-locked);
      font-weight: 700;

      &--root {
        background-color: rgb(255, 0, 0);
      }

      &--selected {
        border: var(--text-light-low-emphasis-locked) 0.25rem solid;
        background-color: var(--text-light-disabled-locked);

        :global([data-theme="dark"]) & {
          color: var(--text-dark-contrast);
        }
      }
    }
  }

  .colour-block {
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }
</style>