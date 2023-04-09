import { nameIs } from './nameIs';
import { nameTo } from './nameTo';
import { getParentMode } from './getParentMode';

export function resizeObject (node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    let isFillItem = false;





    let cue = {
      w: false,
      h: false
    };
    let props = {
      isFillItem: false,
      justifySelf: node.layoutGrow, // Main axis: 0 | 1
      alignSelf: node.layoutAlign, // Sub axis: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
      width: node.width,
      height: node.height,
      ratio: 0
    };

    switch (getParentMode(node)) {
      case 'HORITONTAL': {}
      case 'VERTICAL': {}
      default: break;
    }

    if (getParentMode(node) === 'HORITONTAL') {
      props.isFillItem = (node.layoutGrow === 1) ? true : false;
    } else if (getParentMode(node) === 'VERTICAL') {
      props.isFillItem = (node.layoutAlign === 'STRETCH') ? true : false;
    }

    for (const item of nameTo.array(node.name)) {
      if (nameIs.width(item)) {
        props.width = nameTo.number(item);
        cue.w = true;
      }
      if (nameIs.height(item)) {
        props.height = nameTo.number(item);
        cue.h = true;
      }
      if (nameIs.aspectRatio(item)) {
        props.ratio = nameTo.decimal(item);
      }
    }

    if (props.ratio && !cue.h) {
      const value = Math.round(props.width * props.ratio);
      props.height = (value >= 1) ? value : 1;
    } else if (props.ratio && cue.h && !cue.w) {
      const value = Math.round(props.height / props.ratio);
      props.width = (value >= 1) ? value : 1;
    }

    if (!props.isFillItem) {
      node.resizeWithoutConstraints(props.width, props.height);
    } else {
      figma.closePlugin('Please Change Fill to Fixed');
    }

    // console.log(node.name + ':', props);
  }
}
