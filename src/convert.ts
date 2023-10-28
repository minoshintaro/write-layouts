
export function convertClassNameToValue(input: string): number | null {
  const words: string[] = input.split('-');
  const value: number = parseInt(words[words.length - 1]);
  return typeof value === 'number' ? value : null;
}
