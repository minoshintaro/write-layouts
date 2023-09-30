import { LayoutProp } from "./types";
import { generateNumberFrom } from "./generate";

export function addTailwindProps(data: LayoutProp, input: string): void {
  const classNameSet = new Set<string>(input.trim().split(' '));
  const flexNames: string[] = ["flex", "flex-row", "flex-col", "flex-wrap"];

  // Reset
  if (classNameSet.has(flexNames[0])) {
    data.flow = 'HORIZONTAL';
    data.wrap = 'NO_WRAP';
    data.gap = 0;
    data.gapY = null;
    data.pl = 0;
    data.pr = 0;
    data.pt = 0;
    data.pb = 0;
    // map.set('primaryAxisSizingMode', 'AUTO');
    // map.set('counterAxisSizingMode', 'AUTO');
    // map.set('primaryAxisAlignItems', 'MIN');
    // map.set('counterAxisAlignItems', 'MIN');
    // map.set('counterAxisAlignContent', 'AUTO');
  }

  // Flexbox
  if (classNameSet.has(flexNames[1])) data.flow = 'HORIZONTAL';
  if (classNameSet.has(flexNames[2])) data.flow = 'VERTICAL';
  if (classNameSet.has(flexNames[3])) data.wrap = 'WRAP';
  flexNames.forEach(item => classNameSet.delete(item));

  // Spacing
  for (const className of classNameSet) {
    const value: number | null = generateNumberFrom(className);
    if (!value) continue;
    if (/^(gap-|gap-x-)/.test(className)) data.gap = value;
    if (/^(gap-y-)/.test(className)) data.gapY = value;
    if (/^(p-|px-|pl-)/.test(className)) data.pl = value;
    if (/^(p-|px-|pr-)/.test(className)) data.pr = value;
    if (/^(p-|py-|pt-)/.test(className)) data.pt = value;
    if (/^(p-|py-|pb-)/.test(className)) data.pb = value;
  }
}
