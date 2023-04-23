import { getLayoutMode } from "./getLayoutMode";

export function setFlexAxis (currentNode: SceneNode, key: string): void {
  const props = new Map();
  props.set('parentLayout', getLayoutMode(currentNode, 'parent'));
  props.set('selfLayout', getLayoutMode(currentNode));

  // [1] AxisSizingMode
  if (currentNode.type === 'FRAME' || currentNode.type === 'INSTANCE') {
    switch (props.get('selfLayout')) {
      case 'HORIZONTAL': {
        if (key === 'fill') { currentNode.primaryAxisSizingMode = 'FIXED'; }
        if (key === 'hug') { currentNode.counterAxisSizingMode = 'AUTO'; }
      }
      case 'VERTICAL': {
        if (key === 'fill') { currentNode.counterAxisSizingMode = 'FIXED'; }
        if (key === 'hug') { currentNode.primaryAxisSizingMode = 'AUTO'; }
      }
      default: break;
    }
  }

  // [2] As AutoLayout Items
  if (props.get('parentLayout') !== 'NONE' && 'layoutGrow' in currentNode) {
    switch (props.get('parentLayout')) {
      case 'HORIZONTAL': {
        if (key === 'fill') { currentNode.layoutGrow = 1; } // 親の主軸
        if (key === 'hug') { currentNode.layoutAlign = 'INHERIT'; } // 親の副軸
        break;
      }
      case 'VERTICAL': {
        if (key === 'fill') { currentNode.layoutAlign = 'STRETCH'; } // 親の副軸
        if (key === 'hug') { currentNode.layoutGrow = 0; } // 親の主軸
        break;
      }
      default: break;
    }
  }
}

export function setFlexAxis2 (currentNode: SceneNode, key: string): void {
  let props = {
    parentLayout: getLayoutMode(currentNode, 'parent'),
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

