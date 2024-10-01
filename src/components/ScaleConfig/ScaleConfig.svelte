<script lang="ts">
  import { Form, FormControlDropdown } from '@/components';
  import { scale } from '@/stores';
  import { notes } from '@/utils';

  const listFormatter = new Intl.ListFormat();
</script>

<div class="container">
  <Form label="Scale Config">
    <h2>
      The {$scale.root} {$scale.modeName} mode of the {$scale.scaleName} scale
    </h2>
    <FormControlDropdown
      label="Root"
      options={notes}
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