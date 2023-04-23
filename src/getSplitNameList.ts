import { patterns } from './patterns';

export const getSplitNameList = (node: SceneNode, key?: string): string[] => {
  const name = node.name.replace(patterns.get('frameNumber'), '').trim();
  if (patterns.has(key)) {
    return name.split(/\s/).filter(item => patterns.get(key).test(item));
  } else {
    return name.split(/\s/);
  }
}
