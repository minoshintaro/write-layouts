import { getLayoutMode } from "./getLayoutMode";
import { getValuesFromName } from "./getValuesFromName";

export function setObjectSize(currentNode: SceneNode): void {
  if (
    currentNode.type === 'FRAME' ||
    currentNode.type === 'COMPONENT' ||
    currentNode.type === 'INSTANCE' ||
    currentNode.type === 'RECTANGLE'
  ) {
    const calculate = (value: number, ratio: number): number => {
      const result = Math.round(value * ratio);
      return result >= 1 ? result : 1;
    }
    const values = getValuesFromName(currentNode);
    let w = values.has('width') ? values.get('width') : currentNode.width;
    let h = values.has('height') ? values.get('height') : currentNode.height;

    if (values.has('ratio') && values.has('width')) {
      // w = w;
      h = values.has('height') ? h : calculate(w, values.get('ratio'));
    } else if (values.has('ratio') && !values.has('width')) {
      w = values.has('height') ? calculate(h, values.get('inverseRatio')) : w;
      h = values.has('height') ? h : calculate(w, values.get('ratio'));
    }

    if (values.has('width')) {
      switch (getLayoutMode(currentNode, 'parent')) {
        case 'HORIZONTAL': {
          currentNode.layoutGrow = 0;
          break;
        }
        case 'VERTICAL': {
          currentNode.layoutAlign = 'INHERIT';
          break;
        }
        default: break;
      }
    }

    currentNode.resizeWithoutConstraints(w, h);
  }
}

    // values.set('width', w);
    // values.set('height', h);

    // currentNode.resizeWithoutConstraints(values.get('width'), values.get('height'));

    // const calculateByRatio = (value: number, type?: string): number => {
    //   const result = Math.round(value * values.get(type === 'inverse' ? 'inverseRatio' : 'ratio'));
    //   return result >= 1 ? result : 1;
    // };
    //
    // if (values.has('ratio')) {
    //   if (!values.has('width') && !values.has('height')) {
    //     values.set('width', currentNode.width);
    //     values.set('height', calculateByRatio(currentNode.width));
    //   } else if (!values.has('width') && values.has('height')) {
    //     values.set('width', calculateByRatio(values.get('height'), 'inverse'));
    //   } else if (values.has('width') && !values.has('height')) {
    //     values.set('height', calculateByRatio(values.get('width')));
    //   }
    //
    //   if (isStretch(currentNode) && !values.has('height')) {
    //     values.set('height', calculateByRatio(currentNode.width));
    //   }
    // } else {
    //   if (!values.has('width')) { values.set('width', currentNode.width); }
    //   if (!values.has('height')) { values.set('height', currentNode.height); }
    // }
    //
    // currentNode.resizeWithoutConstraints(values.get('width'), values.get('height'));

