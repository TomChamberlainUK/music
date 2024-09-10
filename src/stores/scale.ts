import { derived } from 'svelte/store';
import notes from './notes';
import scalePatterns from './scalePatterns';
import root from './root';
import { getNotesFromRoot } from '@/utils';
import scaleName from './scaleName';
import modeName from './modeName';

export default derived([root, notes, scalePatterns, scaleName, modeName], ([$root, $notes, $scalePatterns, $scaleName, $modeName]) => {
  const notes = getNotesFromRoot($root, $notes);
  const scalePattern = $scalePatterns[$scaleName][$modeName] ?? [];
  return scalePattern.map(interval => notes[interval]);
});
