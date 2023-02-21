import { Directory, CommandReturn, runPath } from './utils';

export default function mkdir(args: string[], directory: Directory, currentDirectory: Directory[number]): CommandReturn<Directory[number]> {
    const path = args[0];

    if (!path) {
        return {
            error: true,
            msgs: ['mkdir: missing operand']
        };
    }

    const parts = path.split('/').filter((p) => p !== ''); // /documents/to_know/ => [documents, to_know]

    // must check if the parent of the new directory exists, and if it does not have already a child with the same name passed here
    const newDirName = parts[parts.length - 1];
    const pathUntilParent = parts.slice(0, parts.length - 1).join('/');
    
    const returnCommand = runPath(directory, currentDirectory, pathUntilParent);
    let dirAlreadyExists = false;
    let maxIdFound: number = -1;

    if (returnCommand.out) {
        for (let i = 0; i < directory.length; i++) {
            if (directory[i].parent === returnCommand.out.id && directory[i].name === newDirName) {
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

        if (pathUntilParent.length === 0) {
            newDirPath = `/${newDirName}`;
        }
        else {
            newDirPath = `/${pathUntilParent}/${newDirName}`;
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
        error: returnCommand.error,
        msgs: returnCommand.msgs,
    };
}
