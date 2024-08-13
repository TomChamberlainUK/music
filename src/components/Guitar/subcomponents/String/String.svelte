<script lang="ts">
  import Fret from '../Fret';
  import { getConsecutiveNotes } from '@/utils';

  export let tuning: string = 'E';
  export let numberOfFrets: number = 22;
  export let stringNumber: number;

  $: notes = getConsecutiveNotes(tuning, numberOfFrets + 1);
</script>

<tr
  class="string"
  data-testId="guitar-string"
>
  {#each notes as note, fretNumber}
    <Fret
      {note}
      {stringNumber}
      {fretNumber}
    />
  {/each}
</tr>

<style lang="scss">
  @import './String.scss';
</style>