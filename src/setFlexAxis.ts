import { getParentMode } from './getParentMode';

const keys: string[] = [
  'hug',
  'fill'
];

export function setFlexAxis (currentNode: SceneNode, key: string): void {
  if ('layoutGrow' in currentNode && key === 'fill') {
    switch (getParentMode(currentNode)) {
      case 'HORIZONTAL':
        currentNode.layoutGrow = 1;
        // currentNode.primaryAxisAlignItems = 'AUTO';
        break;
      case 'VERTICAL':
        currentNode.layoutAlign = 'STRETCH';
        break;
      default:
        break;
    }
  } else if ('layoutGrow' in currentNode && key === 'hug') {
    switch (getParentMode(currentNode)) {
      case 'HORIZONTAL':
        currentNode.layoutGrow = 0;
        break;
      case 'VERTICAL':
        currentNode.layoutAlign = 'INHERIT';
        break;
      default:
        break;
    }
  }
}

export function setFlexAxisToItem(currentNode: SceneNode): void {
  if ('layoutMode' in currentNode) { // ComponentNode | ComponentSetNode | FrameNode | InstanceNode
    const childNodeList = currentNode.findChildren(item =>
      item.type === 'FRAME' ||
      item.type === 'TEXT' ||
      item.type === 'RECTANGLE' ||
      item.type === 'INSTANCE'
    );

    for (const node of childNodeList) {
      if ('layoutGrow' in node) {
        switch (currentNode.layoutMode) {
          case 'HORIZONTAL':
            node.layoutGrow = 1;
            break;
          case 'VERTICAL':
            node.layoutAlign = 'STRETCH';
            break;
          default:
            break;
        }
      }
    }
  }
}
