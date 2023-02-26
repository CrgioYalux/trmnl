type Directory = {
    id: number,
    name: string,
    path: string,
    parent: number | null,
    isDirectory: boolean,
}

type DirectoryTree = Directory[];

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

function deleteAtAndFilter<T>(arr: T[], idx: number): T | undefined {
    if (idx >= arr.length || idx < 0) {
        return undefined;
    }

    if (idx === 0) {
        return arr.shift();
    }

    if (idx === arr.length - 1) {
        return arr.pop();
    }
    
    let found = false;
    let deleted: T | undefined = undefined;

    for (let i = 0; i < arr.length; i++) {
        if (found) {
            arr[i - 1] = arr[i];
        }
        if (i === idx) {
            if (arr[i + 1] !== undefined) {
                found = true;
                deleted = arr[i];
                arr[i] = null as T;
            }
            else {
                break;
            }
        }
    }

    arr.pop();

    return deleted;
}

function sliceFromDirectoryTree(directoryTree: DirectoryTree, slice: DirectoryTree): DirectoryTree {
    const out: DirectoryTree = [];

    for (let i = 0; i < directoryTree.length; i++) {
        let found: boolean = false;
        for (let j = 0; j < slice.length; j++) {
            if (directoryTree[i].id === slice[j].id) {
                found = true;
                break;
            }
        }
        if (!found) {
            out.push(directoryTree[i]);
        }
    }

    return out;
}

function goToPath(directoryTree: DirectoryTree, currentDirectory: Directory, path: string = ''): CommandReturn<Directory> {
    const parts = path.split('/');

    let out: Directory = currentDirectory;
    let pathNotFound: string = '';

    for (let i = 0; i < parts.length; i++) {
        if (parts[i] === '.' || parts[i].length === 0) {
            continue;
        }

        let found = false;
        if (parts[i] === '..') {
            for (let j = 0; j < directoryTree.length; j++) {
                if (out.parent === directoryTree[j].id) {
                    found = true;
                    out = directoryTree[j];
                    break;
                }
            }
        }
        else if (parts[i]) {
            for (let j = 0; j < directoryTree.length; j++) {
                if (directoryTree[j].name === parts[i]) {
                    if (
                         directoryTree[j].parent === null ||
                         directoryTree[j].parent === out.id && directoryTree[j].isDirectory ||
                         directoryTree[j].parent === out.id && i === parts.length - 1 && !directoryTree[j].isDirectory
                    ) {
                        found = true;
                        out = directoryTree[j];
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

function relativeDirectoryTreeWalk(directoryTree: DirectoryTree, currentDirectory: Directory, visited: DirectoryTree): void {
    if (!visited.find((v) => v.id === currentDirectory.id)) {
        visited.push(currentDirectory);
    }

    if (!currentDirectory.isDirectory) {
        return;
    }

    for (let i = 0; i < directoryTree.length; i++) {
        if (currentDirectory.id === directoryTree[i].parent) {
            relativeDirectoryTreeWalk(directoryTree, directoryTree[i], visited);
        }
    }
}

function relativeDirectoryTree(directoryTree: DirectoryTree, currentDirectory: Directory): DirectoryTree {
    const visited: DirectoryTree = [];

    relativeDirectoryTreeWalk(directoryTree, currentDirectory, visited);

    return visited;
}

export type {
    DirectoryTree,
    Directory,
    TerminalCommand,
    Command,
    CommandReturn
}

export {
    TerminalCommands,
    sliceFromDirectoryTree,
    goToPath,
    relativeDirectoryTree
}
