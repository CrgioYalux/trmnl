import { Directory, CommandReturn, runPath, relativeDirectoryTree } from "./utils";

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

export default function rm(args: string[], directory: Directory, currentDirectory: Directory[number]): CommandReturn<Directory> {
    const path = args[0];

    if (!path) {
        return {
            error: true,
            msgs: ['rm: missing operand']
        };
    }

    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {
        if (commandReturn.out.id === currentDirectory.id) {
            return {
                error: true,
                msgs: ["rm: cannot remove: Directory in use"],
            };
        }

        const relativeDirectory = relativeDirectoryTree(directory, commandReturn.out);

        if (relativeDirectory.find((dir) => dir.parent === null)) { // trying to delete the whole directory tree (which is bad)
            return {
                error: true,
                msgs: ["rm: cannot remove: Root directory"],
                out: directory
            }
        }

        for (let i = 0; i < relativeDirectory.length; i++) {
            for (let j = 0; j < directory.length; j++) {
                if (relativeDirectory[i].id === directory[j].id) {
                    deleteAtAndFilter(directory, j);
                    break;
                }
            }
        }

        return {
            error: false,
            msgs: [''],
            out: directory
        };
    }

    return {
        error: true,
        msgs: [`rm: ${commandReturn.msgs}`],
    };
}
