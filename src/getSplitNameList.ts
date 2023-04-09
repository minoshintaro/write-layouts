import { pattern } from './pattern';

export function getSplitNameList (node: SceneNode): string[] {
  const name = node.name.replace(pattern.frame, '').trim();
  return name.split(/\s/);
}
