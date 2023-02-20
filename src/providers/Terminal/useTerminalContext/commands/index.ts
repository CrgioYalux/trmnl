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
                if (directory[j].isDirectory && directory[j].name === parts[i] && out.id === directory[j].parent) {
                    found = true;
                    out = directory[j];
                    break;
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

/* cd */
function cd(
    args: string[],
    directory: Directory,
    currentDirectory: Directory[number],
    setter: React.Dispatch<React.SetStateAction<Directory[number]>>
): CommandReturn<Directory[number]> {
    const path = args[0];

    if (!path) {
        let root: Directory[number] | null = null;
    
        for (let i = 0; i < directory.length; i++) {
            if (directory[i].parent === null) {
                root = directory[i];
                break;
            }
        }

        if (root) setter(root);
        return { error: false, msgs: [] };
    }
    
    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {
        setter(commandReturn.out);
    }

    return commandReturn;
}

/* ls */
function ls(args: string[], directory: Directory, currentDirectory: Directory[number]): CommandReturn<Directory[number]> {
    const path = args[0];
    const names: string[] = [];

    if (!path) {
        for (let i = 0; i < directory.length; i++) {
            if (currentDirectory.id === directory[i].parent) {
                names.push(directory[i].name);
            }
        }

        return { error: false, msgs: names };
    }

    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {

        for (let i = 0; i < directory.length; i++) {
            if (commandReturn.out.id === directory[i].parent) {
                names.push(directory[i].name);
            }
        }

        return { error: false, msgs: names };
    }

    return commandReturn;
}

/* tree */
function tree(directory: Directory, parent: number | null) {
    const counts = { dirs: 0, files: 0 };
    const logs: string[] = [];

    function walk(directory: Directory, parent: number | null, prefix: string) {
        for (let i = 0; i < directory.length; i++) {
                if (directory[i].parent === parent) {
                    const children = directory.filter(c => c.parent === directory[i].parent);
                    const link = directory[i].id === children.pop()?.id ? ["└── ", "    "] : ["├── ", "│   "];
                    // const path = directory[i].name === '/' ? directory[i].name : prefix + link[0] + directory[i].name;
                    const path = prefix + link[0] + directory[i].name;
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

const command = { cd, ls, tree };

export {
    TerminalCommands,
    type TerminalCommand,
    type Directory,
    command,
}
