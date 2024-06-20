<script lang="ts">
  import { Config, String } from './subcomponents';

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21];
  let displayConfig = false;

</script>

<!-- TODO: Replace test id with something accessible -->
<div data-testId="guitar">
  <div class="guitar">
    <div class="fret-markers">
      {#each { length: numberOfFrets + 1 } as _, i}
        <!-- TODO: Replace test id with something accessible -->
        <div class="fret-markers__item" data-testId="fret-marker">
          <div
            class="fret-markers__number"
            class:fret-markers__number--highlighted={fretMarkers.includes(i)}
          >
            {i}
          </div>
          {#if fretMarkers.includes(i)}
            <div class="fret-markers__indicator" />
          {/if}
        </div>
      {/each}
    </div>
    {#each stringTunings.toReversed() as tuning}
      <String
        {tuning}
        {numberOfFrets}
      />
    {/each}
    <div class="fret-markers">
      {#each { length: numberOfFrets + 1 } as _, i}
        <div class="fret-markers__item">
          {#if fretMarkers.includes(i)}
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