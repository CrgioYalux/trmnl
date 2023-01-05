import { useState } from 'react';
import { command } from './commands';
import { sliceFirstWord } from './utils';

const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch'] as const;

type TerminalCommand = typeof TerminalCommands[number];

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

    const execCommand = ({ type, args }: Command) => {
        // errors should be handled here, not in each command definition
        switch (type) {
            case 'cd':
                command.cd(args, setActiveLocation);
                return {
                    error: false,
                    msg: ``,
                    logCount
                }
            case 'help':
            case 'ls':
            case 'pwd':
            case 'neofetch':
            default:
                return {
                    error: false,
                    msg: `ran \`${type}\` command`,
                    logCount
                }
        }
    }

    const interpretInput = (input: string): CommandReturn => {
        setLogCount((prev) => prev + 1);

        const { firstWord, rest } = sliceFirstWord(input);
        const args = rest === null ? [] : rest.split(' ');

        if (TerminalCommands.find((c) => c === firstWord)) {
            const command: Command = {
                type: firstWord as TerminalCommand,
                args,
            };

            return execCommand(command);
        }

        return {
            error: true,
            msg: `\`${firstWord}\`: Unknown command`,
            logCount,
        }
    }

    const value = {
        activeLocation,
        busy,
        interpretInput
    };

    return value;
}
