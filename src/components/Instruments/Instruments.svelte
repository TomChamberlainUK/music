<script lang="ts">
  import { Guitar, Piano } from '@/components';
  import { getUID } from '@/utils';

  type InstrumentTypes = 'guitar' | 'piano';

  type Instrument = {
    id: number;
    type: InstrumentTypes;
  };

  let instruments: Instrument[] = [
    {
      id: getUID(),
      type: 'guitar'
    },
    {
      id: getUID(),
      type: 'piano'
    }
  ];

  function addInstrument(type: InstrumentTypes) {
    instruments = [
      ...instruments,
      {
        id: getUID(),
        type
      }
    ];
  }

  function removeInstrument(index: number) {
    instruments.splice(index, 1);
    instruments = instruments;
  }
</script>

<div>
  {#each instruments as { id, type }, i (id)}
    {#if type === 'guitar'}
      <Guitar />
    {:else if type === 'piano'}
      <Piano />
    {/if}
    <button on:click={() => removeInstrument(i)}>
      Remove
    </button>
  {/each}
</div>
<button on:click={() => addInstrument('guitar')}>
  Add Guitar
</button>
<button on:click={() => addInstrument('piano')}>
  Add Piano
</button>