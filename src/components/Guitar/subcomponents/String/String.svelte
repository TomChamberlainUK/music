<script lang="ts">
  import getConsecutiveNotes from '../../../../utils/getConsecutiveNotes';

  export let tuning: string = 'E';
  export let numberOfFrets: number = 22;
  export let scale: string[];

  $: notes = getConsecutiveNotes(tuning, numberOfFrets + 1);
</script>

<div class="string">
  {#each notes as note}
  <button
    class="fret"
  >
    <div
      class:fret__indicator={scale.includes(note)}
      class:fret__indicator--root={scale[0] === note}
    >
      {note}
    </div>
  </button>
  <!-- <button
    class="fret"
    title={getHighlightedNote(note)?.name}
    on:click={() => selectNote(note)}
  >
    <div
      class:fret__indicator={scale.includes(note) || isHighlighted(note) || isSelected(note)}
      class:fret__indicator--root={scale[0] === note}
      class:fret__indicator--selected={isSelected(note)}
      style={isHighlighted(note) ? `background-color: ${getHighlightedNote(note)?.color};` : undefined}
    >
      {note}
    </div>
  </button> -->
  {/each}
</div>

<style lang="scss">
  @import './String.scss';
</style>