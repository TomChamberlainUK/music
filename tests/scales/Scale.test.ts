import { describe, it, expect } from 'vitest';
import Scale from '../../src/scales/Scale';

describe('Scale', () => {
  it('Should instanciate', () => {
    const scale = new Scale({
      root: 'A',
      name: 'test',
      pattern: [0],
      modes: ['test']
    });

    expect(scale).toBeInstanceOf(Scale);
  });

  describe('getMode method', () => {
    const scale = new Scale({
      root: 'A',
      name: 'test',
      pattern: [0, 2, 3],
      modes: [
        'mode-a',
        'mode-b',
        'mode-c'
      ]
    });

    it('Should return the correct mode', () => {
      const mode = scale.getMode('mode-b');
      expect(mode?.name).toBe('mode-b');
      expect(mode?.notes).toEqual(['B', 'C', 'A']);
    });
  });
});