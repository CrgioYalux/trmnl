import { useState, useEffect, createContext } from 'react';
import { INITIAL_STATE } from './consts';
import { Directory, TerminalCommand, TerminalCommands } from './commands';
import { createPrompt, sliceFirstWord } from './helpers';
import { command } from './commands';

interface CommandReturn {
    input: { prompt: string; value: string; };
    error: boolean;
    msg: string | string[];
    logCount: number;
}

interface TerminalState {
    logs: CommandReturn[];
    isBusy: boolean;
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

export const Context = createContext<TerminalContext>(INITIAL_STATE.terminalContext);

export const useTerminalContext = (): TerminalContext => {
    const [prompt, setPrompt] = useState<string>(INITIAL_STATE.prompt);
    const [directoryTree, setDirectoryTree] = useState(INITIAL_STATE.directoryTree);
    const [currentDirectory, setCurrentDirectory] = useState<Directory[number]>(INITIAL_STATE.currentDirectory);
    const [isBusy, setIsBusy] = useState<boolean>(false);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<CommandReturn[]>([]);

    useEffect(() => {
        setPrompt(createPrompt(currentDirectory.path));
    }, [currentDirectory]);

    const execCommand = ({ type, args }: Command) => {
        switch (type) {
            case 'cd':
                const cdReturn = command.cd(args, directoryTree, currentDirectory, setCurrentDirectory);
                return {
                    error: cdReturn.error,
                    msg: cdReturn.msg,
                    logCount
                };
            case 'pwd':
                return {
                    error: false,
                    msg: currentDirectory.path,
                    logCount
                };
            case 'clear':
                return {
                    error: false,
                    msg: ``,
                    logCount
                };
            case 'tree':
                const treeReturn = command.tree(directoryTree, null);
                return {
                    error: false,
                    msg: [...treeReturn.logs, `files: ${treeReturn.counts.files} | dirs: ${treeReturn.counts.dirs}`],
                    logCount
                }
            case 'neofetch':
            case 'help':
                return {
                    error: false,
                    msg: TerminalCommands.join(' '),
                    logCount
                };
            case 'ls':
                const lsReturn = command.ls(args, directoryTree, currentDirectory);
                return {
                    error: lsReturn.error,
                    msg: lsReturn.msg,
                    logCount
                };
            default:
                return {
                    error: false,
                    msg: `ran \`${type}\` command`,
                    logCount
                };
        }
    }

    const saveLog = (deletePrevious: boolean, commandReturn: CommandReturn) => {
        if (deletePrevious) setLogs([commandReturn]);
        else setLogs((prev) => [...prev, commandReturn]);
    };

    const interpretInput = (input: string): CommandReturn => {
        setLogCount((prev) => prev + 1);

        const { firstWord, rest } = sliceFirstWord(input);
        const args = rest === null ? [] : rest.split(' ');
        let log = null;
        let deletePrevious = false;

        if (TerminalCommands.find((c) => c === firstWord)) {
            const command: Command = {
                type: firstWord as TerminalCommand,
                args,
            };
            log = execCommand(command) as CommandReturn;
            
            deletePrevious = command.type === 'clear' ? true : false;
        } else {
            log = {
                error: true,
                msg: input.length > 0 ? `\`${firstWord}\`: Unknown command` : '',
                logCount,
            } as CommandReturn;
        }

        log.input = { prompt, value: input };

        saveLog(deletePrevious, log);
            
        return log;
    };

    const state: TerminalContext = {
        isBusy,
        logs,
        prompt,
        interpretInput,
        directoryTree,
        currentDirectory,
    };

    return state;
};
