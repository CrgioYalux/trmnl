import { useState } from 'react';
import { command, TerminalCommand, TerminalCommands } from './commands';
import { sliceFirstWord } from './utils';

interface Command {
    type: TerminalCommand;
    args: string[];
}

export interface CommandReturn {
    error: boolean;
    msg: string | string[];
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

type Directory = Array<{
    name: string;
    isDirectory: boolean;
    parent: number | null;
    id: number;
}>

const DefaultDirectoryTree: Directory = [
    {
        id: 0,
        name: '/',
        isDirectory: true,
        parent: null,
    },
    {
        id: 1,
        name: '/documents',
        isDirectory: true,
        parent: 0,
    },
    {
        id: 2,
        name: '/documents/to_know',
        isDirectory: true,
        parent: 1,
    },
    {
        id: 3,
        name: '/documents/to_know/1.txt',
        isDirectory: false,
        parent: 2,
    },
    {
        id: 4,
        name: '/documents/to_know/2.txt',
        isDirectory: false,
        parent: 2,
    },
    {
        id: 5,
        name: '/stuff',
        isDirectory: true,
        parent: 0,
    },
];

function printTree(directory: Directory, parent: number | null) {
    const counts = { dirs: 0, files: 0 };
    const logs: string[] = [];

    function walk(directory: Directory, parent: number | null, prefix: string) {
        for (let i = 0; i < directory.length; i++) {
                if (directory[i].parent === parent) {
                    const children = directory.filter(c => c.parent === directory[i].parent);
                    const link = directory[i].id === children.pop()?.id ? ["└── ", "    "] : ["├── ", "│   "];
                    const path = directory[i].name === '/' ? directory[i].name : prefix + link[0] + directory[i].name;
                    logs.push(path);
                    if (directory[i].isDirectory) {
                        counts.dirs += 1;
                        walk(directory, directory[i].id, `${prefix}${link[1]}`);
                    }
                    else {
                        counts.files += 1;
                    }
                }
        }
    }
    walk(directory, parent, '');

    return { counts, logs };
}

export function useTerminal(): useTerminalState {
    const [activeLocation, setActiveLocation] = useState<string>(INITIAL_STATE.activeLocation);
    const [busy, setBusy] = useState<boolean>(false);
    const [logCount, setLogCount] = useState<number>(0);
    const [logs, setLogs] = useState<CommandReturn[]>([]);
    const [directoryTree, setDirectoryTree] = useState(DefaultDirectoryTree);

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
            case 'tree':
                const { counts, logs } = printTree(directoryTree, null);
                console.log(counts);
                return {
                    error: false,
                    msg: [...logs, `files:${counts.files} | dirs:${counts.dirs}`],
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
