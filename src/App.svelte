<script lang="ts">
  import Layout from './components/Layout.svelte';
  import Guitar from './components/Guitar.svelte';
  import notes from './utils/notes';
  import getScale from './utils/getScale';
  import getUID from './utils/getUID';

  type Guitar = {
    id: number,
  };

  let root = 'C';
  let type = 'diatonic';
  let modeName: string;

  let guitars: Guitar[] = [
    {
      id: getUID(),
    }
  ];
  
  const listFormatter = new Intl.ListFormat();

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
        {#each guitars as guitar, i (guitar.id)}
          <Guitar
            scale={mode.notes}
          />
          <button
            on:click={() => {
              guitars.splice(i, 1);
              guitars = guitars;
            }}
          >
            Remove
          </button>
        {/each}
      </div>
      <button
        on:click={() => {
          guitars.push({
            id: getUID(),
          });
          guitars = guitars;
        }}
      >
        Add Guitar
      </button>
    {/if}
  </main>
</Layout>
