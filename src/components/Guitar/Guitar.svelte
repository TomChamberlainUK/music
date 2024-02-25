<script lang="ts">
  import { Config, String } from './subcomponents';
  import type { SelectedNote } from '@/types';
  // import { assertEventTargetIsNode } from '@/utils';

  export let scale: string[] = [];
  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let displayConfig = false;


  let guitarElement: HTMLElement;

  // function handleWindowClick({ target }: MouseEvent) {
  //   assertEventTargetIsNode(target);
  //   if (!guitarElement.contains(target)) {
  //     selectedNote = null;
  //   }
  // }
</script>

<!-- <svelte:window on:click={handleWindowClick} /> -->

<div bind:this={guitarElement}>
  <div class="guitar">
    <div class="fret-indicators">
      {#each { length: numberOfFrets + 1 } as _, i}
        <div class="fret-indicator">
          {i}
        </div>
      {/each}
    </div>
    {#each stringTunings.toReversed() as tuning}
      <String
        {tuning}
        {numberOfFrets}
        {scale}
        {highlightedNotes}
        bind:selectedNote={selectedNote}
      />
    {/each}
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