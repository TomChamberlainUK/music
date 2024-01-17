<script lang="ts">
  import Layout from './components/Layout.svelte';
  import Guitar from './components/guitar/Guitar.svelte';
  import notes from './utils/notes';
  import getDiatonicScale from './utils/getDiatonicScale';

  let root = notes[0];
  let scale = 'Diatonic';

  $: diatonicScale = getDiatonicScale(root);
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
      <select bind:value={scale}>
        <option>Diatonic</option>
      </select>
    </label>
    <h2>
      Displaying the {root} diatonic scale
    </h2>
    <p>
      Featuring the notes: {new Intl.ListFormat().format(diatonicScale)}.
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
      scale={diatonicScale}
    />
  </main>
</Layout>
