<script lang="ts">
  import { Header, Menu } from './subcomponents';

  type Props = {
    children?: import('svelte').Snippet;
  };

  let { children }: Props = $props();

  let menuIsOpen: boolean = $state(false);

  function toggleMenu() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<div class="container" data-testid="layout">
  <Header onMenuButtonClick={toggleMenu} />
  <Menu isOpen={menuIsOpen} />
  <div class="body">
    {@render children?.()}
  </div>
  <footer class="footer">
    Tom Chamberlain
  </footer>
</div>

<style lang="scss">
  @import './Layout.scss';
</style>
