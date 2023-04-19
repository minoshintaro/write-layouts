import { pattern } from "./pattern";

export const convertNameTo = {
  number: (name: string): number => {
    return Number(name.replace(pattern.notNumber, ''));
  },
  multiplier: (name: string, type?: string): number => {
    const ratio = name.split('x').map(Number);
    switch (type) {
      case 'inverse': return Math.round(ratio[0] / ratio[1] * 100) / 100;
      default: return Math.round(ratio[1] / ratio[0] * 100) / 100;
    }
  }
};
