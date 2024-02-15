<script lang="ts">
  import notes from '../utils/notes';
  import formatOrdinal from '../utils/formatOrdinal';
  import getConsecutiveNotes from '../utils/getConsecutiveNotes';

  export let scale: string[] = [];

  let displayConfig = false;

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

  let highlightedNotes: string[] = [];
  let showNoteMenu = true;
  let rgb: number[] = [255, 0, 0];

  $: strings = stringTunings
    .toReversed()  
    .map(string => (
      getConsecutiveNotes(string, numberOfFrets + 1)
    ));
  
  $: colour = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
</script>

<div>
  {#if showNoteMenu}
    <div>
      rgb:
      <input
        type="range"
        max="255"
        min="0"
        step="1"
        bind:value={rgb[0]}
      />
      <input
        type="range"
        max="255"
        min="0"
        step="1"
        bind:value={rgb[1]}
      />
      <input
        type="range"
        max="255"
        min="0"
        step="1"
        bind:value={rgb[2]}
      />
      <div
        class="colour-block"
        style="background-color: {colour};"
      />
    </div>
  {/if}
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
          on:click={() => {
            if (!highlightedNotes.includes(note)) {
              highlightedNotes = [...highlightedNotes, note];
            } else {
              const noteIndex = highlightedNotes.findIndex(highlightedNote => highlightedNote === note);
              highlightedNotes = [
                ...highlightedNotes.slice(0, noteIndex),
                ...highlightedNotes.slice(noteIndex + 1)
              ];
            }
          }}
        >
          <div
            class:scale-root-indicator={scale[0] === note}
            class:scale-note-indicator={scale.slice(1).includes(note)}
            class:scale-custom-indicator={highlightedNotes.includes(note)}
            style={highlightedNotes.includes(note) ? `background-color: ${colour};` : undefined}
          >
            {note}
          </div>
        </button>
        {/each}
      </div>
    {/each}
  </div>
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
    background-color: saddlebrown;

    :global([data-theme="dark"]) & {
      background-color: transparent;
    }
  }

  .fret {
    all: unset;
    display: grid;
    place-content: center;
    flex: 1 1 0px;
    height: 100%;
    border: white solid 1px;
    color: var(--text-dark-low-emphasis);

    &:first-child {
      background-color: black;
      color: var(--text-light-low-emphasis-locked);

      :global([data-theme="dark"]) & {
        color: var(--text-dark-low-emphasis-locked);
        background-color: rgb(255, 255, 255);
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

  .colour-block {
    display: inline-block;
    width: 1rem;
    height: 1rem;
  }
</style>