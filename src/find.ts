import { tailwind, menu, pattern } from "./objects";
import { isMatched } from "./boolean";

export function findMatchedWords(nodes: FrameNode[], input: string): string[] {
  switch (input) {
    case '': return tailwind.flex;
    case ' ': return Object.values(menu);
    default: {
      const currentNameSet = new Set<string>();
      const query = new RegExp(`^${input}`);
      for (const node of nodes) {
        if (!isMatched(node.name, pattern.initialFrameName)) currentNameSet.add(node.name);
      }
      return [...currentNameSet].filter(item => isMatched(item, query)).sort();
    }
  }
}
