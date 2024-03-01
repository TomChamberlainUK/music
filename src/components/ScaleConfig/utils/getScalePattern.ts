import scalePatterns from './scalePatterns';

export default function getScalePattern(scaleName: string, modeName: string) {
  const scalePattern = scalePatterns[scaleName][modeName];
  return scalePattern;
}