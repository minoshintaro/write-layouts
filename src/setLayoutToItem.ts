const keys: string[] = [
  'hug',
  'fill'
];

export function setLayoutToItem(currentNode: SceneNode): void {
  if ('layoutMode' in currentNode) { // ComponentNode | ComponentSetNode | FrameNode | InstanceNode
    const childNodeList = currentNode.findChildren(item =>
      item.type === 'FRAME' ||
      item.type === 'TEXT' ||
      item.type === 'RECTANGLE' ||
      item.type === 'INSTANCE'
    );

    for (const node of childNodeList) {
      if ('layoutGrow' in node) {
        if (currentNode.layoutMode === 'HORIZONTAL') {
          node.layoutGrow = 1;
        } else if (currentNode.layoutMode === 'VERTICAL') {
          node.layoutAlign = 'STRETCH';
        }

        // let props = {
        //   justifySelf: node.layoutGrow,
        //   alignSelf: node.layoutAlign
        // }

        // console.log(node.name + ':', props);
      }
    }
  }
}
