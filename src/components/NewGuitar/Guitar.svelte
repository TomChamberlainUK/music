<script lang="ts">
  import { notes, scale } from '@/stores';

  export let numberOfFrets = 22;

  const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  const strings = tuning.map(note => notes.getConsecutiveNotes(note, numberOfFrets));
</script>

<fieldset class="guitar">
  {#each strings as string}
    <div
      class="string"
      data-testId="string"
    >
      {#each string as note}
        <label class="fret">
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

<style lang="scss">
  @import './Guitar.scss';
</style>