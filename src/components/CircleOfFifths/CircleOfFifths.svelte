<script lang="ts">
  import { getFifthsFromRoot } from '@/utils';
  import { getFifthsShapes, getModeOffset } from './utils';
  import { root } from '@/stores';

  export let mode = 'ionian';

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
    'F'
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
    'd'
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

  $: fifthsFromC = getFifthsFromRoot('C');
  $: rootIndex = fifthsFromC.findIndex(value => value === $root);
  $: modeOffsetIndex = rootIndex + getModeOffset(mode);
  $: fifthsShapes = getFifthsShapes({
    allFifths: [...majorFifths, ...minorFifths, ...diminishedFifths],
    highlightOffset: modeOffsetIndex,
    size,
    sectionWidth,
    strokeWidth,
  });
</script>

<svg viewBox="0 0 {size} {size}" {width} {height}>
  {#each fifthsShapes as { isHighlighted, name, path, textCoordinates }}
  <g>
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
    >
      {name}
    </text>
  </g>
  {/each}
</svg>

<style lang="scss">
  @import './CircleOfFifths.scss';
</style>