export function getParentMode(node: SceneNode): string {
  if (node.parent && 'layoutMode' in node.parent) {
    return node.parent.layoutMode;
  } else {
    return 'NONE';
  }
}
