import { getParentMode } from "./getParentMode";

export function setFlexAxis (currentNode: SceneNode, key: string): void {
  let props = {
    parentLayout: getParentMode(currentNode),
    autoLayout: ('layoutMode' in currentNode) ? currentNode.layoutMode : 'NONE', // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
  };

  switch (key) {
    case 'fill': {
      // ※ fill にするには、AutoLayoutの親が必要
      if (props.parentLayout !== 'NONE') {
        // 自分が AutoLayout の場合、軸サイズを設定する
        if (currentNode.type === 'FRAME' || currentNode.type === 'INSTANCE') {
          switch (props.autoLayout) {
            case 'HORIZONTAL': {
              currentNode.primaryAxisSizingMode = 'FIXED';
              break;
            }
            case 'VERTICAL': {
              currentNode.counterAxisSizingMode = 'FIXED'
              break;
            }
            default: break;
          }
        }
        if ('layoutGrow' in currentNode) {
          switch (props.parentLayout) {
            case 'HORIZONTAL': {
              currentNode.layoutGrow = 1; // 親の主軸
              break;
            }
            case 'VERTICAL': {
              currentNode.layoutAlign = 'STRETCH'; // 親の副軸
              break;
            }
            default: break;
          }
        }
      } else {
        figma.closePlugin('Can Not Fill');
      }
      break;
    }
    case 'hug': {
      // Rectangleはhugできない
      if (currentNode.type !== 'RECTANGLE') {
        if (currentNode.type === 'FRAME') {
          switch (props.autoLayout) {
            case 'HORIZONTAL': {
              currentNode.counterAxisSizingMode = 'AUTO';
              break;
            }
            case 'VERTICAL': {
              currentNode.primaryAxisSizingMode = 'AUTO'
              break;
            }
            default: break;
          }
        }
        if ('layoutGrow' in currentNode) {
          switch (props.parentLayout) {
            case 'HORIZONTAL': {
              currentNode.layoutAlign = 'INHERIT'; // 親の副軸
              break;
            }
            case 'VERTICAL': {
              currentNode.layoutGrow = 0; // 親の主軸
              break;
            }
            default: break;
          }
        }
      } else {
        figma.closePlugin('Can Not Hug');
      }
      break;
    }
    default: break;
  }
}

