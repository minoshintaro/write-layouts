import { tailwind, menu, pattern } from "./objects";
import { isMatched } from "./boolean";

export function findMatched(input: string): string[] {
  switch (input) {
    case '': return tailwind.flex;
    case ' ': return Object.values(menu);
    default: {
      const allFrames = figma.currentPage.findAllWithCriteria({ types: ['FRAME'] });
      const currentNameSet = new Set<string>();
      const queryPattern = new RegExp(`^${input}`);

      for (const node of allFrames) {
        if (!isMatched(node.name, pattern.initialFrameName)) currentNameSet.add(node.name);
      }
      return [...currentNameSet].filter(item => isMatched(item, queryPattern)).sort();
    }
  }
}
