<script lang="ts">
  import { getFifthsFromRoot } from '@/utils';

  export let root = 'C';
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

  class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  type Fifth = {
    name: string;
    path: string;
    textCoordinates: Vector2D;
    isHighlighted: boolean;
  };

  const size = 150;
  const strokeWidth = 1;
  const width = '15rem';
  const height = '15rem';
  const center = new Vector2D(size / 2, size / 2);

  const totalRadians = Math.PI * 2;
  const totalSegments = 12;

  const radii = [75, 59, 43];
  const allFifths = [...majorFifths, ...minorFifths, ...diminishedFifths];

  $: rootIndex = getFifthsFromRoot('C').findIndex(value => value === root);
  $: offset = rootIndex + getOffset(mode);

  /**
   * Offsets highlighted notes depending on the mode to correctly display diatonic chords regardless of mode.
   * @param mode - The current mode.
   */
  function getOffset(mode: string) {
    // Offsets per ring of circle of fifths to compensate for differing starting point
    const majorOffset = 0;
    const minorOffset = 9;
    const diminishedOffset = 7;
    // Offsets for moving around the circle
    const fourthOffset = 1; // Moves anticlockwise around the circle
    const fifthOffset = 11; // Moves clockwise around the circle
    switch (mode) {
      // Major modes
      case 'ionian':
        return majorOffset;
      case 'lydian':
        return majorOffset + fourthOffset;
      case 'mixolydian':
        return majorOffset + fifthOffset;
      // Minor modes
      case 'aeolian':
        return minorOffset;
      case 'dorian':
        return minorOffset + fourthOffset;
      case 'phrygian':
        return minorOffset + fifthOffset;
      // Diminished mode
      case 'locrian':
        return diminishedOffset;
      default:
        throw new Error(`Cannot determine circle of fifths offset due to unexpected mode: ${mode}`);
    }
  }
  
  $: fifths = getFifths(offset);

  function getFifths(offset: number) {
    const fifths: Fifth[] = [];
    radii.forEach((radius, i) => {
      const outerRadius = radius - strokeWidth / 2;
      const centerRadius = radius - 8 - strokeWidth / 2;
      const innerRadius = radius - 16 - strokeWidth / 2;
      const angleModifier = 0.5 + (totalSegments / 4);
  
      for (let j = 0; j < 12; j++) {
        const startAngle = (j - angleModifier) / totalSegments * totalRadians;
        const centerAngle = (j + 0.5 - angleModifier) / totalSegments * totalRadians;
        const endAngle = (j + 1 - angleModifier) / totalSegments * totalRadians;
        const innerStart = new Vector2D(
          Math.cos(startAngle) * innerRadius + center.x,
          Math.sin(startAngle) * innerRadius + center.y
        );
        const outerStart = new Vector2D(
          Math.cos(startAngle) * outerRadius + center.x,
          Math.sin(startAngle) * outerRadius + center.y
        );
        const centerMiddle = new Vector2D(
          Math.cos(centerAngle) * centerRadius + center.x,
          Math.sin(centerAngle) * centerRadius + center.y
        );
        const innerEnd = new Vector2D(
          Math.cos(endAngle) * innerRadius + center.x,
          Math.sin(endAngle) * innerRadius + center.y
        );
        const outerEnd = new Vector2D(
          Math.cos(endAngle) * outerRadius + center.x,
          Math.sin(endAngle) * outerRadius + center.y
        );
        const path = [
          `M ${innerStart.x} ${innerStart.y}`,
          `L ${outerStart.x} ${outerStart.y}`,
          `A ${radius} ${radius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
          `L ${innerEnd.x} ${innerEnd.y}`,
          `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
          'Z'
        ].join(' ');
        const isMajor = i === 0;
        const isMinor = i === 1;
        const isDiminished = i === 2;
        const isHighlighted = (
          (isMajor && (j === (0 + offset) % 12 || j === (1 + offset) % 12 || j === (11 + offset) % 12)) ||
          (isMinor && (j === (0 + offset) % 12 || j === (1 + offset) % 12 || j === (11 + offset) % 12)) ||
          (isDiminished && j === (0 + offset) % 12)
        );
        fifths.push({
          name: allFifths[(i * 12) + j],
          textCoordinates: centerMiddle,
          path,
          isHighlighted
        });
      }
    });
    return fifths;
  }
</script>

<svg viewBox="0 0 {size} {size}" {width} {height}>
  {#each fifths as { isHighlighted, name, path, textCoordinates }}
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