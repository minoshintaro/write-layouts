import { getLayoutMode } from "./getLayoutMode";
import { getValuesFromName } from "./getValuesFromName";

const calculate = (value: number, ratio: number): number => {
  const result = Math.round(value * ratio);
  return (result >= 1) ? result : 1;
}

export function setObjectSize(currentNode: SceneNode): void {
  const type = currentNode.type;
  if (type !== 'FRAME' && type !== 'COMPONENT' && type !== 'INSTANCE' && type !== 'RECTANGLE') return;

  const values = getValuesFromName(currentNode);
  let w = values.has('width') ? values.get('width') : currentNode.width;
  let h = values.has('height') ? values.get('height') : currentNode.height;

  if (values.has('ratio') && values.has('width')) {
    h = values.has('height') ? h : calculate(w, values.get('ratio'));
  }
  if (values.has('ratio') && !values.has('width')) {
    w = values.has('height') ? calculate(h, values.get('inverseRatio')) : w;
    h = values.has('height') ? h : calculate(w, values.get('ratio'));
  }

  const parent = getLayoutMode(currentNode, 'parent');
  if (values.has('width') && parent === 'HORIZONTAL') {
    currentNode.layoutGrow = 0;
  }
  if (values.has('width') && parent === 'VERTICAL') {
    currentNode.layoutAlign = 'INHERIT';
  }

  currentNode.resizeWithoutConstraints(w, h);
}
