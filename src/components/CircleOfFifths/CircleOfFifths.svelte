<script lang="ts">
  import { getFifthsFromRoot, getFifthsShapes, getModeOffset } from './utils';
  import { scale } from '@/stores';

  const majorFifths = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'G♭/F♯',
    'D♭',
    'A♭',
    'E♭',
    'B♭',
    'F',
  ];

  const minorFifths = [
    'a',
    'e',
    'b',
    'f♯',
    'c♯',
    'g♯',
    'e♭/d♯',
    'b♭',
    'f',
    'c',
    'g',
    'd',
  ];

  const diminishedFifths = [
    'B°',
    'F♯°',
    'C♯°',
    'G♯°',
    'D♯°',
    'A♯°',
    'E♯°',
    'C°',
    'G°',
    'D°',
    'A°',
    'E°',
  ];

  const size = 160;
  const sectionWidth = 16;
  const strokeWidth = 1;
  const width = '15rem';
  const height = '15rem';

  let fifthsFromC = $derived(getFifthsFromRoot('C'));
  let rootIndex = $derived(fifthsFromC.findIndex(value => value === $scale.root));
  let modeOffsetIndex = $derived(rootIndex + getModeOffset($scale.modeName));
  let fifthsShapes = $derived(getFifthsShapes({
    allFifths: [...majorFifths, ...minorFifths, ...diminishedFifths],
    highlightOffset: modeOffsetIndex,
    size,
    sectionWidth,
    strokeWidth,
  }));
</script>

<svg
  viewBox="0 0 {size} {size}"
  {width}
  {height}
  role="graphics-document"
>
  {#each fifthsShapes as { isHighlighted, name, path, textCoordinates } (name)}
  <g
    role="gridcell"
    aria-labelledby={`circle-of-fifths-chord-${name}`}
    aria-selected={isHighlighted}
  >
    <path
      d={path}
      class="segment"
      fill={isHighlighted ? 'red' : 'transparent'}
      stroke-width={strokeWidth}
    />
    <text
      class="text"
      x={textCoordinates.x}
      y={textCoordinates.y}
      font-weight={isHighlighted ? 'bold' : 'normal'}
      id={`circle-of-fifths-chord-${name}`}
    >
      {name}
    </text>
  </g>
  {/each}
</svg>

<style lang="scss">
  @import './CircleOfFifths.scss';
</style>
