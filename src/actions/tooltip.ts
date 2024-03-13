import type { Action } from 'svelte/action';
import Tooltip from '@/components/Tooltip';

const tooltip: Action<HTMLElement, { text?: string }> = (node, { text }) => {
  let tooltipElement: Tooltip | null = null;
  let details = text;

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);

  function createTooltipElement() {
    const { x, y } = getTooltipPosition();
    tooltipElement = new Tooltip({
      props: { details, x, y },
      target: document.body
    });
  }

  function destroyTooltipElement() {
    if (!tooltipElement) return;
    tooltipElement.$destroy();
    tooltipElement = null;
  }

  function getTooltipPosition() {
    const nodeBounds = node.getBoundingClientRect();
    return {
      x: nodeBounds.x + (nodeBounds.width / 2),
      y: nodeBounds.y
    };
  }

  function handleResize() {
    if (!tooltipElement) return;
    const { x, y } = getTooltipPosition();
    tooltipElement.$set({ x, y });
  }

  function handleMouseEnter() {
    createTooltipElement();
  }

  function handleMouseLeave() {
    if (!tooltipElement) return;
    destroyTooltipElement();
  }

  return {
    update({ text }) {
      details = text;
    },
    destroy() {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      destroyTooltipElement();
    }
  };
};

export default tooltip;