<script lang="ts">
  import { Dropdown, MultiCheckbox, NumberInput } from '@/components';
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

<form name="Guitar Config">
  <NumberInput
    label="Number of Strings:"
    bind:value={numberOfStrings}
    on:input={() => stringTunings.length = numberOfStrings}
  />
  <NumberInput
    label="Number of Frets:"
    bind:value={numberOfFrets}
  />
  <fieldset>
    <legend>
      Tuning
    </legend>
    {#if tuningPresets}
      <Dropdown
        label="Presets:"
        options={tuningPresets}
        bind:value={selectedPreset}
        on:change={updateStringTunings}
      />
      <br />
      <br />
    {/if}
    {#each { length: numberOfStrings } as _, i}
      <Dropdown
        label={formatOrdinal(numberOfStrings - i)}
        options={notes}
        bind:value={stringTunings[i]}
      />
    {/each}
  </fieldset>
  <fieldset>
    <legend>
      Fret Markers
    </legend>
    <MultiCheckbox
      values={frets}
      bind:checked={fretMarkers}
    />
  </fieldset>
</form>