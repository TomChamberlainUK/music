import type { Action } from 'svelte/action';
import Tooltip from '@/components/Tooltip';

const tooltip: Action<HTMLElement, { text?: string }> = (node, { text }) => {
  const tooltipElement = new Tooltip({
    props: { details: text },
    target: document.body
  });

  handleResize();

  node.addEventListener('mouseover', handleMouseOver);
  node.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);

  function handleResize() {
    const { x, y, width } = node.getBoundingClientRect();
    tooltipElement.$set({
      x: x + (width / 2),
      y
    });
  }

  function handleMouseOver() {
    handleResize();
    tooltipElement.$set({ isVisible: true });
  }

  function handleMouseLeave() {
    tooltipElement.$set({ isVisible: false });
  }

  return {
    update({ text }) {
      tooltipElement.$set({ details: text });
    },
    destroy() {
      node.removeEventListener('mouseover', handleMouseOver);
      node.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      tooltipElement.$destroy();
    }
  };
};

export default tooltip;