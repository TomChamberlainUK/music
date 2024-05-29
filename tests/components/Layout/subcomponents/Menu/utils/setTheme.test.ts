import { describe, expect, it } from 'vitest';
import { setTheme } from '@/components/Layout/subcomponents/Menu/utils';

describe('setTheme', () => {
  describe('When passed light', () => {
    it('Should set theme on localstorage as "light"', () => {
      setTheme('light');
      const savedTheme = window.localStorage.getItem('theme');
      expect(savedTheme).toBe('light');
    });
  });

  describe('When passed dark', () => {
    it('Should set theme on localstorage as "dark"', () => {
      setTheme('dark');
      const savedTheme = window.localStorage.getItem('theme');
      expect(savedTheme).toBe('dark');
    });
  });

  describe('When passed an invalid theme', () => {
    it('Should throw an error', () => {
      expect(() => setTheme('invalid')).toThrowError;
    });
  });
});