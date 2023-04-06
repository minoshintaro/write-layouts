import { getParentMode } from './getParentMode';

export function logProps(currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME' || currentNode.type === 'COMPONENT') {
    const startNodeList = currentNode.parent ? Array(currentNode.parent).concat(Array(currentNode)) : Array(currentNode);
    const subNodeList = currentNode.findAllWithCriteria({ types: ['FRAME'] });

    for (const node of startNodeList.concat(subNodeList)) {
      let props = {
        type: node.type,
        flexDirection: 'Not',
        flexMainAxis: 'Not',
        flexSubAxis: 'Not',
        layoutItems: {
          justifyContent: 'Not',
          alignItems: 'Not'
        },
        layoutSelf: {
          justifySelf: 0,
          alignSelf: 'Not'
        }

      }

      if ('layoutMode' in node) { // FRAME | COMPONENT | INSTANCE
        props.flexDirection = node.layoutMode; // 'NONE' | 'HORIZONTAL' | 'VERTICAL'
        props.flexMainAxis = node.primaryAxisSizingMode; // 'FIXED' | 'AUTO'
        props.flexSubAxis = node.counterAxisSizingMode; // 'FIXED' | 'AUTO'
        props.layoutItems.justifyContent = node.primaryAxisAlignItems; // 'MIN' | 'MAX' | 'CENTER' | 'SPACE_BETWEEN'
        props.layoutItems.alignItems = node.counterAxisAlignItems; // 'MIN' | 'MAX' | 'CENTER' | 'BASELINE'
        props.layoutSelf.justifySelf = node.layoutGrow; // Main axis: 0 | 1
        props.layoutSelf.alignSelf = node.layoutAlign; // Sub axis: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'INHERIT'
      }

      console.log(node.name + ':', props);
    }
  }
}
