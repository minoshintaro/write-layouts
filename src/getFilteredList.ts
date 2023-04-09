export const getFilteredList = (target: string[], key: string): string[] => {
  const k = key.toLowerCase();
  return target.filter(item => item.toLowerCase().includes(k));
}
