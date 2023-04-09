export const nameTo = {
  array: (key: string): string[] => {
    return key.split(/\s/);
  },
  number: (key: string): number => {
    return Number(key.replace(/[^0-9]/g, ''));
  },
  decimal: (key: string): number => {
    const ratio = key.split('x').map(Number);
    return Math.round(ratio[1] / ratio[0] * 100) / 100;
  }
};
