<script lang="ts">
  export let radius: number = 75;
  export let width = '15rem';
  export let height = '15rem';
  export let notes = [
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

  class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const strokeWidth = 16;
  const size = 150;
  const center = new Vector2D(size / 2, size / 2);
  const alteredRadius = radius - (strokeWidth / 2); // Compensates for stroke
  const circumference = 2 * Math.PI * alteredRadius;

  const segmentCount = 12;

  const initialAngleOffset = -90 - (1 / segmentCount * 360 / 2);

  const segments = notes.map((text, i) => {
    const diameterPercentage = 1 / segmentCount;
    const angleOffset = initialAngleOffset + ((diameterPercentage) * i * 360);
    const dashOffset = circumference - ((diameterPercentage) * circumference);
    return {
      angleOffset,
      dashOffset,
      textCoordinates: (() => {
        const degrees = (diameterPercentage * 360 / 2) + angleOffset;
        const radians = getRadiansFromDegrees(degrees);
        return new Vector2D(
          (alteredRadius * Math.cos(radians)) + center.x,
          (alteredRadius * Math.sin(radians)) + center.y
          );
        })(),
      text
    };
  });

  function getRadiansFromDegrees(degrees: number) {
    return degrees * Math.PI / 180;
  }
</script>

<svg viewBox="0 0 {size} {size}" {width} {height}>
  {#each segments as segment}
    <g>
      <circle
        cx={center.x}
        cy={center.y}
        r={alteredRadius}
        fill="transparent"
        stroke="transparent"
        stroke-width={strokeWidth}
        stroke-dasharray={circumference}
        stroke-dashoffset={segment.dashOffset}
        transform={`rotate(${segment.angleOffset}, ${center.x}, ${center.y})`}
      />
      <text
        x={segment.textCoordinates.x}
        y={segment.textCoordinates.y}
        text-anchor="middle"
        alignment-baseline="middle"
        font-size="8px"
      >
        {segment.text}
      </text>
    </g>
  {/each}
</svg>