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

  function toggleConfig() {
    displayConfig = !displayConfig;
  }
</script>

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
  {#each strings as string}
    <div
      class="string"
      data-testId="string"
    >
      {#each string as note}
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

<style lang="scss">
  @import './Guitar.scss';
</style>