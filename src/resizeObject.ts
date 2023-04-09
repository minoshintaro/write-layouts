import { nameIs } from './nameIs';
import { convertName } from './convertName';
import { getSplitNameList } from './getSplitNameList';
import { getParentMode } from './getParentMode';

export function resizeObject (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'RECTANGLE') {
    let props = {
      mode: getParentMode(currentNode), // Container: 'HORIZONTAL' | 'VERTICAL' | 'NONE'
      justifySelf: currentNode.layoutGrow, // Main axis: 0 | 1
      alignSelf: currentNode.layoutAlign, // Sub axis: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
      width: currentNode.width, // number
      height: currentNode.height // number
    };
    let size = {
      width: 0,
      height: 0,
      ratio: 0
    };

    for (const name of getSplitNameList(currentNode)) {
      switch (true) {
        case nameIs.width(name): {
          size.width = convertName.number(name);
          break;
        }
        case nameIs.height(name): {
          size.height = convertName.number(name);
          break;
        }
        case nameIs.aspectRatio(name): {
          size.ratio = convertName.decimal(name);
          break;
        }
        default: break;
      }
    }

    if ((props.mode === 'HORIZONTAL' && props.justifySelf === 1) || (props.mode === 'VERTICAL' && props.alignSelf === 'STRETCH')) {
      switch (true) {
        case size.height !== 0: { // 高さ名がある場合、
          size.width = props.width;
          break;
        }
        default: { // 高さ名がない場合、
          const value = size.ratio ? Math.round(props.width * size.ratio) : props.height;
          size.width = props.width;
          size.height = value >= 1 ? value : 1;
          break;
        }
      }
    }

    if (size.width) { // 幅名がある場合、
      switch (true) {
        case size.height === 0: { // 高さ名がない場合、高さを設定する
          const value = size.ratio ? Math.round(size.width * size.ratio) : props.height;
          size.height = value >= 1 ? value : 1;
          break;
        }
        default: break; // 高さ名がある場合、両方揃っているので続行
      }
    } else { // 幅名がない場合、
      switch (true) {
        case size.height !== 0: { // 高さ名がある場合、幅を設定する
          const value = size.ratio ? Math.round(size.height * size.ratio) : props.width;
          size.width = value >= 1 ? value : 1;
          break;
        }
        default: { // 高さ名もない場合、現サイズを踏襲
          const value = size.ratio ? Math.round(props.width * size.ratio) : props.height;
          size.width = props.width;
          size.height = value >= 1 ? value : 1;
          break;
        }
      }
    }

    currentNode.resizeWithoutConstraints(size.width, size.height);
    // console.log(currentNode.name + ':', size, props);
  }
}
