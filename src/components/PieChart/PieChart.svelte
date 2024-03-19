<script lang="ts">
  class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    subtract(vector: Vector2D) {
      return new Vector2D(
        this.x - vector.x,
        this.y - vector.y
      );
    }

    getLength() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }


  const diameter = 200;
  const height = diameter;
  const width = diameter;

  const radius = diameter / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const totalSegments = 12;
  const totalRadians = Math.PI * 2; // 360 deg angle of full circle rotation

  const paths: string[] = [];
  const incenters: { x: number, y: number }[] = [];

  for (let i = 0; i < totalSegments; i++) {
    const startAngle = (i - 0.5) / totalSegments * totalRadians;
    const endAngle = (i + 0.5) / totalSegments * totalRadians; 
    const startX = Math.cos(startAngle) * radius + centerX;
    const startY = Math.sin(startAngle) * radius + centerY;
    const endX = Math.cos(endAngle) * radius + centerX;
    const endY = Math.sin(endAngle) * radius + centerY;
    const largeArcFlag = totalRadians / totalSegments > Math.PI ? 1 : 0;
    const sweepFlag = 1; // Clockwise
    const path = [
      `M ${centerX} ${centerY}`, // Initial position
      `L ${startX} ${startY}`, // Line out to edge
      `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`, // Arc: xRadius, yRadius, xAxisRotation, largeArcFlag, sweepFlag, x, y
      `L ${radius} ${radius}`, // Line back into center
      'Z' // Close path
    ].join(' ');
    paths.push(path);

    const startVector = new Vector2D(startX, startY);
    const endVector = new Vector2D(endX, endY);
    const positionVector = endVector.subtract(startVector);
    const baseLength = positionVector.getLength(); // Length of short side of isoceles triangle

    // Central coordinates of triangle
    incenters.push({
      x: (radius * startX + radius * endX + baseLength * centerX) / (radius + radius + baseLength),
      y: (radius * startY + radius * endY + baseLength * centerY) / (radius + radius + baseLength)
    });
  }
</script>

<svg viewBox="0 0 {width} {height}" width="30rem" height="30rem">
  {#each paths as path, i}
    <path d={path} class="segment" id="test-{i}" />
    <text x={incenters[i].x} y={incenters[i].y} text-anchor="middle" alignment-baseline="middle">
      A
    </text>
  {/each}
</svg>

<style lang="scss">
  @import './PieChart.scss';
</style>