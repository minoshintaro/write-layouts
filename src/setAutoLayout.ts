import { getMapByFrameName } from "./getMapByFrameName";

export function setAutoLayout (node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const subList = node.findAllWithCriteria({ types: ['FRAME'] });
    const nodeList = node.type === 'FRAME' ? Array(node).concat(subList) : subList;

    for (const node of nodeList) {
      const map = getMapByFrameName(node.name);
      const checkCurrentJustification = () => node.primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'MIN' : node.primaryAxisAlignItems;

      if (map.has('direction')) {
        node.layoutMode = map.get('direction');
        node.primaryAxisAlignItems = map.has('justification') ? map.get('justification') : checkCurrentJustification();
        node.itemSpacing = map.has('gap') ? map.get('gap') : 0
        node.paddingTop = map.has('paddingTop') ? map.get('paddingTop') : 0;
        node.paddingBottom = map.has('paddingBottom') ? map.get('paddingBottom') : 0;
        node.paddingLeft = map.has('paddingLeft') ? map.get('paddingLeft') : 0;
        node.paddingRight = map.has('paddingRight') ? map.get('paddingRight') : 0;
      }

      // console.log('autoLayout:', node.layoutMode, node.primaryAxisAlignItems, node.itemSpacing, node.paddingTop, node.paddingBottom, node.paddingLeft, node.paddingRight);
    }
  } else {
    figma.closePlugin('Not Frame');
  }
}
