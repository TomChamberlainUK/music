<script lang="ts">
  import { PieChart } from '@/components';
  import { getFifthsFromRoot } from '@/utils';

  export let root: string;

  $: fifths = getFifthsFromRoot(root);
</script>

<div>
  <PieChart labels={fifths} />
</div>