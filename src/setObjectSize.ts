import { getValuesFromName } from "./getValuesFromName";
import { isStretch } from "./isStretch";

export function setObjectSize (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'RECTANGLE') {
    const values = getValuesFromName(currentNode);

    const calculateByRatio = (value: number, type?: string): number => {
      const result = Math.round(value * values.get(type === 'inverse' ? 'inverseRatio' : 'ratio'));
      return result >= 1 ? result : 1;
    };

    if (values.has('ratio')) {
      if (!values.has('width') && !values.has('height')) {
        values.set('width', currentNode.width);
        values.set('height', calculateByRatio(currentNode.width));
      } else if (!values.has('width') && values.has('height')) {
        values.set('width', calculateByRatio(values.get('height'), 'inverse'));
      } else if (values.has('width') && !values.has('height')) {
        values.set('height', calculateByRatio(values.get('width')));
      }
      if (isStretch(currentNode) && !values.has('height')) {
        values.set('height', calculateByRatio(currentNode.width));
      }
    } else {
      if (!values.has('width')) { values.set('width', currentNode.width); }
      if (!values.has('height')) { values.set('height', currentNode.height); }
    }

    currentNode.resizeWithoutConstraints(values.get('width'), values.get('height'));
  } else {
    figma.closePlugin('Not Resized');
  }
}
