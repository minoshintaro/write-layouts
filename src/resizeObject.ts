import { nameIs } from './nameIs';
import { nameTo } from './nameTo';
import { getParentMode } from './utility';

export function resizeObject(node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    // const direction = node.parent && node.parent.type === 'FRAME' ? node.parent.layoutMode : false;
    let cue = {
      w: false,
      h: false
    };
    let props = {
      flex: false,
      justifySelf: node.layoutGrow, // Main axis: 0 | 1
      alignSelf: node.layoutAlign, // Sub axis: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
      width: node.width,
      height: node.height,
      ratio: 0
    };

    if (getParentMode(node) === 'HORITONTAL') {
      props.flex = (node.layoutGrow === 1) ? true : false;
    } else if (getParentMode(node) === 'VERTICAL') {
      props.flex = (node.layoutAlign === 'STRETCH') ? true : false;
    }

    for (const item of nameTo.array(node.name)) {
      if (nameIs.width(item)) {
        props.width = nameTo.number(item);
        cue.w = true;
      } else if (nameIs.height(item)) {
        props.height = nameTo.number(item);
        cue.h = true;
      } else if (nameIs.aspectRatio(item)) {
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

    if (!props.flex) {
      node.resizeWithoutConstraints(props.width, props.height);
    }

    // console.log(node.name, props);
  }
}
