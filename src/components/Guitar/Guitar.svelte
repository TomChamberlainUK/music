<script lang="ts">
  import Config from './subcomponents/Config/Config.svelte';
  import HighlightConfig from './subcomponents/HighlightConfig/HighlightConfig.svelte';
  import String from './subcomponents/String/String.svelte';
  import assertEventTargetIsNode from '../../utils/assertEventTargetIsNode';
  import type { SelectedNote } from './types/SelectedNote';

  export let scale: string[] = [];

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let displayConfig = false;

  let selectedNote: SelectedNote | null = null;
  let highlightedNotes: SelectedNote[] = [];

  let guitarElement: HTMLElement;

  function handleWindowClick({ target }: MouseEvent) {
    assertEventTargetIsNode(target);
    if (!guitarElement.contains(target)) {
      selectedNote = null;
    }
  }
</script>

<svelte:window on:click={handleWindowClick} />

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
  {#if selectedNote}
    <HighlightConfig
      {selectedNote}
      bind:highlightedNotes={highlightedNotes}
    />
  {/if}
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