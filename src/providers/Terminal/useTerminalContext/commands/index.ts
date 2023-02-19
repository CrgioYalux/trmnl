type Directory = Array<{
    name: string;
    isDirectory: boolean;
    parent: number | null;
    id: number;
    path: string;
}>

const TerminalCommands = ['help', 'cd', 'ls', 'pwd', 'neofetch', 'clear', 'tree'] as const;
type TerminalCommand = typeof TerminalCommands[number];

// function getAutoCompletion(curr) {
// }

/* cd */
function cd(
    args: string[],
    directory: Directory,
    currentDirectory: Directory[number],
    setter: React.Dispatch<React.SetStateAction<Directory[number]>>
) {
    const path = args[0];

    


    // if no path provided go to root directory
    if (!path) {
        const root = directory.find(({ parent }) => parent === null);
        if (root) setter(root);
        return { error: false, msg: '' }
    }

    // idea: 
    // treat every character in the path like a command, e.g. '/', '..', 'some_path'
    // then just start applying those commands on the currentDirectory 
    //
    // for now, cd lacks going backwards multiple times, e.g. `cd ../../..`
    // and also any combination of going backwards and entering some directory, e.g. `cd ../stuff`

    // if passed '..' as path go to the currentDirectory's parent directory
    if (path === '..') {
        const parent = directory.find(({ id }) => id === currentDirectory.parent);
        if (parent !== undefined) setter(parent);
        return { error: false, msg: '' } // either if there's a parent or not, there's no error
    }

    // if passed an absolute path
    if (path[0] === '/') { 
        const foundAbsolutePath = directory.find(({ name }) => name === path);
        if (foundAbsolutePath !== undefined) {
            if (foundAbsolutePath.isDirectory) {
                setter(foundAbsolutePath);
                return { error: false, msg: '' }
            }
            return {
                error: true, 
                msg: `cd: '${path}' is not a directory`
            }
        }
    }

    // if passed a relative path (looking for a child of currentDirectory)
    const children = directory.filter(({ parent }) => parent === currentDirectory.id);
    if (children.length !== 0) {
        const re = new RegExp(path, 'g');
        const foundRelativePath = children.find(({ name }) => name.match(re));
        if (foundRelativePath !== undefined) {
            if (foundRelativePath.isDirectory) {
                setter(foundRelativePath);
                return { error: false, msg: '' }
            }
            return {
                error: true,
                msg: `cd: '${path}' is not a directory`
            }
        }
    }

    const slicedPath = path.split('/').filter(p => p !== '/'); // documents/to_know/ => [documents, to_know]
    let lastChild: Directory[number] | null = null;

    for (let x = 0; x < slicedPath.length; x++) {
        const parentPath = slicedPath[x];
        const childPath = slicedPath[x + 1];

        const parent = directory.find(({ name, parent }) => name === parentPath && (x === 0 ? parent === currentDirectory.id : true));
        if (parent !== undefined) {
            const child = directory.find((d) => d.name === childPath && d.parent === parent.id);
            if (child !== undefined) {
                if (x === slicedPath.length - 2) {
                    lastChild = child;
                    break;
                }
                const childChildren = directory.filter(({ parent, isDirectory }) => parent === child.id && isDirectory);
                if (childChildren.length === 0) break;
            } else break;
        } else break;
    }

    if (lastChild !== null) {
        setter(lastChild);
        return {
            error: false,
            msg: ''
        }
    }

    return {
        error: true,
        msg: `cd: The directory '${path}' does not exist`
    }
}

/* ls */
function ls(args: string[], directory: Directory, currentDirectory: Directory[number]) {
    const path = args[0];
    if (!path) {
        const directoryContents = directory.filter(({ parent }) => parent === currentDirectory.id);
        const contentNames = directoryContents.map(({ name }) => name);

        return { error: false, msg: contentNames };
    }

    return { error: false, msg: '' };
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
