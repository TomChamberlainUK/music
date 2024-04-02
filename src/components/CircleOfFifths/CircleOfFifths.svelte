<script lang="ts">
  import DonutChart from '../DonutChart/DonutChart.svelte';

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

  const size = 150;
  const width = '15rem';
  const height = '15rem';
  const center = new Vector2D(size / 2, size / 2);

  const totalRadians = Math.PI * 2;
  const totalSegments = 12;

  const paths: string[] = [];
  const radii = [75, 59, 43, 27];

  radii.forEach(radius => {
    for (let i = 0; i < 12; i++) {
      const angleModifier = 0.5 + (totalSegments / 4);
      const startAngle = (i - angleModifier) / totalSegments * totalRadians;
      const endAngle = (i + 1 - angleModifier) / totalSegments * totalRadians; 
      const startX = Math.cos(startAngle) * radius + center.x;
      const startY = Math.sin(startAngle) * radius + center.y;
      const endX = Math.cos(endAngle) * radius + center.x;
      const endY = Math.sin(endAngle) * radius + center.y;
      const largeArcFlag = totalRadians / totalSegments > Math.PI ? 1 : 0;
      const sweepFlag = 1; // Clockwise
      const path = [
        `M ${center.x} ${center.y}`, // Initial position
        `L ${startX} ${startY}`, // Line out to edge
        `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`, // Arc: xRadius, yRadius, xAxisRotation, largeArcFlag, sweepFlag, x, y
        `L ${center.x} ${center.y}`, // Line back into center
        'Z' // Close path
      ].join(' ');
      paths.push(path);
    }
  });
</script>

<div class="test">
  <DonutChart notes={majorFifths} />
  <DonutChart notes={minorFifths} radius={59} />
  <DonutChart notes={diminishedFifths} radius={43}/>
  <svg viewBox="0 0 {size} {size}" {width} {height}>
    {#each paths as path}
      <path
        d={path}
        fill="transparent"
        stroke="black"
      />
    {/each}
  </svg>
</div>

<style lang="scss">
  .test {
    display: grid;
    place-items: center;
    /* font-family: monospace; */

    & :global(> *) {
      grid-row: 1;
      grid-column: 1;
    }
  }
</style>