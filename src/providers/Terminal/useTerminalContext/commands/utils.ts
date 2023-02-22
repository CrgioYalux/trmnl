type Directory = Array<{
    id: number,
    name: string,
    path: string,
    parent: number | null,
    isDirectory: boolean,
}>

const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch', 'clear', 'tree', 'history', 'mkdir', 'rm'] as const;
type TerminalCommand = typeof TerminalCommands[number];

type Command = {
    type: TerminalCommand,
    args: string[],
}

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
                         directory[j].parent === null ||
                         directory[j].parent === out.id && directory[j].isDirectory ||
                         directory[j].parent === out.id && i === parts.length - 1 && !directory[j].isDirectory
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
            msgs: [`${pathNotFound} : Path does not exist`],
        };
    } 
    
    return {
        error: false,
        msgs: [],
        out
    }
}

function relativeDirectoryTreeWalk(directory: Directory, currentDirectory: Directory[number], visited: Directory): void {
    if (!visited.find((v) => v.id === currentDirectory.id)) {
        visited.push(currentDirectory);
    }

    if (!currentDirectory.isDirectory) {
        return;
    }

    for (let i = 0; i < directory.length; i++) {
        if (currentDirectory.id === directory[i].parent) {
            relativeDirectoryTreeWalk(directory, directory[i], visited);
        }
    }
}

function relativeDirectoryTree(directory: Directory, currentDirectory: Directory[number]): Directory {
    const visited: Directory = [];

    relativeDirectoryTreeWalk(directory, currentDirectory, visited);

    return visited;
}

export type {
    Directory,
    TerminalCommand,
    Command,
    CommandReturn
}

export {
    TerminalCommands,
    runPath,
    relativeDirectoryTree
}
