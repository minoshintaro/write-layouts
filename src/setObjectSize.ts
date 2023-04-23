import { getParentLayoutMode } from "./getParentLayoutMode";
import { getMapByFrameName } from "./getMapByFrameName";

export function setObjectSize (node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    const names = getMapByFrameName(node.name);

    const isStretch = (): boolean => {
      switch (getParentLayoutMode(node)) {
        case 'HORIZONTAL': return node.layoutGrow === 1 ? true : false;
        case 'VERTICAL': return node.layoutAlign === 'STRETCH' ? true : false;
        default: return false;
      }
    };

    const calculateByRatio = (value: number, type?: string): number => {
      const result = Math.round(value * names.get(type === 'inverse' ? 'inverseRatio' : 'ratio'))
      return result >= 1 ? result : 1;
    };

    if (names.has('ratio')) {
      if (!names.has('width') && !names.has('height')) {
        names.set('width', node.width);
        names.set('height', calculateByRatio(node.width));
      } else if (!names.has('width') && names.has('height')) {
        names.set('width', calculateByRatio(names.get('height'), 'inverse'));
      } else if (names.has('width') && !names.has('height')) {
        names.set('height', calculateByRatio(names.get('width')));
      }
      if (isStretch() && !names.has('height')) {
        names.set('height', calculateByRatio(node.width));
      }
    } else {
      if (!names.has('width')) {
        names.set('width', node.width);
      }
      if (!names.has('height')) {
        names.set('height', node.height);
      }
    }

    node.resizeWithoutConstraints(names.get('width'), names.get('height'));
  } else {
    figma.closePlugin('Not Resized');
  }
}
