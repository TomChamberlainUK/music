import type { Action } from 'svelte/action';
import Tooltip from '@/components/Tooltip';

const tooltip: Action<HTMLElement, { text?: string }> = (node, { text }) => {
  let tooltipElement: Tooltip | null = null;
  let details = text;

  node.addEventListener('mouseenter', handleMouseEnter);
  node.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', updateTooltipPosition);
  window.addEventListener('scroll', updateTooltipPosition);

  function createTooltipElement() {
    const { x, y } = getTooltipPosition();
    tooltipElement = new Tooltip({
      props: { details, x, y },
      target: document.body,
    });
  }

  function destroyTooltipElement() {
    if (!tooltipElement) return;
    tooltipElement.$destroy();
    tooltipElement = null;
  }

  function updateTooltipPosition() {
    if (!tooltipElement) return;
    const { x, y } = getTooltipPosition();
    tooltipElement.$set({ x, y });
  }

  function getTooltipPosition() {
    const nodeBounds = node.getBoundingClientRect();
    return {
      x: nodeBounds.x + (nodeBounds.width / 2) + window.scrollX,
      y: nodeBounds.y + window.scrollY,
    };
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
      window.removeEventListener('resize', updateTooltipPosition);
      window.removeEventListener('scroll', updateTooltipPosition);
      destroyTooltipElement();
    },
  };
};

export default tooltip;
