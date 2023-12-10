import { menu } from "./objects";

export function isInitialName(input: string): boolean {
  const initialName = /^Frame(?: [0-9]{1,9})?$/;
  return initialName.test(input);
}

export function isMatchedPrefix(word: string, prefix: string): boolean {
  const pattern = new RegExp(`^${prefix}`);
  return pattern.test(word);
}

export function isInputMode(command: string, input: string): boolean {
  return command === 'INPUT' && !(input === menu.rename || input === menu.reset || input === menu.clear);
}

export function isRenameMode(command: string, input: string): boolean {
  return command === 'RENAME' || command === 'INPUT' && input === menu.rename;
}

export function isResetMode(command: string, input: string): boolean {
  return command === 'RESET' || command === 'INPUT' && input === menu.reset;
}

export function isClearMode(command: string, input: string): boolean {
  return command === 'CLEAR' || command === 'INPUT' && input === menu.clear;
}
