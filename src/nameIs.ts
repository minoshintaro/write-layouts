export const nameIs = {
  // Flexbox
  row: (key: string): boolean => ['row', 'flex'].includes(key),
  column: (key: string): boolean => ['col', 'stack'].includes(key),
  justification: (key: string): boolean => ['g-auto'].includes(key),
  alignment: (key: string): boolean => ['baseline'].includes(key),

  // Space
  gap: (key: string): boolean => /^g-/.test(key),
  padding: (key: string): boolean => /^p-/.test(key),
  paddingBlock: (key: string): boolean => /^py-/.test(key),
  paddingInline: (key: string): boolean => /^px-/.test(key),
  paddingTop: (key: string): boolean => /^pt-/.test(key),
  paddingBottom: (key: string): boolean => /^pb-/.test(key),
  paddingLeft: (key: string): boolean => /^pl-/.test(key),
  paddingRight: (key: string): boolean => /^pr-/.test(key),

  // Size
  width: (key: string): boolean => /^w-/.test(key),
  height: (key: string): boolean => /^h-/.test(key),
  aspectRatio: (key: string): boolean => /^[0-9]{1,4}x[0-9]{1,4}$/.test(key)
};
