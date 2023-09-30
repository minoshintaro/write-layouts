type Menu = {
  rename: string;
  reset: string;
  clear: string;
}
export const menu: Menu = {
  rename: 'Rename by Layout',
  reset: 'Set Layout by Name',
  clear: 'Clear Layout Names'
};

type Pattern = {
  initialFrameName: RegExp;
  tailwindPrefix: RegExp;
}
export const pattern: Pattern = {
  initialFrameName: /^Frame(?: [0-9]{1,9})?$/,
  tailwindPrefix: /^(flex|gap|gap-x|gap-y|p|px|py|pl|pr|pt|pb|aspect|w|min-w|max-w|h|min-h|max-h)-/
};

type Tailwind = {
  flex: string[];
  gap: string[];
  justifyContent: string[];
  alignItems: string[];
}
export const tailwind: Tailwind = {
  flex: ['flex flex-col', 'flex flex-row', 'flex flex-wrap'],
  gap: ['gap-1', 'gap-x-1', 'gap-y-1', 'gap-0.5'],
  justifyContent: ['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-stretch'],
  alignItems: ['items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch']
};
