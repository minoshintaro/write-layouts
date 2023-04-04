import { getParentMode } from './getParentMode';

export function logProps(node: SceneNode): void {
  if (node.type === 'FRAME' || node.type === 'COMPONENT') {
    const subNodeList = node.findAllWithCriteria({ types: ['FRAME'] });

    for (const targetNode of Array(node).concat(subNodeList)) {
      let props = {
        parent: getParentMode(node),

        flexDirection: targetNode.layoutMode, // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
        flexMainAxis: targetNode.primaryAxisSizingMode, // 'FIXED' | 'AUTO'
        flexSubAxis: targetNode.counterAxisSizingMode, // 'FIXED' | 'AUTO'

        layoutItems: {
          justifyContent: targetNode.primaryAxisAlignItems, // 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
          alignItems: targetNode.counterAxisAlignItems, // 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
        },
        layoutSelf: {
          justifySelf: targetNode.layoutGrow, // Main axis: 0 | 1
          alignSelf: targetNode.layoutAlign, // Sub axis: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
        },
        // position: targetNode.layoutPositioning, // 'AUTO' | 'ABSOLUTE'
        size: {
          width: targetNode.width,
          height: targetNode.height,
        },
        space: {
          gap: targetNode.itemSpacing,
          paddingTop: targetNode.paddingTop,
          paddingBottom: targetNode.paddingBottom,
          paddingLeft: targetNode.paddingLeft,
          paddingRight: targetNode.paddingRight
        }
      }

      console.log(node.name + ':', props);
    }
  }
}
