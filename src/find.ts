import { tailwind, menu } from "./objects";
import { isInitialName, isMatchedPrefix } from "./boolean";

export function findMatchedList(input: string): string[] {
  switch (input) {
  case '': return tailwind.flex;
  case ' ': return Object.values(menu);
  case 'f': return ['flex-col', 'flex-row', 'flex-wrap'];
  case 'c': return ['flex-col'];
  case 'r': return ['flex-row'];
  case 'w': return ['flex-wrap'];
  default: {
    const allFrames = figma.currentPage.findAllWithCriteria({ types: ['FRAME'] });
    const currentNameSet = new Set<string>();

    for (const frame of allFrames) {
      if (!isInitialName(frame.name)) currentNameSet.add(frame.name);
    }

    return [...currentNameSet].filter(name => isMatchedPrefix(name, input)).sort();
  }
  }
}
