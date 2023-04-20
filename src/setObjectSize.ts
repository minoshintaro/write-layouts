import { getParentLayoutMode } from "./getParentLayoutMode";
import { getMapByFrameName } from "./getMapByFrameName";

export function setObjectSize (node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    const map = getMapByFrameName(node.name);

    const isStretch = (): boolean => {
      switch (getParentLayoutMode(node)) {
        case 'HORIZONTAL': return node.layoutGrow === 1 ? true : false;
        case 'VERTICAL': return node.layoutAlign === 'STRETCH' ? true : false;
        default: return false;
      }
    };

    const calculateByRatio = (value: number, type?: string): number => {
      const result = Math.round(value * map.get(type === 'inverse' ? 'inverseRatio' : 'ratio'))
      return result >= 1 ? result : 1;
    };

    if (map.has('ratio')) {
      if (!map.has('width') && !map.has('height')) {
        map.set('width', node.width);
        map.set('height', calculateByRatio(node.width));
      } else if (!map.has('width') && map.has('height')) {
        map.set('width', calculateByRatio(map.get('height'), 'inverse'));
      } else if (map.has('width') && !map.has('height')) {
        map.set('height', calculateByRatio(map.get('width')));
      }
      if (isStretch() && !map.has('height')) {
        map.set('height', calculateByRatio(node.width));
        console.log('Under AutoLayout');
      }
    } else {
      if (!map.has('width')) {
        map.set('width', node.width);
      }
      if (!map.has('height')) {
        map.set('height', node.height);
      }
    }

    node.resizeWithoutConstraints(map.get('width'), map.get('height'));
    // console.log(node.name, map.get('width'), map.get('height'));
  } else {
    figma.closePlugin('Not Resized');
  }
}
