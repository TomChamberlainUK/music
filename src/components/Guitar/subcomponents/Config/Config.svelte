<script lang="ts">
  import {
    Form,
    FormControlCheckboxMulti,
    FormControlDropdown,
    FormControlNumber,
    FormGroup
  } from '@/components';
  import {
    formatOrdinal,
    getRange,
    notes,
    tuningPresets as tuningPresetsPerNumberOfStrings
  } from '@/utils';

  export let numberOfFrets = 22;
  export let numberOfStrings = 6;
  export let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  export let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];

  $: frets = getRange(0, numberOfFrets, { format: 'string' });

  let selectedPreset: string;

  function setStringTunings(tunings: string[]) {
    stringTunings = [...tunings];
  }

  function updateStringTunings() {
    stringTunings = [...stringTunings];
  }

  $: tuningPresets = tuningPresetsPerNumberOfStrings[numberOfStrings];

  $: presetTuning = tuningPresets?.find(preset => selectedPreset === preset.value)?.stringTunings;

  $: {
    if (presetTuning) {
      setStringTunings(presetTuning);
    }
  }

  $: {
    if (tuningPresets && !tuningPresets.find(({value}) => selectedPreset === value)) {
      selectedPreset = tuningPresets[0].value;
    }
  }

</script>

<Form label="Guitar Config">
  <FormControlNumber
    label="Number of Strings:"
    bind:value={numberOfStrings}
    on:input={() => stringTunings.length = numberOfStrings}
  />
  <FormControlNumber
    label="Number of Frets:"
    bind:value={numberOfFrets}
  />
  <FormGroup label="Tuning">
    {#if tuningPresets}
      <FormControlDropdown
        label="Presets:"
        options={tuningPresets}
        bind:value={selectedPreset}
        on:change={updateStringTunings}
      />
      <br />
      <br />
    {/if}
    {#each { length: numberOfStrings } as _, i}
      <FormControlDropdown
        label={formatOrdinal(numberOfStrings - i)}
        options={notes}
        bind:value={stringTunings[i]}
      />
    {/each}
  </FormGroup>
  <FormGroup label="Fret Markers">
    <FormControlCheckboxMulti
      values={frets}
      bind:checked={fretMarkers}
    />
  </FormGroup>
</Form>