
// findAllWithCriteria:
// BooleanOperationNode | ComponentNode | ComponentSetNode | FrameNode | GroupNode | InstanceNode | PageNode | SectionNode

export const getFramesIncludeChildren = (node: FrameNode | ComponentNode | ComponentSetNode): FrameNode[] => {
  const subNodes = node.findAllWithCriteria({ types: ['FRAME'] });
  return (node.type === 'FRAME') ? [node, ...subNodes] : subNodes;
};


