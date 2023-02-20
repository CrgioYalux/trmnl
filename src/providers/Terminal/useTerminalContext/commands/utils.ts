type Directory = Array<{
    name: string;
    isDirectory: boolean;
    parent: number | null;
    id: number;
    path: string;
}>

const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch', 'clear', 'tree'] as const;
type TerminalCommand = typeof TerminalCommands[number];

type CommandReturn<T> = {
    error: boolean,
    msgs: string[],
    out?: T,
}

function runPath(directory: Directory, currentDirectory: Directory[number], path: string = ''): CommandReturn<Directory[number]> {
    const parts = path.split('/');

    let out: Directory[number] = currentDirectory;
    let pathNotFound: string = '';

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '.' || parts[i].length === 0) {
            continue;
        }

        let found = false;
        if (parts[i] === '..') {
            for (let j = 0; j < directory.length; j++) {
                if (out.parent === directory[j].id) {
                    found = true;
                    out = directory[j];
                    break;
                }
            }
        }
        else if (parts[i]) {
            for (let j = 0; j < directory.length; j++) {
                if (directory[j].name === parts[i]) {
                    if (
                        (directory[j].parent === out.id && directory[j].isDirectory) || directory[j].parent === null
                    ) {
                        found = true;
                        out = directory[j];
                        break;
                    }
                }
            }
        }

        if (!found) {
            pathNotFound = parts.map((p, j) => i === j ? `[${p}]` : p).join('/');
            break;
        }
    }

    if (pathNotFound.length !== 0) {
        return {
            error: true,
            msgs: [`${pathNotFound} : path does not exist`],
        };
    } 
    
    return {
        error: false,
        msgs: [],
        out
    }
}

export type {
    Directory,
    TerminalCommand,
    CommandReturn
}

export {
    TerminalCommands,
    runPath
}



