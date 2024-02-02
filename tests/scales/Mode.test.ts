import { describe, it, expect } from 'vitest';
import Mode from '../../src/scales/Mode';

describe('Mode', () => {
  it('Should instanciate', () => {
    const mode = new Mode({
      root: 'A',
      name: 'test',
      notes: ['A']
    });
    expect(mode).toBeInstanceOf(Mode);
  });
});