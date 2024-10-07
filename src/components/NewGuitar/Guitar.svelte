<script lang="ts">
  import { getConsecutiveNotes } from '@/utils';

  export let numberOfFrets = 22;

  const tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  const strings = tuning.map(note => getConsecutiveNotes(note, numberOfFrets));
</script>

<fieldset>
  {#each strings as string}
    <div data-testId="string">
      {#each string as note}
        <label>
          <span>
            {note}
          </span>
          <input type="checkbox" />
        </label>
      {/each}
    </div>
  {/each}
</fieldset>