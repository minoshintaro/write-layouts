import { getParentLayoutMode } from "./getParentLayoutMode";
import { getMapByFrameName } from "./getMapByFrameName";

export function setObjectSize (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'RECTANGLE') {
    const names = getMapByFrameName(currentNode.name);

    const isStretch = (): boolean => {
      switch (getParentLayoutMode(currentNode)) {
        case 'HORIZONTAL': return currentNode.layoutGrow === 1 ? true : false;
        case 'VERTICAL': return currentNode.layoutAlign === 'STRETCH' ? true : false;
        default: return false;
      }
    };

    const calculateByRatio = (value: number, type?: string): number => {
      const result = Math.round(value * names.get(type === 'inverse' ? 'inverseRatio' : 'ratio'))
      return result >= 1 ? result : 1;
    };

    if (names.has('ratio')) {
      if (!names.has('width') && !names.has('height')) {
        names.set('width', currentNode.width);
        names.set('height', calculateByRatio(currentNode.width));
      } else if (!names.has('width') && names.has('height')) {
        names.set('width', calculateByRatio(names.get('height'), 'inverse'));
      } else if (names.has('width') && !names.has('height')) {
        names.set('height', calculateByRatio(names.get('width')));
      }
      if (isStretch() && !names.has('height')) {
        names.set('height', calculateByRatio(currentNode.width));
      }
    } else {
      if (!names.has('width')) { names.set('width', currentNode.width); }
      if (!names.has('height')) { names.set('height', currentNode.height); }
    }

    currentNode.resizeWithoutConstraints(names.get('width'), names.get('height'));
  } else {
    figma.closePlugin('Not Resized');
  }
}
