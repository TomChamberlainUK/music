import { get } from 'svelte/store';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { scale } from '@/stores';

describe('Scale Store', () => {
  const defaultScale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  afterEach(() => {
    scale.reset();
  });

  it('Should initialise with the default scale notes', () => {
    expect(get(scale)).toEqual(defaultScale);
  });

  it('Should allow updates to the scale notes', () => {
    const notes = ['C', 'D', 'E', 'G', 'A'];
    scale.set(notes);
    expect(get(scale)).toEqual(notes);
  });

  it('Should allow resetting to the default scale notes', () => {
    scale.set([]);
    expect(get(scale)).toEqual([]);
    scale.reset();
    expect(get(scale)).toEqual(defaultScale);
    expect(scale.getRoot()).toBe('C');
    expect(scale.getScaleName()).toBe('diatonic');
    expect(scale.getModeName()).toBe('ionian');
  });

  it('Should allow setting the root note of the scale', () => {
    scale.setRoot('D');
    expect(get(scale)).toEqual(['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯']);
  });

  it('Should allow getting the root note of the scale', () => {
    expect(scale.getRoot()).toBe('C');
  });

  it('Should allow setting the scale notes based on a scale name', () => {
    scale.setScale('pentatonic');
    expect(get(scale)).toEqual(['C', 'D', 'E', 'G', 'A']);
  });

  it('Should allow getting the scale name', () => {
    expect(scale.getScaleName()).toBe('diatonic');
  });

  it('Should allow setting the scale notes based on a mode name', () => {
    scale.setMode('dorian');
    expect(get(scale)).toEqual(['C', 'D', 'D♯', 'F', 'G', 'A', 'A♯']);
  });

  it('Should allow getting the mode name', () => {
    expect(scale.getModeName()).toBe('ionian');
  });

  it('Should allow setting the scale notes based on a scale name and mode name', () => {
    scale.setScale('pentatonic', 'minor');
    expect(get(scale)).toEqual(['C', 'D♯', 'F', 'G', 'A♯']);
  });
});