import { getLayoutMode } from "./getLayoutMode";

export function setFlexibility (currentNode: SceneNode, key: string): void {
  let message: string = '';

  if (
    currentNode.type === 'FRAME' ||
    currentNode.type === 'INSTANCE' ||
    currentNode.type === 'ELLIPSE' ||
    currentNode.type === 'LINE' ||
    currentNode.type === 'RECTANGLE' ||
    currentNode.type === 'TEXT'
  ) {
    switch (getLayoutMode(currentNode, 'parent')) {
      case 'HORIZONTAL': {
        if (key === 'fill') {
          currentNode.layoutGrow = 1; // Primary axis
          message = 'Fill container';
        }
        if (key === 'hug') {
          currentNode.layoutAlign = 'INHERIT'; // Counter axis
          message = 'Hug contents';
        }
        break;
      }
      case 'VERTICAL': {
        if (key === 'fill') {
          currentNode.layoutAlign = 'STRETCH'; // Counter axis
          message = 'Fill container';
        }
        if (key === 'hug') {
          currentNode.layoutGrow = 0; // Primary axis
          message = 'Hug contents';
        }
        break;
      }
      default: {
        message = 'Not Auto Layout';
        break;
      }
    }
  }

  if (currentNode.type === 'FRAME' || currentNode.type === 'INSTANCE' || currentNode.type === 'COMPONENT') {
    switch (getLayoutMode(currentNode)) {
      case 'HORIZONTAL': {
        if (key === 'fill') {
          currentNode.primaryAxisSizingMode = 'FIXED';
          message = getLayoutMode(currentNode, 'parent') === 'NONE' ? 'Fixed width' : 'Fill container';
        }
        if (key === 'hug') {
          currentNode.counterAxisSizingMode = 'AUTO';
          message = 'Hug contents';
        }
        break;
      }
      case 'VERTICAL': {
        if (key === 'fill') {
          currentNode.counterAxisSizingMode = 'FIXED';
          message = getLayoutMode(currentNode, 'parent') === 'NONE' ? 'Fixed width' : 'Fill container';
        }
        if (key === 'hug') {
          currentNode.primaryAxisSizingMode = 'AUTO';
          message = 'Hug contents';
        }
        break;
      }
      default: break;
    }
  }
  figma.closePlugin(message);
}
