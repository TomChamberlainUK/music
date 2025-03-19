<script lang="ts">
  import { focus, tooltip } from '@/actions';
  import { intervalNames, notes, scale } from '@/stores';
  import { getRange } from '@/utils';
  import { Config } from './subcomponents';

  const defaultTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

  let displayConfig = $state(false);
  let numberOfFrets = $state(21);
  let numberOfStrings = $state(6);
  let fretMarkers = $state(['3', '5', '7', '9', '12', '15', '17', '19', '21']);
  let tuning = $state([...defaultTuning]);
  let focussedFret: { string: number; fret: number } | null = $state(null);

  let strings = $derived(tuning
    .toReversed()
    .map(note => (
      notes.getConsecutiveNotes(note, numberOfFrets + 1)
    )));

  let frets = $derived(getRange(0, numberOfFrets, { format: 'string' }));

  function handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
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
    {#each frets as fret (fret)}
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
    {#each strings as string, stringIndex (stringIndex)}
      <div
        class="string"
        data-testId="string"
      >
        {#each string as note, fretIndex (fretIndex)}
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
              onfocus={() => focussedFret = { string: stringIndex, fret: fretIndex }}
              onblur={() => focussedFret = null}
              onkeydown={event => handleKeyboardEvent(event)}
              use:focus={{ isFocussed: focussedFret?.string === stringIndex && focussedFret?.fret === fretIndex }}
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
    {#each frets as fret (fret)}
      <div
        class="fret-marker fret-marker--bottom"
        class:isHighlighted={fretMarkers.includes(`${fret}`)}
        data-testId="fret-marker-bottom"
      ></div>
    {/each}
  </div>
  <button
    type="button"
    onclick={toggleConfig}
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
