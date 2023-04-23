import { getValuesFromName } from "./getValuesFromName";

export function setAutoLayout (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {
    const subList = currentNode.findAllWithCriteria({ types: ['FRAME'] });
    const nodeList = currentNode.type === 'FRAME' ? Array(currentNode).concat(subList) : subList;

    for (const node of nodeList) {
      const values = getValuesFromName(node);
      const getCurrentAlignmentValue = (): string => node.primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'MIN' : node.primaryAxisAlignItems;

      if (values.has('direction')) {
        node.layoutMode = values.get('direction');
        node.primaryAxisAlignItems = values.has('justification') ? values.get('justification') : getCurrentAlignmentValue();
        node.itemSpacing = values.has('gap') ? values.get('gap') : 0
        node.paddingTop = values.has('paddingTop') ? values.get('paddingTop') : 0;
        node.paddingBottom = values.has('paddingBottom') ? values.get('paddingBottom') : 0;
        node.paddingLeft = values.has('paddingLeft') ? values.get('paddingLeft') : 0;
        node.paddingRight = values.has('paddingRight') ? values.get('paddingRight') : 0;
      }

      // console.log('autoLayout:', node.layoutMode, node.primaryAxisAlignItems, node.itemSpacing, node.paddingTop, node.paddingBottom, node.paddingLeft, node.paddingRight);
    }
  } else {
    figma.closePlugin('Please select frames');
  }
}
