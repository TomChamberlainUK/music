import type { Action } from 'svelte/action';

const focus: Action<HTMLElement, { isFocussed?: boolean }> = (node) => {
  return {
    update({ isFocussed }) {
      if (isFocussed) {
        node.focus();
      }
    },
  };
};

export default focus;
