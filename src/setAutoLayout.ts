import { getFrameNodeList } from "./getFrameNodeList";
import { getValuesFromName } from "./getValuesFromName";

export function setAutoLayout(currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {

    for (const node of getFrameNodeList(currentNode)) {
      const AlignmentValueOf = (node: FrameNode): string => (node.primaryAxisAlignItems === 'SPACE_BETWEEN') ? 'MIN' : node.primaryAxisAlignItems;
      const values = getValuesFromName(node);

      if (values.has('direction')) {
        node.layoutMode = values.get('direction');
        node.primaryAxisAlignItems = values.has('justification') ? values.get('justification') : AlignmentValueOf(node);
        node.itemSpacing = values.has('gap') ? values.get('gap') : 0
        node.paddingTop = values.has('paddingTop') ? values.get('paddingTop') : 0;
        node.paddingBottom = values.has('paddingBottom') ? values.get('paddingBottom') : 0;
        node.paddingLeft = values.has('paddingLeft') ? values.get('paddingLeft') : 0;
        node.paddingRight = values.has('paddingRight') ? values.get('paddingRight') : 0;
      }

      // console.log('autoLayout:', node.layoutMode, node.primaryAxisAlignItems, node.itemSpacing, node.paddingTop, node.paddingBottom, node.paddingLeft, node.paddingRight);
    }
  }
}
