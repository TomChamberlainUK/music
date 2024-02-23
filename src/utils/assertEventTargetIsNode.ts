export default function assertEventTargetIsNode(eventTarget: EventTarget | null): asserts eventTarget is Node {
  if (!eventTarget || !('nodeType' in eventTarget)) {
    throw new Error('Expected event target to be Node');
  }
}