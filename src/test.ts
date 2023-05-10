import { getFrameNodeList } from "./getFrameNodeList";

function foo(currentNode: SceneNode): void {
  if (currentNode.type !== 'FRAME') return;
  for (const node of getFrameNodeList(currentNode)) {
    const type = node.layoutMode;
  }
}
