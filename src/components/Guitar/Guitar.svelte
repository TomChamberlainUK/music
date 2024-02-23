<script lang="ts">
  import notes from '../../utils/notes';
  import formatOrdinal from '../../utils/formatOrdinal';
  import getConsecutiveNotes from '../../utils/getConsecutiveNotes';
  import tuningPresetsPerNumberOfStrings from '../../utils/tuningPresets';

  export let scale: string[] = [];

  let displayConfig = false;

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let selectedPreset: string;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

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

  function updateStringTunings() {
    stringTunings = [...stringTunings];
  }

  $: console.log(stringTunings);

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
            <select
              bind:value={selectedPreset}
              on:change={updateStringTunings}
            >
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
  @import './Guitar.scss';
</style>