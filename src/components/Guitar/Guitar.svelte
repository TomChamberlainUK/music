<script lang="ts">
  import { tooltip } from '@/actions';
  import { intervalNames, notes, scale } from '@/stores';
  import { getRange } from '@/utils';
  import { Config } from './subcomponents';

  const defaultTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

  let displayConfig = false;
  let numberOfFrets = 21;
  let numberOfStrings = 6;
  let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];
  let tuning = [...defaultTuning];
  
  let focussedFret: { string: number, fret: number } | null = null;
  let fretElements: HTMLInputElement[][] = new Array(numberOfStrings)
    .fill(null)
    .map(() => new Array(numberOfFrets + 1).fill(null));
  
  $: {
    // TODO: This triggers twice due to a bug in Svelte that is fixed in v5
    if (fretElements.length > numberOfStrings) {
      fretElements = [
        ...fretElements.filter((_, index) => (
          index <= numberOfStrings // Edit this when Svelte v5 is released to be less than not less than or equal to
        ))
      ];
    } else while (fretElements.length < numberOfStrings) {
      fretElements.push(new Array(numberOfFrets + 1).fill(null));
    }
    fretElements = [...fretElements];
  }

  $: (() => {
    if (focussedFret === null) return;
    fretElements[focussedFret.string][focussedFret.fret]?.focus();
  })();

  $: strings = tuning
    .toReversed()
    .map(note => (
      notes.getConsecutiveNotes(note, numberOfFrets + 1)
    ));

  $: frets = getRange(0, numberOfFrets, { format: 'string' });

  $: {
    tuning.length = numberOfStrings;
    if (defaultTuning[numberOfStrings - 1]) {
      tuning[numberOfStrings - 1] = defaultTuning[numberOfStrings - 1];
    } else {
      tuning[numberOfStrings - 1] = 'E';
    }
  }

  function handleKeyboardEvent(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowRight':
        if (focussedFret === null) return;
        event.preventDefault();
        focussedFret.fret = focussedFret.fret < numberOfFrets
          ? focussedFret.fret + 1
          : 0;
        break;
      case 'ArrowLeft':
        if (focussedFret === null) return;
        event.preventDefault();
        focussedFret.fret = focussedFret.fret > 0
          ? focussedFret.fret - 1
          : numberOfFrets;
        break;
      case 'ArrowDown':
        if (focussedFret === null) return;
        event.preventDefault();
        focussedFret.string = focussedFret.string < numberOfStrings - 1
          ? focussedFret.string + 1
          : 0;
        break;
      case 'ArrowUp':
        if (focussedFret === null) return;
        event.preventDefault();
        focussedFret.string = focussedFret.string > 0
          ? focussedFret.string - 1
          : numberOfStrings - 1;
        break;
    }
  }

  function toggleConfig() {
    displayConfig = !displayConfig;
  }
</script>

<div>
  <div class="fret-markers">
    {#each frets as fret}
      <div
        class="fret-marker fret-marker--top"
        class:isHighlighted={fretMarkers.includes(`${fret}`)}
        data-testId="fret-marker-top"
      >
        {fret}
      </div>
    {/each}
  </div>
  <fieldset class="guitar">
    {#each strings as string, stringIndex}
      <div
        class="string"
        data-testId="string"
      >
        {#each string as note, fretIndex}
          <label
            class="fret"
            class:isRoot={$scale.root === note}
            use:tooltip={{ text: intervalNames.getIntervalName($scale.root, note) }}
          >
            <input
              class="fret__input"
              type="checkbox"
              value={note}
              bind:group={$scale.notes}
              bind:this={fretElements[stringIndex][fretIndex]}
              on:focus={() => focussedFret = { string: stringIndex, fret: fretIndex }}
              on:blur={() => focussedFret = null}
              on:keydown={event => handleKeyboardEvent(event)}
            />
            <span class="fret__label">
              {note}
            </span>
          </label>
        {/each}
      </div>
    {/each}
  </fieldset>
  <div class="fret-markers">
    {#each frets as fret}
      <div
        class="fret-marker fret-marker--bottom"
        class:isHighlighted={fretMarkers.includes(`${fret}`)}
        data-testId="fret-marker-bottom"
      />
    {/each}
  </div>
  <button
    type="button"
    on:click={toggleConfig}
  >
    Configure
  </button>
  {#if displayConfig}
    <Config
      bind:numberOfFrets={numberOfFrets}
      bind:numberOfStrings={numberOfStrings}
      bind:tuning={tuning}
      bind:fretMarkers={fretMarkers}
    />
  {/if}
</div>

<style lang="scss">
  @import './Guitar.scss';
</style>