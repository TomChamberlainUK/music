<script lang="ts">
  import notes from '../utils/notes';
  import formatOrdinal from '../utils/formatOrdinal';
  import getConsecutiveNotes from '../utils/getConsecutiveNotes';

  export let scale: string[] = [];

  let displayConfig = false;

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

  $: strings = stringTunings
    .toReversed()  
    .map(string => (
      getConsecutiveNotes(string, numberOfFrets + 1)
    ));
</script>

<div>
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
        <div class="fret">
          <div
            class:scale-root-indicator={scale[0] === note}
            class:scale-note-indicator={scale.slice(1).includes(note)}
          >
            {note}
          </div>
        </div>
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
</style>