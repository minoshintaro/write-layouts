
export function setFlexAxis (currentNode: SceneNode, key: string): void {
  let props = {
    parentLayout: (currentNode.parent && 'layoutMode' in currentNode.parent) ? currentNode.parent.layoutMode : 'NONE',
    autoLayout: ('layoutMode' in currentNode) ? currentNode.layoutMode : 'NONE', // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
    mainAxis: ('layoutMode' in currentNode) ? currentNode.primaryAxisSizingMode : 'NONE', // 'FIXED' | 'AUTO'
    subAxis: ('layoutMode' in currentNode) ? currentNode.counterAxisSizingMode : 'NONE', // 'FIXED' | 'AUTO'
    mainFlex: ('layoutGrow' in currentNode) ? currentNode.layoutGrow : 0, // 0 | 1
    subFlex: ('layoutAlign' in currentNode) ? currentNode.layoutAlign : 'INHERIT' // 'STRETCH' | 'INHERIT'
  };

  // 自分がAutoLayout かつ 親がAutoLayout
  if (currentNode.type === 'FRAME' && props.parentLayout !== 'NONE' && props.autoLayout !== 'NONE') {
    switch (props.parentLayout === 'HORIZONTAL' && props.autoLayout) {
      case 'HORIZONTAL': {
        if (key === 'fill') {
          currentNode.primaryAxisSizingMode = 'FIXED'; // 親が → 自分が → 自分は主軸
          currentNode.layoutGrow = 1; // 親が → 自分が → 子は主軸
          break;
        }
        if (key === 'hug') {
          currentNode.counterAxisSizingMode = 'AUTO'; // 親が → 自分が →
          currentNode.layoutAlign = 'INHERIT'; // 親が → 自分が → 子は副軸
          break;
        }
      }
      case 'VERTICAL': {
        if (key === 'fill') {
          currentNode.counterAxisSizingMode = 'FIXED';
          currentNode.layoutAlign = 'STRETCH';
          break;
        }
        if (key === 'hug') {
          currentNode.primaryAxisSizingMode = 'AUTO';
          currentNode.layoutGrow = 0;
          break;
        }
      }
      default: break;
    }
    switch (props.parentLayout === 'VERTICAL' && props.autoLayout) {
      case 'HORIZONTAL': {
        if (key === 'fill') {
          currentNode.primaryAxisSizingMode = 'FIXED';
          currentNode.layoutAlign = 'STRETCH';
          break;
        }
        if (key === 'hug') {
          currentNode.counterAxisSizingMode = 'AUTO';
          currentNode.layoutGrow = 0;
          break;
        }
      }
      case 'VERTICAL': {

      }
      default: break;

    }


    switch (props.parentLayout) {
      case 'HORIZONTAL': {
        if (key === 'fill' && props.autoLayout === 'HORIZONTAL') {
          switch (currentNode.type) {
            case 'FRAME': {

              break;
            }
          }

          // → 主軸が Row, mainFlex 1, mainAxis FIXED



        }
        if (key === 'hug' && props.autoLayout === 'HORIZONTAL') {

        }
      }
    }
  }
  // 自分がAutoLayout かつ 親が非AutoLayout
  if (props.autoLayout !== 'NONE' && props.parentLayout === 'NONE') {}
  // 自分が非AutoLayout かつ 親がAutoLayout
  if (props.autoLayout === 'NONE' && props.parentLayout !== 'NONE') {}

  if (key === 'fill') {
    switch (currentNode.type) {
      case 'FRAME': {

        console.log('test:', props);
        break;
      }
      default: return;
    }
  } else if (key === 'hug') {

  }
}

