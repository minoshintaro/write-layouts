import { nameIs } from './nameIs';
import { nameTo } from './nameTo';

export function setAutoLayout(currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {
    const subNodeList = currentNode.findAllWithCriteria({ types: ['FRAME'] });

    for (const node of Array(currentNode).concat(subNodeList)) {
      let cue = false;
      let props = {
        flexDirection: node.layoutMode, // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
        justifyContent: node.primaryAxisAlignItems, // 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
        gap: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }

      for (const item of nameTo.array(node.name)) {
        const pixelValue = nameTo.number(item);

        if (nameIs.row(item)) {
          props.flexDirection = 'HORIZONTAL';
          cue = true;
        }
        if (nameIs.column(item)) {
          props.flexDirection = 'VERTICAL';
          cue = true;
        }
        if (nameIs.justification(item)) {
          props.justifyContent = 'SPACE_BETWEEN';
        }
        if (nameIs.gap(item)) {
          props.gap = pixelValue;
        }
        if (nameIs.padding(item) || nameIs.paddingBlock(item) || nameIs.paddingTop(item)) {
          props.paddingTop = pixelValue;
        }
        if (nameIs.padding(item) || nameIs.paddingBlock(item) || nameIs.paddingBottom(item)) {
          props.paddingBottom = pixelValue;
        }
        if (nameIs.padding(item) || nameIs.paddingInline(item) || nameIs.paddingLeft(item)) {
          props.paddingLeft = pixelValue;
        }
        if (nameIs.padding(item) || nameIs.paddingInline(item) || nameIs.paddingRight(item)) {
          props.paddingRight = pixelValue;
        }
      }

      if (cue) {
        node.layoutMode = props.flexDirection;
        node.primaryAxisAlignItems = props.justifyContent;
        node.itemSpacing = props.gap;
        node.paddingTop = props.paddingTop;
        node.paddingBottom = props.paddingBottom;
        node.paddingLeft = props.paddingLeft;
        node.paddingRight = props.paddingRight;
      }

      // console.log(node.name + ":", props);
    }
  }
}
