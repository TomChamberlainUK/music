<script lang="ts">
  import { tooltip } from '@/actions';
  import { intervalNames, notes, scale } from '@/stores';
  import { Config } from './subcomponents';

  let displayConfig = false;
  let numberOfFrets = 22;
  let numberOfStrings = 6;

  const standardTuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  const fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];
  
  $: tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  $: strings = tuning
    .toReversed()
    .map(note => (
      notes.getConsecutiveNotes(note, numberOfFrets)
    ));

  $: {
    tuning.length = numberOfStrings;
    if (standardTuning[numberOfStrings - 1]) {
      tuning[numberOfStrings - 1] = standardTuning[numberOfStrings - 1];
    } else {
      tuning[numberOfStrings - 1] = 'E';
    }
  }

  
  function toggleConfig() {
    displayConfig = !displayConfig;
  }
</script>

<div class="fret-markers">
  {#each { length: numberOfFrets} as _, fretNumber}
    <div
      class="fret-marker fret-marker--top"
      class:isHighlighted={fretMarkers.includes(`${fretNumber}`)}
      data-testId="fret-marker-top"
    >
      {fretNumber}
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
  {#each { length: numberOfFrets } as _, fretNumber}
    <div
      class="fret-marker fret-marker--bottom"
      class:isHighlighted={fretMarkers.includes(`${fretNumber}`)}
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
  />
{/if}

<style lang="scss">
  @import './Guitar.scss';
</style>