
export function getNodeList (node: FrameNode | ComponentNode) {
  const subList = node.findAllWithCriteria({ types: ['FRAME'] });
  return node.type === 'FRAME' ? Array(node).concat(subList) : subList;
}
