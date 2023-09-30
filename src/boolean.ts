import { menu } from "./objects";

export function isMatched(input: string, pattern: RegExp): boolean {
  return pattern.test(input);
}

// # Menu
// - INPUT { 配下含む: false, 属性上書き: true, 名前上書き: true }
// - RENAME { 配下含む: true, 属性上書き: false, 名前上書き: true }
// - RESET { 配下含む: true, 属性上書き: true, 名前上書き: false }
// - CLEAR { 配下含む: true, 属性上書き: false, 名前上書き: true }

export function includeSubNodes(input: string): boolean {
  return input !== 'INPUT';
}

export function isSettingMode(input: string, option: string): boolean {
  return input === 'INPUT' || input === 'RESET' || option === menu.reset;
}

export function isNamingMode(input: string, option: string): boolean {
  return input !== 'RESET' && option !== menu.reset;
}
