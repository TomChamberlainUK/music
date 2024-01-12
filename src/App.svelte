<script lang="ts">
  import Layout from './components/Layout.svelte';

  const notes = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#'
  ];

  // 6 String Guitar
  const strings = [
    getStringNotes('E'),
    getStringNotes('B'),
    getStringNotes('G'),
    getStringNotes('D'),
    getStringNotes('A'),
    getStringNotes('E'),
  ];

  // 5 String Bass
  // const strings = [
  //   getStringNotes('G'),
  //   getStringNotes('D'),
  //   getStringNotes('A'),
  //   getStringNotes('E'),
  //   getStringNotes('B'),
  // ];

  let root = notes[0];
  $: majorThird = getMajorThird(root);
  $: perfectFifth = getPerfectFifth(root);

  function getMajorThird(root: string) {
    const rootIndex = notes.findIndex(note => note === root);
    return notes[(rootIndex + 4) % notes.length];
  }

  function getPerfectFifth(root: string) {
    const rootIndex = notes.findIndex(note => note === root);
    return notes[(rootIndex + 7) % notes.length];
  }

  function getStringNotes(root: string) {
    const rootIndex = notes.findIndex(note => note === root);
    const stringNotes = [];
    for (let i = 0; i < 22; i++) {
      const nextNote = notes[(rootIndex + i) % notes.length];
      stringNotes.push(nextNote);
    }
    return stringNotes;
  }
</script>

<Layout>
  <main class="container">
    <h1>
      Music
    </h1>
    <select bind:value={root}>
      {#each notes as note}
        <option>{note}</option>
      {/each}
    </select>
    <p>
      Root: {root}
    </p>
    <p>
      Major 3rd: {majorThird}
    </p>
    <p>
      Perfect 5th: {perfectFifth}
    </p>
    <div class="guitar">
      <div class="guitar__fret-indicators">
        {#each { length: strings[0].length } as _, i}
          <div class="guitar__fret-indicator">
            {i}
          </div>
        {/each}
      </div>
      {#each strings as string}
        <div class="guitar__string">
          {#each string as note}
          <div
            class="guitar__fret"
            class:guitar__fret--root={note === root}
            class:guitar__fret--major-third={note === majorThird}
            class:guitar__fret--perfect-fifth--root={note === perfectFifth}
          >
            {note}
          </div>
          {/each}
        </div>
      {/each}
    </div>
  </main>
</Layout>

<style lang="scss">
  .container {

  }

  .guitar {
    width: 100%;
    
    &__string {
      display: flex;
      height: 2rem;
      width: 100%;
      background-color: saddlebrown;
    }

    &__fret {
      display: grid;
      place-content: center;
      flex: 1 1 0px;
      height: 100%;
      border: white solid 1px;

      &:first-child {
        background-color: black;
      }

      &--root {
        background-color: red !important;
      }

      &--major-third {
        background-color: purple !important;
      }

      &--perfect-fifth {
        background-color: blue !important;
      }
    }

    &__fret-indicators {
      display: flex;
      height: 2rem;
      width: 100%;
    }

    &__fret-indicator {
      display: grid;
      place-content: center;
      flex: 1 1 0px;
      height: 100%;
    }
  }
</style>
