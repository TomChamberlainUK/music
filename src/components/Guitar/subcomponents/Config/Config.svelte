<script lang="ts">
  import { FormControlCheckboxMulti, FormControlDropdown, FormControlNumber, FormGroup } from '@/components/Form';
  import { guitarTunings, notes } from '@/stores';
  import { formatOrdinal, getRange } from '@/utils';

  type Props = {
    numberOfStrings?: number;
    numberOfFrets?: number;
    tuning?: string[];
    fretMarkers?: string[];
  };

  let {
    numberOfStrings = $bindable(6),
    numberOfFrets = $bindable(21),
    tuning = $bindable(['E', 'A', 'D', 'G', 'B', 'E']),
    fretMarkers = $bindable(['3', '5', '7', '9', '12', '15', '17', '19', '21']),
  }: Props = $props();

  let selectedPreset = $state(guitarTunings.getTuningsForNumberOfStrings(numberOfStrings)[0].value);

  let frets = $derived(getRange(0, numberOfFrets, { format: 'string' }));

  $effect(() => {
    if (guitarTunings.getTuningsForNumberOfStrings(numberOfStrings).length) {
      selectedPreset = guitarTunings.getTuningsForNumberOfStrings(numberOfStrings)[0].value;
    }
  });

  $effect(() => {
    if (guitarTunings.getTuningsForNumberOfStrings(numberOfStrings).length) {
      tuning = guitarTunings.getTuning(numberOfStrings, selectedPreset);
    }
    else if (tuning.length > numberOfStrings) {
      tuning = tuning.slice(0, numberOfStrings);
    }
    else if (tuning.length < numberOfStrings) {
      tuning = [
        ...tuning,
        ...new Array(numberOfStrings - tuning.length).fill('E'),
      ];
    }
  });
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
    {#each tuning as _, index (index)}
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
