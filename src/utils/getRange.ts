type Options = {
  format?: 'string' | 'number';
};

function getRange(min: number, max: number): number[];
function getRange<T extends Options['format'] = 'number'>(
  min: number,
  max: number,
  options: {
    format?: T
  }
): (T extends 'string' ? string : number)[];
function getRange(
  min: number,
  max: number,
  {
    format
  }: Options = {}
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