import { useState } from 'react';
import { command, TerminalCommand, TerminalCommands } from './commands';
import { sliceFirstWord } from './utils';

interface Command {
    type: TerminalCommand;
    args: string[];
}

export interface CommandReturn {
    error: boolean;
    msg: string;
    logCount: number;
}

interface TerminalState {
    activeLocation: string;
    busy: boolean;
    logs: CommandReturn[];
}

type useTerminalState = TerminalState & {
    interpretInput: (input: string) => CommandReturn;
}

const INITIAL_STATE = {
    activeLocation: '~'
};

export function useTerminal(): useTerminalState {
    const [activeLocation, setActiveLocation] = useState<string>(INITIAL_STATE.activeLocation);
    const [busy, setBusy] = useState<boolean>(false);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<CommandReturn[]>([]);

    const execCommand = ({ type, args }: Command) => {
        switch (type) {
            case 'cd':
                command.cd(args, setActiveLocation);
                return {
                    error: false,
                    msg: ``,
                    logCount
                };
            case 'pwd':
                return {
                    error: false,
                    msg: activeLocation,
                    logCount
                };
            case 'clear':
                return {
                    error: false,
                    msg: ``,
                    logCount
                };
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
            }
        }
    
        saveLog(deletePrevious, log);
            
        return log;
    }

    const value = {
        activeLocation,
        busy,
        interpretInput,
        logs,
    };

    return value;
}
