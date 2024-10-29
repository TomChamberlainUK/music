import { getRange } from '@/utils';
import { describe, expect, it } from 'vitest';

describe('getRange()', () => {
  it('Should return a range of numbers from min to max', () => {
    const range = getRange(3, 7);
    expect(range).toEqual([3, 4, 5, 6, 7]);
  });

  it('Should return a range of numbers formatted as strings if specified', () => {
    const range = getRange(1, 3, { format: 'string' });
    expect(range).toEqual(['1', '2', '3']);
  });
});
