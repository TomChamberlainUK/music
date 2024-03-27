<script lang="ts">
  import { PieChart } from '@/components';
  import { getFifthsFromRoot } from '@/utils';

  export let key: string = 'C';

  $: notesFromC = getFifthsFromRoot('C');
  $: highlightOffset = notesFromC.indexOf(key);

  const fifths = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    '<tspan alignment-baseline="middle">G</tspan><tspan dx="-2" dy="-2" font-size="10">♭</tspan><tspan dx="-4" dy="5">/F</tspan><tspan dy="-6" font-size="8">♯</tspan>',
    'D<tspan dx="-2" dy="-2" font-size="10">♭</tspan>',
    'A<tspan dx="-2" dy="-2" font-size="10">♭</tspan>',
    'E<tspan dx="-2" dy="-2" font-size="10">♭</tspan>',
    'B<tspan dx="-2" dy="-2" font-size="10">♭</tspan>',
    'F'
  ];

  const minorFifths = [
    'a',
    'e',
    'b',
    'f<tspan dy="-2" font-size="8">♯</tspan>',
    'c<tspan dy="-2" font-size="8">♯</tspan>',
    'g<tspan dy="-2" font-size="8">♯</tspan>',
    '<tspan alignment-baseline="middle">e</tspan><tspan dx="-2" dy="-2" font-size="10">♭</tspan><tspan dx="-4" dy="5">/d</tspan><tspan dy="-6" font-size="8">♯</tspan>',
    'b<tspan dx="-2" dy="-2" font-size="10">♭</tspan>',
    'f',
    'c',
    'g',
    'd'
  ];

  $: highlighted = [0, 1, 11].map(value => (
    (value += highlightOffset) % 12
  ));
</script>

<div class="container">
    <PieChart labels={fifths} size="25rem" diameter={250} {highlighted} />
    <PieChart labels={minorFifths} size="15rem" diameter={200} {highlighted} /> <!-- Swap diameter for font size modifier or something -->
</div>

<style lang="scss">
  .container {
    display: grid;
    place-items: center;

    & :global(> *) {
      grid-row: 1;
      grid-column: 1;
    }
  }
</style>