import { getParentMode } from "./getParentMode";
import { getMapByFrameName } from "./getMapByFrameName";

export function test(node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'RECTANGLE') {
    const map = getMapByFrameName(node.name);

    const checkLayoutMode = () => {
      const parent = getParentMode(node);
      return (parent === 'HORIZONTAL' && node.layoutGrow === 1) || (parent === 'VERTICAL' && node.layoutAlign === 'STRETCH') ? true : false;
    };
    const getValueByRatio = (value: number, type?: string) => {
      const result = type === 'inverse' ? Math.round(value * map.get('inverseRatio')) : Math.round(value * map.get('ratio'));
      return result >= 1 ? result : 1;
    };

    if (map.has('ratio')) {
      if (!map.has('width') && !map.has('height')) {
        map.set('width', node.width);
        map.set('height', getValueByRatio(node.width));
      } else if (!map.has('width') && map.has('height')) {
        map.set('width', getValueByRatio(map.get('height'), 'inverse'));
      } else if (map.has('width') && !map.has('height')) {
        map.set('height', getValueByRatio(map.get('width')));
      }
      if (checkLayoutMode() && !map.has('height')) {
        map.set('height', getValueByRatio(node.width));
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
    console.log(node.name, map.get('width'), map.get('height'));
  } else {
    figma.closePlugin('Not Resized');
  }
}
