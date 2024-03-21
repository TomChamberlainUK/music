<script lang="ts">
  import { PieChart } from '@/components';

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
</script>

<div>
  <PieChart labels={fifths} />
</div>