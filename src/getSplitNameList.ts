import { patterns } from './patterns';

export function getSplitNameList (node: SceneNode): string[] {
  const name = node.name.replace(patterns.get('frame'), '').trim();
  return name.split(/\s/);
}
