<script lang="ts">
  import { CircleOfFifths, Instruments, Layout, ScaleConfig } from '@/components';
</script>

<Layout>
  <main class="container">
    <div class="header">
      <div>
        <h1>
          Music
        </h1>
        <ScaleConfig />
      </div>
      <CircleOfFifths />
    </div>
    <hr>
    <h2>
      Instruments
    </h2>
    <Instruments />
  </main>
</Layout>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
  }
</style>
