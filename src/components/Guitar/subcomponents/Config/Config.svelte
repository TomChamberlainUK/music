<script lang="ts">
  import { Dropdown } from '@/components';
  import { notes, formatOrdinal, tuningPresets as tuningPresetsPerNumberOfStrings } from '@/utils';

  export let numberOfFrets = 22;
  export let numberOfStrings = 6;
  export let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  export let fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 21];

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
  <label>
    <span>Number of Strings:</span>
    <input
      bind:value={numberOfStrings}
      on:input={() => stringTunings.length = numberOfStrings}
      type="number"
    />
  </label>
  <label>
    <span>Number of Frets:</span>
    <input
      bind:value={numberOfFrets}
      type="number"
    />
  </label>
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
    {#each { length: numberOfFrets + 1 } as _, i}
      <label>
        <span>{i}</span>
        <input
          type="checkbox"
          value={i}
          bind:group={fretMarkers}
        >
      </label>
    {/each}
  </fieldset>
</form>