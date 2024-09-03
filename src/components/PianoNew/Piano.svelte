<script lang="ts">
  import { intervalNames, scale } from '@/stores';
  import { tooltip } from '@/actions';
</script>

<div
  class="piano"
  tabindex="0"
  role="listbox"
>
  {#each ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'] as note}
    <label
      class="key"
      class:key--sharp={note.includes('♯')}
      use:tooltip={{ text: $intervalNames[note] }}
    >
      <input
        class="key__input"
        type="checkbox"
        tabindex="0"
        value={note}
        bind:group={$scale}
      />
      <span class="key__label">
        {note}
      </span>
    </label>
  {/each}
</div>

<style lang="scss">
  @import './Piano.scss';
</style>