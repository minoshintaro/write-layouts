import { pattern } from "./pattern";

export const convertName = {
  number: (name: string): number => {
    return Number(name.replace(pattern.notNumber, ''));
  },
  decimal: (name: string): number => {
    const ratio = name.split('x').map(Number);
    return Math.round(ratio[1] / ratio[0] * 100) / 100;
  }
};
