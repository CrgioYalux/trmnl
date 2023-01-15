import { useState, useEffect } from 'react';

import { sliceFirstWord, createPrompt } from './utils';
import { command, TerminalCommand, TerminalCommands, Directory } from './commands';

import { INITIAL_STATE } from './consts';

interface Command {
    type: TerminalCommand;
    args: string[];
}

export interface CommandReturn {
    input: { prompt: string; value: string; };
    error: boolean;
    msg: string | string[];
    logCount: number;
}

interface TerminalState {
    activeLocation: string;
    busy: boolean;
    logs: CommandReturn[];
    prompt: string;
}

type useTerminalState = TerminalState & {
    interpretInput: (input: string) => CommandReturn;
}

export function useTerminal(): useTerminalState {
    const [activeLocation, setActiveLocation] = useState<Directory[number]>(INITIAL_STATE.activeLocation);
    const [directoryTree, setDirectoryTree] = useState(INITIAL_STATE.defaultDirectoryTree);
    const [busy, setBusy] = useState<boolean>(false);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<CommandReturn[]>([]);
    const [prompt, setPrompt] = useState<string>(() => createPrompt(activeLocation.name));

    useEffect(() => {
        setPrompt(createPrompt(activeLocation.path));
    }, [activeLocation]);

    const execCommand = ({ type, args }: Command) => {
        switch (type) {
            case 'cd':
                const { error, msg } = command.cd(args, directoryTree, activeLocation, setActiveLocation);
                return {
                    error,
                    msg,
                    logCount
                };
            case 'pwd':
                return {
                    error: false,
                    msg: activeLocation.path,
                    logCount
                };
            case 'clear':
                return {
                    error: false,
                    msg: ``,
                    logCount
                };
            case 'tree':
                const { counts, logs } = command.tree(directoryTree, null);
                return {
                    error: false,
                    msg: [...logs, `files: ${counts.files} | dirs: ${counts.dirs}`],
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
        else setLogs(prev => [...prev, commandReturn]);
    };

    const interpretInput = (input: string): CommandReturn => {
        setLogCount((prev) => prev + 1);

        const { firstWord, rest } = sliceFirstWord(input); const args = rest === null ? [] : rest.split(' ');
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
    }

    const value = {
        activeLocation,
        busy,
        logs,
        prompt,
        interpretInput,
    };

    return value;
}
