<script lang="ts">
  import { Header, Menu } from './subcomponents';

  let menuIsOpen: boolean = false;

  function toggleMenu() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<div class="container" data-testid="layout">
  <Header onMenuButtonClick={toggleMenu} />
  <Menu isOpen={menuIsOpen} />
  <div class="body">
    <slot />
  </div>
  <footer class="footer">
    Tom Chamberlain
  </footer>
</div>

<style lang="scss">
  @import './Layout.scss';
</style>