<script lang="ts">
  import Layout from './components/Layout.svelte';
  import Guitar from './components/guitar/Guitar.svelte';
  import getScale from './utils/getScale';
  import notes from './utils/notes';

  let root = 'C';
  let type = 'diatonic';
  let modeName: string;

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
      Featuring the notes: {new Intl.ListFormat().format(scale.notes)}.
    </p>
    {#if mode}
      <h3>
        Displaying the {mode.root} {mode.name} mode
      </h3>
      <Guitar
        numberOfFrets={22}
        strings={[
          'E',
          'B',
          'G',
          'D',
          'A',
          'E',
        ]}
        scale={mode?.notes}
      />
    {/if}
  </main>
</Layout>
