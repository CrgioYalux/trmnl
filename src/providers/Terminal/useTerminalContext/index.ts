import { useState, useEffect, createContext } from 'react';

import { INITIAL_STATE } from './consts';
import { createPrompt, sliceFirstWord } from './helpers';
import command from './commands';
import { Directory, TerminalCommand, TerminalCommands, Command, CommandReturn } from './commands/utils';

type TerminalInput = {
    idx: number,
    prompt: string,
    value: string,
}

export type TerminalContextCommandReturn = CommandReturn<{
    input: TerminalInput
}>

interface TerminalState {
    logs: TerminalContextCommandReturn[];
    prompt: string;
    directoryTree: Directory;
    currentDirectory: Directory[number];
}

export type TerminalContext = TerminalState & {
    interpretInput: (input: string) => TerminalContextCommandReturn;
}

export const Context = createContext<TerminalContext>(INITIAL_STATE.terminalContext as TerminalContext);

export const useTerminalContext = (): TerminalContext => {
    const [prompt, setPrompt] = useState<string>(INITIAL_STATE.prompt);
    const [directoryTree, setDirectoryTree] = useState(INITIAL_STATE.directoryTree);
    const [currentDirectory, setCurrentDirectory] = useState<Directory[number]>(INITIAL_STATE.currentDirectory);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<TerminalContextCommandReturn[]>([]);
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        setPrompt(createPrompt(currentDirectory.path));
    }, [currentDirectory]);

    const execCommand = ({ type, args }: Command): TerminalContextCommandReturn => {
        switch (type) {
            case 'cd':
                const cdReturn = command.cd(args, directoryTree, currentDirectory, setCurrentDirectory);
                return {
                    error: cdReturn.error,
                    msgs: [cdReturn.msgs[0]],
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
            case 'pwd':
                return {
                    error: false,
                    msgs: [currentDirectory.path],
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
            case 'clear':
                return {
                    error: false,
                    msgs: [],
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
            case 'tree':
                const treeReturn = command.tree(args, directoryTree, currentDirectory);
                if (!treeReturn.error && treeReturn.out) {
                    return {
                        error: false,
                        msgs: [...treeReturn.out.logs, `files: ${treeReturn.out.counts.files} | dirs: ${treeReturn.out.counts.dirs}`],
                        out: {
                            input: { idx: logCount, prompt, value: '' }
                        }
                    }
                }
                return {
                    error: true,
                    msgs: treeReturn.msgs,
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                }
            case 'neofetch':
            case 'help':
                return {
                    error: false,
                    msgs: [...TerminalCommands],
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
            case 'ls':
                const lsReturn = command.ls(args, directoryTree, currentDirectory);
                return {
                    error: lsReturn.error,
                    msgs: lsReturn.msgs,
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
            case 'history':
                return {
                    error: false,
                    msgs: history,
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                }
            default:
                return {
                    error: true,
                    msgs: [`${type}: Unknown command`],
                    out: {
                        input: { idx: logCount, prompt, value: '' }
                    }
                };
        }
    }

    const saveToHistory = (terminalInput: string): void => {
        setHistory((prev) => [...prev, terminalInput]);
    }

    const saveLog = (deletePrevious: boolean, commandReturn: TerminalContextCommandReturn): void => {
        if (deletePrevious) setLogs([]);
        else setLogs((prev) => [...prev, commandReturn]);
    };

    const interpretInput = (input: string): TerminalContextCommandReturn => {
        setLogCount((prev) => prev + 1);

        const { firstWord, rest } = sliceFirstWord(input);
        const args = rest === null ? [] : rest.split(' ');

        const command: Command = {
            type: firstWord as TerminalCommand,
            args,
        };

        let log = execCommand(command);
        if (log.out) {
            log.out.input.value = input;
        }
        saveLog(command.type === 'clear', log);
        saveToHistory(`[${logCount}] ${input}`);
            
        return log;
    };

    const state: TerminalContext = {
        logs,
        prompt,
        interpretInput,
        directoryTree,
        currentDirectory,
    };

    return state;
};
