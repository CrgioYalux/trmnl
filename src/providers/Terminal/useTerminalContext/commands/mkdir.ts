import { DirectoryTree, Directory, CommandReturn, goToPath } from './utils';
import { INITIAL_STATE } from '../consts';

export default function mkdir(args: string[], directoryTree: DirectoryTree, currentDirectory: Directory): CommandReturn<Directory> {
    const path = args[0]?.split('/').filter((p) => p !== '').join('/');

    if (!path) {
        return {
            error: true,
            msgs: ['mkdir: missing operand']
        };
    }

    const parts = path.split('/');
    const newDirectoryName = parts[parts.length - 1];
    const pathToParentDirectory = parts.slice(0, parts.length - 1).join('/');
    
    const commandReturn = goToPath(directoryTree, currentDirectory, pathToParentDirectory);

    let dirAlreadyExists = false;
    let maxIdFound: number = -1;

    if (commandReturn.out) {
        if (newDirectoryName === INITIAL_STATE.currentDirectory.name) {
            dirAlreadyExists = true;
        }

        for (let i = 0; i < directoryTree.length && !dirAlreadyExists; i++) {
            if (
                directoryTree[i].isDirectory &&
                directoryTree[i].name === newDirectoryName &&
                directoryTree[i].parent === commandReturn.out.id
            ) {
                dirAlreadyExists = true;
            }
            if (directoryTree[i].id > maxIdFound) {
                maxIdFound = directoryTree[i].id;
            }
        }

        if (dirAlreadyExists) {
            return {
                error: true,
                msgs: [`mkdir: cannot create directoryTree '${path}': Already exists`]
            };
        }

        let newDirectoryPath: string = '';

        if (pathToParentDirectory.length === 0) {
            newDirectoryPath = `/${newDirectoryName}`;
        }
        else {
            newDirectoryPath = `/${pathToParentDirectory}/${newDirectoryName}`;
        }

        const newDirectory: Directory = {
            parent: commandReturn.out.id,
            id: maxIdFound + 1,
            name: newDirectoryName,
            path: newDirectoryPath, // if pathUntilParent === '' => //newDirectoryName
            isDirectory: true
        };

        return {
            error: false,
            msgs: [''],
            out: newDirectory
        }
    }

    return {
        error: true,
        msgs: [`mkdir: ${commandReturn.msgs[0]}`],
    };
}
