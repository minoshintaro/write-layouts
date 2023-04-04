export function getParentMode(node: SceneNode): string {
  return node.parent && (node.parent.type === 'FRAME' || node.parent.type === 'COMPONENT') ? node.parent.layoutMode : 'NONE';
}
