import { useState } from 'react';
import { command } from './commands';
import { sliceFirstWord } from './utils';

enum TerminalCommand {
    help = 'help',
    cd = 'cd',
    ls = 'ls',
    pwd = 'pwd',
    neofetch = 'neofetch'
}
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
            case TerminalCommand.cd:
                command.cd(args, setActiveLocation);
                return {
                    error: false,
                    msg: ``,
                    logCount
                }
            case TerminalCommand.ls:
            case TerminalCommand.pwd:
            case TerminalCommand.help:
            case TerminalCommand.neofetch:
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

        if (Object.values(TerminalCommand).find((v) => firstWord === v)) {
            const command: Command = {
                type: firstWord as TerminalCommand,
                args
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
