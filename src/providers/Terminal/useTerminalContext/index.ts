import { useState, useEffect, createContext } from 'react';
import { INITIAL_STATE } from './consts';
import { createPrompt, sliceFirstWord } from './helpers';
import { Directory, TerminalCommand, TerminalCommands } from './commands/utils';
import command from './commands';

export interface CommandReturn {
    msgs: readonly string[];
    error: boolean;
    logCount: number;
    input: { prompt: string; value: string; };
}

interface TerminalState {
    logs: CommandReturn[];
    prompt: string;
    directoryTree: Directory;
    currentDirectory: Directory[number];
}

export type TerminalContext = TerminalState & {
    interpretInput: (input: string) => CommandReturn;
}

interface Command {
    type: TerminalCommand;
    args: string[];
}

export const Context = createContext<TerminalContext>(INITIAL_STATE.terminalContext as TerminalContext);

export const useTerminalContext = (): TerminalContext => {
    const [prompt, setPrompt] = useState<string>(INITIAL_STATE.prompt);
    const [directoryTree, setDirectoryTree] = useState(INITIAL_STATE.directoryTree);
    const [currentDirectory, setCurrentDirectory] = useState<Directory[number]>(INITIAL_STATE.currentDirectory);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<CommandReturn[]>([]);

    useEffect(() => {
        setPrompt(createPrompt(currentDirectory.path));
    }, [currentDirectory]);

    const execCommand = ({ type, args }: Command): CommandReturn => {
        switch (type) {
            case 'cd':
                const cdReturn = command.cd(args, directoryTree, currentDirectory, setCurrentDirectory);
                return {
                    error: cdReturn.error,
                    msgs: [cdReturn.msgs[0]],
                    logCount,
                    input: { prompt, value: '' }
                };
            case 'pwd':
                return {
                    error: false,
                    msgs: [currentDirectory.path],
                    logCount,
                    input: { prompt, value: '' }
                };
            case 'clear':
                return {
                    error: false,
                    msgs: [],
                    logCount,
                    input: { prompt, value: '' }
                };
            case 'tree':
                const treeReturn = command.tree(args, directoryTree, currentDirectory);
                if (!treeReturn.error && treeReturn.out) {
                    return {
                        error: false,
                        msgs: [...treeReturn.out.logs, `files: ${treeReturn.out.counts.files} | dirs: ${treeReturn.out.counts.dirs}`],
                        logCount,
                        input: { prompt, value: '' }
                    }
                }
                return {
                    error: true,
                    msgs: treeReturn.msgs,
                    logCount,
                    input: { prompt, value: '' }
                }
            case 'neofetch':
            case 'help':
                return {
                    error: false,
                    msgs: TerminalCommands,
                    logCount,
                    input: { prompt, value: '' }
                };
            case 'ls':
                const lsReturn = command.ls(args, directoryTree, currentDirectory);
                return {
                    error: lsReturn.error,
                    msgs: lsReturn.msgs,
                    logCount,
                    input: { prompt, value: '' }
                };
            default:
                return {
                    error: true,
                    msgs: [`${type}: Unknown command`],
                    logCount,
                    input: { prompt, value: '' }
                };
        }
    }

    const saveLog = (deletePrevious: boolean, commandReturn: CommandReturn) => {
        if (deletePrevious) setLogs([]);
        else setLogs((prev) => [...prev, commandReturn]);
    };

    const interpretInput = (input: string): CommandReturn => {
        setLogCount((prev) => prev + 1);

        const { firstWord, rest } = sliceFirstWord(input);
        const args = rest === null ? [] : rest.split(' ');


        const command: Command = {
            type: firstWord as TerminalCommand,
            args,
        };

        let log = execCommand(command);
        log.input.value = input;
        saveLog(command.type === 'clear', log);
            
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
