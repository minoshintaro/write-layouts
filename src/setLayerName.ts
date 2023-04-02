import { nameIs } from './nameIs';
import { nameTo } from './nameTo';

export function setLayerNameToFrame(currentNode: SceneNode): void {
  if (currentNode.type === 'FRAME') {
    const subNodeList = currentNode.findAllWithCriteria({ types: ['FRAME'] });

    for (const node of Array(currentNode).concat(subNodeList)) {
      let props = {
        flexDirection: node.layoutMode,
        justifyContent: node.primaryAxisAlignItems,
        gap: node.itemSpacing,
        paddingTop: node.paddingTop,
        paddingBottom: node.paddingBottom,
        paddingLeft: node.paddingLeft,
        paddingRight: node.paddingRight
      }

      let nameList = nameTo.array(node.name);
      // nameList.filter(item => );


      // const lorem = ;
      // node.name = lorem;


    }
  }
}
