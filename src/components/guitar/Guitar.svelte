<script lang="ts">
  import notes from '../utils/notes';

  export let numberOfFrets: number;
  export let strings: string[];
  export let scale: string[] = [];

  const stringNotes = strings.map(string => (
    getStringNotes(string)
  ));

  function getStringNotes(root: string) {
    const rootIndex = notes.findIndex(note => note === root);
    const stringNotes = [];
    for (let i = 0; i < numberOfFrets; i++) {
      const nextNote = notes[(rootIndex + i) % notes.length];
      stringNotes.push(nextNote);
    }
    return stringNotes;
  }

  console.log(scale);

</script>

<div class="guitar">
  {scale}
  <div class="fret-indicators">
    {#each { length: numberOfFrets } as _, i}
      <div class="fret-indicator">
        {i}
      </div>
    {/each}
  </div>
  {#each stringNotes as string}
    <div class="string">
      {#each string as note}
      <div class="fret">
        <div
          class:scale-root-indicator={scale[0] === note}
          class:scale-note-indicator={scale.slice(1).includes(note)}
        >
          {note}
        </div>
      </div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .fret-indicators {
    display: flex;
    height: 2rem;
    width: 100%;
  }

  .fret-indicator {
    display: grid;
    place-content: center;
    flex: 1 1 0px;
    height: 100%;
  }

  .guitar {
    width: 100%;
  }
    
  .string {
    display: flex;
    height: 2rem;
    width: 100%;
    background-color: saddlebrown;
  }

  .fret {
    display: grid;
    place-content: center;
    flex: 1 1 0px;
    height: 100%;
    border: white solid 1px;

    &:first-child {
      background-color: black;
    }
  }

  .scale-root-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: red;
  }

  .scale-note-indicator {
    display: grid;
    place-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: darkred;
  }
</style>