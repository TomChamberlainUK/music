import { mount, unmount } from 'svelte';
import type { Action } from 'svelte/action';
import Tooltip from '@/components/Tooltip';

const tooltip: Action<HTMLElement, { text?: string }> = (node, { text }) => {
  let tooltipElement: Record<string, unknown>;
  const props = $state({
    details: text,
    x: 0,
    y: 0,
  });

  node.addEventListener('mouseenter', createTooltipElement);
  node.addEventListener('mouseleave', destroyTooltipElement);
  window.addEventListener('resize', updateTooltipPosition);
  window.addEventListener('scroll', updateTooltipPosition);

  function createTooltipElement() {
    updateTooltipPosition();
    tooltipElement = mount(Tooltip, {
      props,
      target: document.body,
    });
  }

  function destroyTooltipElement() {
    unmount(tooltipElement);
  }

  function updateTooltipPosition() {
    const nodeBounds = node.getBoundingClientRect();
    props.x = nodeBounds.x + (nodeBounds.width / 2) + window.scrollX;
    props.y = nodeBounds.y + window.scrollY;
  }

  return {
    update({ text }) {
      props.details = text;
    },
    destroy() {
      node.removeEventListener('mouseenter', createTooltipElement);
      node.removeEventListener('mouseleave', destroyTooltipElement);
      window.removeEventListener('resize', updateTooltipPosition);
      window.removeEventListener('scroll', updateTooltipPosition);
      destroyTooltipElement();
    },
  };
};

export default tooltip;
