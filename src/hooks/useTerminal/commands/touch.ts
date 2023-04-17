import { goToPath } from "./utils";
import type { DirectoryTree, Directory, CommandReturn } from "./utils";

export default function touch(
    args: string[],
    directoryTree: DirectoryTree,
    currentDirectory: Directory,
): CommandReturn<Directory> {
    const path = args[0];

    if (!path) return {
        msgs: ['touch: Path not passed'],
        error: true,
    };
    
    const pathParts = path.split('/');
    const pathToParentDirectory = pathParts.slice(0, pathParts.length - 1).join('/');
    const commandReturn = goToPath(directoryTree, currentDirectory, pathToParentDirectory);

    if (!commandReturn.out) return {
        msgs: commandReturn.msgs,
        error: true,
    };

    const newFileName = pathParts.slice(pathParts.length - 1).join('');
    let newFilePath = '';

    if (pathToParentDirectory.length === 0) {
        newFilePath = `/${newFileName}`;
    }
    else {
        newFilePath = `/${pathToParentDirectory}/${newFileName}`;
    }

    let maxIdFound = 0;
    let alreadyExists = false;

    for (let i = 0; i < directoryTree.length; i++) {
        if (directoryTree[i].id > maxIdFound) {
            maxIdFound = directoryTree[i].id;
        }
        if (directoryTree[i].name === newFileName &&
            directoryTree[i].path === newFilePath) {
            alreadyExists = true;
        }
    }

    if (alreadyExists) return {
        msgs: [],
        error: false,
    };

    const newFile: Directory = {
        parent: commandReturn.out.id,
        id: maxIdFound + 1,
        name: newFileName,
        path: newFilePath,
        isDirectory: false,
    };

    return {
        msgs: [],
        error: false,
        out: newFile,
    };
}
