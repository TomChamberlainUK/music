<script lang="ts">
  import { FormControlCheckboxMulti, FormControlNumber, FormGroup } from '@/components/Form';
  import { getRange } from '@/utils';

  export let numberOfStrings = 6;
  export let numberOfFrets = 21;
  export let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];

  $: frets = getRange(0, numberOfFrets, { format: 'string' });
</script>

<div data-testId="guitar-config">
  <FormControlNumber
    label="Number of Strings"
    bind:value={numberOfStrings}
  />
  <FormControlNumber
    label="Number of Frets"
    bind:value={numberOfFrets}
  />
  <FormGroup label="Fret Markers">
    <FormControlCheckboxMulti
      values={frets}
      bind:checked={fretMarkers}
    />
  </FormGroup>
</div>