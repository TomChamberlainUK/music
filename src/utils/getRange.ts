type Options = {
  format?: 'number' | 'string';
};

export default function getRange(
  min: number,
  max: number,
  {
    format = 'number'
  }: Options = {}
) {
  const range = [
    ...Array(max + 1).keys()
  ].slice(min);
  return format === 'string'
    ? range.map(number => number.toString())
    : range;
}