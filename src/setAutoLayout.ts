import { convertName } from './convertName';
import { nameIs } from './nameIs';
import { getFrameNodeList } from './getFrameNodeList';
import { getSplitNameList } from './getSplitNameList';
import { pattern } from './pattern';

export function setAutoLayout (currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {
    for (const node of getFrameNodeList(currentNode)) {
      if ('layoutMode' in node) {
        let cue = false;
        let props = {
          flexDirection: node.layoutMode, // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
          justifyContent: node.primaryAxisAlignItems, // 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
          gap: 0, // number
          paddingTop: 0, // number
          paddingBottom: 0, // number
          paddingLeft: 0, // number
          paddingRight: 0, // number
        }

        for (const name of getSplitNameList(node)) {
          const pixelValue = convertName.number(name);

          switch (true) {
            case pattern.isRow(name): {
              props.flexDirection = 'HORIZONTAL';
              cue = true;
              break;
            }
            case nameIs.column(name): {
              props.flexDirection = 'VERTICAL';
              cue = true;
              break;
            }
            case nameIs.justification(name): {
              props.justifyContent = 'SPACE_BETWEEN';
              break;
            }
            case nameIs.gap(name): {
              props.gap = pixelValue;
              break;
            }
            case nameIs.padding(name): {
              props.paddingTop = pixelValue;
              props.paddingBottom = pixelValue;
              props.paddingLeft = pixelValue;
              props.paddingRight = pixelValue;
              break;
            }
            case nameIs.paddingBlock(name): {
              props.paddingTop = pixelValue;
              props.paddingBottom = pixelValue;
              break;
            }
            case nameIs.paddingInline(name): {
              props.paddingLeft = pixelValue;
              props.paddingRight = pixelValue;
              break;
            }
            case nameIs.paddingTop(name): {
              props.paddingTop = pixelValue;
              break;
            }
            case nameIs.paddingBottom(name): {
              props.paddingBottom = pixelValue;
              break;
            }
            case nameIs.paddingLeft(name): {
              props.paddingLeft = pixelValue;
              break;
            }
            case nameIs.paddingRight(name): {
              props.paddingRight = pixelValue;
              break;
            }
            default: break;
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

        console.log(node.name + ":", props);
      }
    }
  } else {
    figma.closePlugin('Not Frame');
  }
}
