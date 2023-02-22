import { Directory, CommandReturn, runPath } from './utils';
import { INITIAL_STATE } from '../consts';

export default function mkdir(args: string[], directory: Directory, currentDirectory: Directory[number]): CommandReturn<Directory[number]> {
    const path = args[0]?.split('/').filter((p) => p !== '').join('/');

    if (!path) {
        return {
            error: true,
            msgs: ['mkdir: missing operand']
        };
    }

    const parts = path.split('/');
    const newDirName = parts[parts.length - 1];
    const pathToParent = parts.slice(0, parts.length - 1).join('/');
    
    const returnCommand = runPath(directory, currentDirectory, pathToParent);

    let dirAlreadyExists = false;
    let maxIdFound: number = -1;

    if (returnCommand.out) {
        if (newDirName === INITIAL_STATE.currentDirectory.name) {
            dirAlreadyExists = true;
        }

        for (let i = 0; i < directory.length && !dirAlreadyExists; i++) {
            if (
                directory[i].isDirectory &&
                directory[i].name === newDirName &&
                directory[i].parent === returnCommand.out.id
            ) {
                dirAlreadyExists = true;
            }
            if (directory[i].id > maxIdFound) {
                maxIdFound = directory[i].id;
            }
        }

        if (dirAlreadyExists) {
            return {
                error: true,
                msgs: [`mkdir: cannot create directory '${path}': Already exists`]
            };
        }

        let newDirPath: string = '';

        if (pathToParent.length === 0) {
            newDirPath = `/${newDirName}`;
        }
        else {
            newDirPath = `/${pathToParent}/${newDirName}`;
        }

        const newDirectory: Directory[number] = {
            parent: returnCommand.out.id,
            id: maxIdFound + 1,
            name: newDirName,
            path: newDirPath, // if pathUntilParent === '' => //newDirName
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
        msgs: [`mkdir: ${returnCommand.msgs[0]}`],
    };
}
