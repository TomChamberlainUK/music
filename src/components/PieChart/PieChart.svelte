<script lang="ts">
  const diameter = 200;
  const height = diameter;
  const width = diameter;

  const radius = diameter / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  const totalSegments = 12;
  const totalRadians = Math.PI * 2; // 360 deg angle of full circle rotation

  const paths: string[] = [];

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
  }
</script>

<svg viewBox="0 0 {width} {height}" width="30rem" height="30rem">
  {#each paths as path}
    <path d={path} class="segment"/>
  {/each}
</svg>

<style lang="scss">
  @import './PieChart.scss';
</style>