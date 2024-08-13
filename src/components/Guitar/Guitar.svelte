<script lang="ts">
  import { getRange } from '@/utils';
  import { Config, String } from './subcomponents';

  let numberOfFrets = 22;
  let numberOfStrings = 6;
  let stringTunings = ['E', 'A', 'D', 'G', 'B', 'E'];
  let fretMarkers = ['3', '5', '7', '9', '12', '15', '17', '19', '21'];
  let displayConfig = false;

  let fretboardElement: HTMLTableElement;

  $: frets = getRange(0, numberOfFrets, { format: 'string' });

  const current = {
    string: 0,
    fret: 0
  };

  function focusFret({ string, fret }: { string: number, fret: number }) {
    const target = document.querySelector<HTMLTableCellElement>(
      `[data-row="${string}"][data-column="${fret}"]`
    );
    if (!target) {
      return;
    }
    current.string = string;
    current.fret = fret;
    target.focus();
  }
</script>

<!-- TODO: Replace test id with something accessible -->
<div data-testId="guitar">
  <div class="guitar">
    <div class="fret-markers">
      {#each frets as fret}
        <!-- TODO: Replace test id with something accessible -->
        <div class="fret-markers__item" data-testId="fret-marker">
          <div
            class="fret-markers__number"
            class:fret-markers__number--highlighted={fretMarkers.includes(fret)}
          >
            {fret}
          </div>
          {#if fretMarkers.includes(fret)}
            <div class="fret-markers__indicator" />
          {/if}
        </div>
      {/each}
    </div>
    <table
      class="fretboard"
      role="grid"
      tabindex="0"
      bind:this={fretboardElement}
      on:keydown={(event) => {
        switch (event.key) {
          case 'Enter': {
            event.preventDefault();
            focusFret({
              string: current.string,
              fret: current.fret
            });
            break;
          }
          case 'Escape': {
            event.preventDefault();
            fretboardElement.focus();
            break;
          }
          case 'ArrowLeft': {
            event.preventDefault();
            focusFret({
              string: current.string,
              fret: current.fret - 1
            });
            break;
          }
          case 'ArrowRight': {
            event.preventDefault();
            focusFret({
              string: current.string,
              fret: current.fret + 1
            });
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            focusFret({
              string: current.string - 1,
              fret: current.fret
            });
            break;
          }
          case 'ArrowDown': {
            event.preventDefault();
            focusFret({
              string: current.string + 1,
              fret: current.fret
            });
            break;
          }
        }
      }}
    >
      {#each stringTunings.toReversed() as tuning, stringNumber}
        <String
          {tuning}
          {numberOfFrets}
          {stringNumber}
          {focusFret}
        />
      {/each}
    </table>
    <div class="fret-markers">
      {#each frets as fret}
        <div class="fret-markers__item">
          {#if fretMarkers.includes(fret)}
            <div class="fret-markers__indicator" />
          {/if}
        </div>
      {/each}
    </div>
  </div>
  <button
    on:click={() => displayConfig = !displayConfig}
    type="button"
  >
    Configure
  </button>
  {#if displayConfig}
    <Config
      bind:numberOfFrets={numberOfFrets}
      bind:numberOfStrings={numberOfStrings}
      bind:stringTunings={stringTunings}
      bind:fretMarkers={fretMarkers}
    />
  {/if}
</div>

<style lang="scss">
  @import './Guitar.scss';
</style>