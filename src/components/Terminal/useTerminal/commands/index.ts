import { cd } from './cd';
import { tree, Directory } from './tree';

export const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch', 'clear', 'tree'] as const;

export type TerminalCommand = typeof TerminalCommands[number];

export const command = {
    cd,
    tree,
};

export { type Directory }
