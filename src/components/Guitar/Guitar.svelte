<script lang="ts">
  import { getRange } from '@/utils';
  import { Config, String } from './subcomponents';

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];
  let displayConfig = false;

  $: frets = getRange(0, numberOfFrets, { format: 'string' });
</script>

<!-- TODO: Replace test id with something accessible -->
<div data-testId="guitar">
  <div class="guitar">
    <div class="fret-markers">
      {#each frets as fret}
        <!-- TODO: Replace test id with something accessible -->
        <div class="fret-markers__item" data-testId="fret-marker">
          <div
            class="fret-markers__number"
            class:fret-markers__number--highlighted={fretMarkers.includes(fret)}
          >
            {fret}
          </div>
          {#if fretMarkers.includes(fret)}
            <div class="fret-markers__indicator" />
          {/if}
        </div>
      {/each}
    </div>
    <table class="fretboard">
      {#each stringTunings.toReversed() as tuning}
        <String
          {tuning}
          {numberOfFrets}
        />
      {/each}
    </table>
    <div class="fret-markers">
      {#each frets as fret}
        <div class="fret-markers__item">
          {#if fretMarkers.includes(fret)}
            <div class="fret-markers__indicator" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <button
    on:click={() => displayConfig = !displayConfig}
    type="button"
  >
    Configure
  </button>
  {#if displayConfig}
    <Config
      bind:numberOfFrets={numberOfFrets}
      bind:numberOfStrings={numberOfStrings}
      bind:stringTunings={stringTunings}
      bind:fretMarkers={fretMarkers}
    />
  {/if}
</div>

<style lang="scss">
  @import './Guitar.scss';
</style>