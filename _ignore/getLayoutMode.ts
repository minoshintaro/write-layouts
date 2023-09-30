export const getLayoutMode = (node: SceneNode, option?: string): string => {
  switch (option) {
    case 'parent': {
      return (node.parent && 'layoutMode' in node.parent) ? node.parent.layoutMode : 'NONE';
    }
    default: {
      return ('layoutMode' in node) ? node.layoutMode : 'NONE';
    }
  }
}
