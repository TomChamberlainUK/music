<script lang="ts">
  import { FormControlDropdown } from '@/components';
  import { getTheme, setTheme } from './utils';

  export let isOpen = false;

  let theme = getTheme();

  $: setTheme(theme);
</script>

<menu
  class="container"
  class:container--open={isOpen}
>
  <FormControlDropdown
    label="Theme"
    options={[
      'system',
      'light',
      'dark'
    ]}
    bind:value={theme}
  />
</menu>

<style lang="scss">
  @import './Menu.scss';
</style>