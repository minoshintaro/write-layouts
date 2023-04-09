export const pattern = {
  frame: /^Frame [0-9]{1,5}/,
  notNone: /^(?!NONE$)/,
  notNumber: /[^0-9]/g,
  notSpacing: /^(?!g-|p-|px-|py-|pt-|pb-|pl-|pr-)/,

  isRow: (key: string): boolean => ['row'].includes(key),
  isColumn: (key: string): boolean => ['col'].includes(key),
  isJustification: (key: string): boolean => ['g-auto'].includes(key),
  isAlignment: (key: string): boolean => ['baseline'].includes(key),
}
