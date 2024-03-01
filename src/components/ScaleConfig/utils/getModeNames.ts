import scalePatterns from './scalePatterns';

export default function getModeNames(scaleName: string) {
  const modes = scalePatterns[scaleName];
  const modeNames = Object.keys(modes);
  return modeNames;
}