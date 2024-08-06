<script lang="ts">
  import Fret from '../Fret';
  import { getConsecutiveNotes } from '@/utils';

  export let tuning: string = 'E';
  export let numberOfFrets: number = 22;

  $: notes = getConsecutiveNotes(tuning, numberOfFrets + 1);
</script>

<tr class="string" data-testId="guitar-string">
  {#each notes as note}
    <Fret {note} />
  {/each}
</tr>

<style lang="scss">
  @import './String.scss';
</style>