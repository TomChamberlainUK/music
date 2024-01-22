<script lang="ts">
  import Layout from './components/Layout.svelte';
  import Guitar from './components/guitar/Guitar.svelte';
  import notes from './utils/notes';
  import Scale from './utils/Scale';

  let root = 'C';
  let type = 'diatonic';

  $: scale = new Scale({
    type,
    root
  })
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
      <select bind:value={type}>
        <option>chromatic</option>
        <option>diatonic</option>
        <option>pentatonic</option>
      </select>
    </label>
    <h2>
      Displaying the {root} {type} scale
    </h2>
    <p>
      Featuring the notes: {new Intl.ListFormat().format(scale.notes)}.
    </p>
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
      scale={scale.notes}
    />
  </main>
</Layout>
