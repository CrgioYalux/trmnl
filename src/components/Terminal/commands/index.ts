import { cd } from './cd';

export const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch', 'clear'] as const;

export type TerminalCommand = typeof TerminalCommands[number];

export const command = {
    cd
};
