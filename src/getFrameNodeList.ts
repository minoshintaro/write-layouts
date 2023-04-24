export const getFrameNodeList = (node: FrameNode | ComponentNode): FrameNode[] => {
  const subList = node.findAllWithCriteria({ types: ['FRAME'] });
  switch (node.type) {
    case 'FRAME': return Array(node).concat(subList);
    default: return subList;
  }
};
