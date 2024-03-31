<script lang="ts">
  class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  const strokeWidth = 10;
  const size = 100;
  const width = size;
  const height = size;
  const center = new Vector2D(width / 2, height / 2);
  const radius = (size / 2) - (strokeWidth / 2); // Compensates for stroke
  const circumference = 2 * Math.PI * radius;

  const segmentCount = 12;

  function getRandomRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

  const initialAngleOffset = -90 - (1 / segmentCount * 360 / 2);
  const segmentGap = 2;

  const notes = [
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

  const segments = notes.map((text, i) => {
    const diameterPercentage = 1 / segmentCount;
    const angleOffset = initialAngleOffset + (diameterPercentage * i * 360);
    return {
      angleOffset,
      dashOffset: circumference - ((diameterPercentage) * circumference),
      textCoordinates: (() => {
        const degrees = (diameterPercentage * 360 / 2) + angleOffset;
        const radians = getRadiansFromDegrees(degrees);
        return new Vector2D(
          (radius * Math.cos(radians)) + center.x,
          (radius * Math.sin(radians)) + center.y
          );
        })(),
      color: getRandomRGB(),
      text
    };
  });

  function getRadiansFromDegrees(degrees: number) {
    return degrees * Math.PI / 180;
  }
</script>

<svg viewBox="0 0 {width} {height}" width="15rem" height="15rem">
  {#each segments as segment}
    <g>
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        fill="transparent"
        stroke={segment.color}
        stroke-width={strokeWidth}
        stroke-dasharray={circumference - segmentGap}
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