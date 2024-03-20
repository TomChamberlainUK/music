<script lang="ts">
  import { PieChart } from '@/components';
  import { getNotesFromRoot } from '@/utils';

  export let root: string;

  $: notes = getNotesFromRoot(root);
  $: fifths = getFifths(root);

  function getFifths(root: string) {
    if (!root) return [];

    const output = [];
    const startingIndex = notes.findIndex(note => note === root);

    let currentIndex = startingIndex;
    let iterationCount = 0;

    do {
      output.push(notes[currentIndex]);
      // Prevent infinite loops
      iterationCount++;
      if (iterationCount > 12) {
        throw new Error('Iterated more than expected when generating fifths');
      }
      // Increase index by 5 and loop array when reaching the end
      currentIndex += 5;
      if (currentIndex >= notes.length) {
        currentIndex = currentIndex % notes.length;
      }
    } while (currentIndex !== startingIndex);
    return output;
  }
</script>

<div>
  <PieChart labels={[...fifths]} />
</div>