import { patterns } from './patterns';

export const getSplitNameList = (node: SceneNode, key?: string): string[] => {
  const pattern = patterns.get('frameNumber');
  const name = node.name.replace(pattern, '').trim();

  if (patterns.has(key)) {
    return name.split(/\s/).filter(item => patterns.get(key).test(item));
  } else {
    return name.split(/\s/);
  }
}
