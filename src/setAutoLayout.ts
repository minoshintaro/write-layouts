import { getMapByFrameName } from "./getMapByFrameName";

export function setAutoLayout (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {
    const subList = currentNode.findAllWithCriteria({ types: ['FRAME'] });
    const nodeList = currentNode.type === 'FRAME' ? Array(currentNode).concat(subList) : subList;

    for (const node of nodeList) {
      const names = getMapByFrameName(node.name);
      const getCurrentAlignmentValue = (): string => node.primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'MIN' : node.primaryAxisAlignItems;

      if (names.has('direction')) {
        node.layoutMode = names.get('direction');
        node.primaryAxisAlignItems = names.has('justification') ? names.get('justification') : getCurrentAlignmentValue();
        node.itemSpacing = names.has('gap') ? names.get('gap') : 0
        node.paddingTop = names.has('paddingTop') ? names.get('paddingTop') : 0;
        node.paddingBottom = names.has('paddingBottom') ? names.get('paddingBottom') : 0;
        node.paddingLeft = names.has('paddingLeft') ? names.get('paddingLeft') : 0;
        node.paddingRight = names.has('paddingRight') ? names.get('paddingRight') : 0;
      }

      // console.log('autoLayout:', node.layoutMode, node.primaryAxisAlignItems, node.itemSpacing, node.paddingTop, node.paddingBottom, node.paddingLeft, node.paddingRight);
    }
  } else {
    figma.closePlugin('Please select frames');
  }
}
