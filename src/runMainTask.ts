import { setAutoLayout } from './setAutoLayout';
import { setObjectSize } from './setObjectSize';

export function runMainTask (currentNode: SceneNode):void {
  setAutoLayout(currentNode);
  setObjectSize(currentNode);
}
