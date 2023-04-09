export function getFrameNodeList (node: SceneNode): SceneNode[] {
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const subNodeList = node.findAllWithCriteria({ types: ['FRAME'] });
    return Array(node).concat(subNodeList);
  } else {
    return Array(node);
  }
}

// findAllWithCriteria Supported On:
// BooleanOperationNode
// ComponentNode
// ComponentSetNode
// FrameNode
// GroupNode
// InstanceNode
// PageNode
// SectionNode
