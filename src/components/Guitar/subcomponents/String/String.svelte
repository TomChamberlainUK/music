<script lang="ts">
  import Fret from '../Fret';
  import { getConsecutiveNotes } from '@/utils';
  import type { SelectedNote } from '@/types';

  export let tuning: string = 'E';
  export let numberOfFrets: number = 22;
  export let scale: string[];
  export let selectedNote: SelectedNote | null = null;
  export let highlightedNotes: SelectedNote[] = [];

  $: notes = getConsecutiveNotes(tuning, numberOfFrets + 1);
</script>

<div class="string">
  {#each notes as note}
    <Fret
      {note}
      {scale}
      {highlightedNotes}
      bind:selectedNote={selectedNote}
    />
  {/each}
</div>

<style lang="scss">
  @import './String.scss';
</style>