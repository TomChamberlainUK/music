<script lang="ts">
  import { FormControlCheckboxMulti, FormControlDropdown, FormControlNumber, FormGroup } from '@/components/Form';
  import { guitarTunings, notes } from '@/stores';
  import { formatOrdinal, getRange } from '@/utils';

  export let numberOfStrings = 6;
  export let numberOfFrets = 21;
  export let tuning = ['E', 'A', 'D', 'G', 'B', 'E'];
  export let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];

  let selectedPreset = guitarTunings.getTuningsForNumberOfStrings(numberOfStrings)[0].value;

  $: frets = getRange(0, numberOfFrets, { format: 'string' });

  $: {
    if (guitarTunings.getTuningsForNumberOfStrings(numberOfStrings).length) {
      selectedPreset = guitarTunings.getTuningsForNumberOfStrings(numberOfStrings)[0].value;
    }
  }

  $: {
    if (guitarTunings.getTuningsForNumberOfStrings(numberOfStrings).length) {
      tuning = guitarTunings.getTuning(numberOfStrings, selectedPreset);
    }
  }
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
  <FormGroup label="Tuning">
    <FormControlDropdown
      label="Presets"
      options={guitarTunings.getTuningsForNumberOfStrings(numberOfStrings)}
      bind:value={selectedPreset}
    />
    <br />
    <br />
    {#each { length: numberOfStrings } as _, index}
      <FormControlDropdown
        label={formatOrdinal(numberOfStrings - index)}
        options={$notes}
        bind:value={tuning[index]}
      />
    {/each}
  </FormGroup>
  <FormGroup label="Fret Markers">
    <FormControlCheckboxMulti
      values={frets}
      bind:checked={fretMarkers}
    />
  </FormGroup>
</div>
