<script lang="ts">
  import { Config, String } from './subcomponents';
  import type { SelectedNote } from '@/types';

  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let displayConfig = false;


  let guitarElement: HTMLElement;

  const indicatedFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21];
</script>

<div bind:this={guitarElement}>
  <div class="guitar">
    <div class="fret-measure">
      {#each { length: numberOfFrets + 1 } as _, i}
        <div class="fret-measure__item">
          <div
            class="fret-measure__number"
            class:fret-measure__number--highlighted={indicatedFrets.includes(i)}
          >
            {i}
          </div>
          {#if indicatedFrets.includes(i)}
            <div class="fret-measure__indicator" />
          {/if}
        </div>
      {/each}
    </div>
    {#each stringTunings.toReversed() as tuning}
      <String
        {tuning}
        {numberOfFrets}
        {highlightedNotes}
        bind:selectedNote={selectedNote}
      />
    {/each}
    <div class="fret-measure">
      {#each { length: numberOfFrets + 1 } as _, i}
        <div class="fret-measure__item">
          {#if indicatedFrets.includes(i)}
            <div class="fret-measure__indicator" />
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
    />
  {/if}
</div>

<style lang="scss">
  @import './Guitar.scss';
</style>