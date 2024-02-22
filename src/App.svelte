<script lang="ts">
  import Layout from './components/Layout/Layout.svelte';
  import Guitar from './components/Guitar/Guitar.svelte';
  import notes from './utils/notes';
  import getScale from './utils/getScale';
  import getUID from './utils/getUID';

  let root = 'C';
  let type = 'diatonic';
  let modeName: string;
  let guitarIds: number[] = [getUID()];

  const listFormatter = new Intl.ListFormat();

  function addGuitar() {
    guitarIds = [...guitarIds, getUID()];
  }

  function removeGuitar(index: number) {
    guitarIds.splice(index, 1);
    guitarIds = guitarIds;
  }

  $: scale = getScale({ root, type });
  $: mode = scale.getMode(modeName);
</script>

<Layout>
  <main class="container">
    <h1>
      Music
    </h1>
    <label>
      <span>Root</span>
      <select bind:value={root}>
        {#each notes as note}
          <option>{note}</option>
        {/each}
      </select>
    </label>
    <label>
      <span>Scale</span>
      <select
        bind:value={type}
        on:change={() => modeName = scale.modes[0].name}
      >
        <option>diatonic</option>
        <option>pentatonic</option>
      </select>
    </label>
    <label>
      <span>Mode</span>
      <select bind:value={modeName}>
        {#each scale.modes as mode}
          {#if mode}
            <option>{mode.name}</option>
          {/if}
        {/each}
      </select>
    </label>
    <h2>
      The {root} major {scale.name} scale
    </h2>
    <p>
      Featuring the notes: {listFormatter.format(scale.notes)}.
    </p>
    {#if mode}
      <h3>
        Displaying the {mode.root} {mode.name} mode
      </h3>
      <p>
        Featuring the notes: {listFormatter.format(mode.notes)}.
      </p>
      <h2>
        Guitars
      </h2>
      <div>
        {#each guitarIds as id, i (id)}
          <Guitar
            scale={mode.notes}
          />
          <button on:click={() => removeGuitar(i)}>
            Remove
          </button>
        {/each}
      </div>
      <button on:click={addGuitar}>
        Add Guitar
      </button>
    {/if}
  </main>
</Layout>
