function getRange(min: number, max: number): number[];
function getRange<T extends 'string' | 'number' = 'number'>(min: number, max: number, options?: { format?: T }): (T extends 'string' ? string : number)[];
function getRange(
  min: number,
  max: number,
  {
    format
  }: {
    format?: 'string' | 'number'
  } = {}
) {
  const range = [
    ...Array(max + 1).keys()
  ].slice(min);
  const formattedRange = format !== 'string'
    ? range
    : range.map(number => number.toString());
  return formattedRange;
}

export default getRange;