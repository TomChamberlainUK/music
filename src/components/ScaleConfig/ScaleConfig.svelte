<script lang="ts">
  import { Form, FormControlDropdown } from '@/components';
  import { notes, scale } from '@/stores';

  const listFormatter = new Intl.ListFormat('en');
</script>

<div class="container">
  <Form label="Scale Config">
    <h2>
      The {$scale.root} {$scale.modeName} mode of the {$scale.scaleName} scale
    </h2>
    <FormControlDropdown
      label="Root"
      options={$notes}
      bind:value={$scale.root}
    />
    <FormControlDropdown
      label="Scale"
      options={$scale.scaleNames}
      bind:value={$scale.scaleName}
    />
    <FormControlDropdown
      label="Mode"
      options={$scale.modeNames}
      bind:value={$scale.modeName}
    />
    <p>
      Featuring the notes: {listFormatter.format($scale.notes)}.
    </p>
  </Form>
</div>

<style lang="scss">
  @import './ScaleConfig.scss';
</style>