<div
  class="piano"
  tabindex="0"
  role="listbox"
>
  {#each ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as note}
    <label class="key">
      <input
        class="key__input"
        type="checkbox"
        tabindex="0"
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