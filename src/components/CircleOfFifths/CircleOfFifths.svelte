<script lang="ts">
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
      fifths.push({
        name: allFifths[(i * 12) + j],
        textCoordinates: centerMiddle,
        path
      });
    }
  });
</script>

<svg viewBox="0 0 {size} {size}" {width} {height}>
  {#each fifths as { name, path, textCoordinates }}
  <g>
    <path
      d={path}
      class="segment"
      fill="transparent"
      stroke-width={strokeWidth}
    />
    <text
      class="text"
      x={textCoordinates.x}
      y={textCoordinates.y}
    >
      {name}
    </text>
  </g>
  {/each}
</svg>

<style lang="scss">
  @import './CircleOfFifths.scss';
</style>