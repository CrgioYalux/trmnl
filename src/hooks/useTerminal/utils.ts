import type { Command, CommandReturn, DirectoryTree, Directory } from "./commands/utils";

const createPrompt = (location: string, user: string = 'usr', symbol: string = '$'): string => `${user}:${location}${symbol}`;

function sliceFirstWord(sentence: string): { firstWord: string, rest: string | null } {
    const trimmed = sentence.trim();
    const firstSpaceIndex = trimmed.indexOf(' ');

    if (firstSpaceIndex !== -1)
        return {
            firstWord: trimmed.slice(0, firstSpaceIndex),
            rest: trimmed.slice(firstSpaceIndex).trim(),
        }

    return {
        firstWord: trimmed,
        rest: null,
    };
}

type TerminalInput = {
    idx: number,
    prompt: string,
    value: string,
}

type TerminalCommandReturn = CommandReturn<{ input: TerminalInput }>

type TerminalLogs = TerminalCommandReturn[];

type InternalTerminalState = {
    directoryTree: DirectoryTree,
    currentDirectory: Directory,
    logs: TerminalLogs,
    prompt: string,
    history: string[],
}

type ExternalTerminalState = {
    directoryTree: DirectoryTree,
    logs: TerminalLogs,
    prompt: string,
}

type TerminalActions = {
    interpretInput: (input: string) => void,
}

type TerminalReducerAction = {
    command: Command,
    payload: {
        value: string,
    }
}

export type { TerminalInput, TerminalLogs, InternalTerminalState, ExternalTerminalState, TerminalActions, TerminalReducerAction };
export { createPrompt, sliceFirstWord };
