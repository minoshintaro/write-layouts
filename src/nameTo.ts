export const nameTo = {
  array: (key: string): string[] => key.split(/\s/),
  number: (key: string): number => Number(key.replace(/[^0-9]/g, '')),
  decimal: (key: string): number => {
    const fraction = key.split('x').map(Number);
    return Math.round(fraction[1] / fraction[0] * 100) / 100;
  }
};
