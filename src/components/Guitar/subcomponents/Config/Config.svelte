<script lang="ts">
  import { notes, formatOrdinal, tuningPresets as tuningPresetsPerNumberOfStrings } from '@/utils';

  export let numberOfFrets = 22;
  export let numberOfStrings = 6;
  export let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];

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

<form>
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
      <label>
        <span>Presets:</span>
        <select
          bind:value={selectedPreset}
          on:change={updateStringTunings}
        >
          {#each tuningPresets as { name, value }}
            <option {value}>
              {name}
            </option>
          {/each}
        </select>
      </label>
      <br />
      <br />
    {/if}
    {#each { length: numberOfStrings } as _, i}
      <label>
        <span>{formatOrdinal(numberOfStrings - i)}</span>
        <select bind:value={stringTunings[i]}>
          {#each notes as note}
            <option>{note}</option>
          {/each}
        </select>
      </label>
    {/each}
  </fieldset>
</form>