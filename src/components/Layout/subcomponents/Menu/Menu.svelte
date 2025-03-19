<script lang="ts">
  import { FormControlDropdown } from '@/components';
  import { getTheme, setTheme } from './utils';

  interface Props {
    isOpen?: boolean;
  }

  let { isOpen = false }: Props = $props();

  let theme = $state(getTheme());

  $effect(() => {
    setTheme(theme);
  });
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
      'dark',
    ]}
    bind:value={theme}
  />
</menu>

<style lang="scss">
  @use './Menu.scss';
</style>
