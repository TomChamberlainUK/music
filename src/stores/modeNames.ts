import { derived } from 'svelte/store';
import scalePatterns from './scalePatterns';
import scaleName from './scaleName';

export default derived([scalePatterns, scaleName], ([$scalePatterns, $scaleName]) => {
  return Object.keys($scalePatterns[$scaleName]);
});