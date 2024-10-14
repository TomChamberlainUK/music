<script lang="ts">
  import { tooltip } from '@/actions';
  import { intervalNames, notes, scale } from '@/stores';
  import { Config } from './subcomponents';

  export let numberOfFrets = 22;

  const tuning = ['E', 'A', 'D', 'G', 'B', 'E'].reverse();
  const strings = tuning.map(note => notes.getConsecutiveNotes(note, numberOfFrets));
  const fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];

  let displayConfig = false;

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
  {#each { length: numberOfFrets} as _, fretNumber}
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
  <Config />
{/if}

<style lang="scss">
  @import './Guitar.scss';
</style>