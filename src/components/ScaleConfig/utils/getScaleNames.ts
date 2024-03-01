import scalePatterns from './scalePatterns';

export default function getScaleNames() {
  const scaleNames = Object.keys(scalePatterns);
  return scaleNames;
}