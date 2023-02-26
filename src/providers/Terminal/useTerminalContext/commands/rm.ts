import { goToPath, relativeDirectoryTree } from "./utils";
import type { DirectoryTree, Directory, CommandReturn } from "./utils";

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

export default function rm(args: string[], directoryTree: DirectoryTree, currentDirectory: Directory): CommandReturn<DirectoryTree> {
    const path = args[0];

    if (!path) {
        return {
            error: true,
            msgs: ['rm: missing operand']
        };
    }

    const commandReturn = goToPath(directoryTree, currentDirectory, path);

    if (commandReturn.out) {
        if (commandReturn.out.id === currentDirectory.id) {
            return {
                error: true,
                msgs: ["rm: cannot remove: Directory in use"],
            };
        }

        const removeDirectoryTree = relativeDirectoryTree(directoryTree, commandReturn.out);

        if (removeDirectoryTree.find((dir) => dir.parent === null)) { // trying to delete the whole directory tree (which is bad)
            return {
                error: true,
                msgs: ["rm: cannot remove: Root directory"],
                out: directoryTree
            }
        }

        for (let i = 0; i < removeDirectoryTree.length; i++) {
            for (let j = 0; j < directoryTree.length; j++) {
                if (removeDirectoryTree[i].id === directoryTree[j].id) {
                    deleteAtAndFilter(directoryTree, j);
                    break;
                }
            }
        }

        return {
            error: false,
            msgs: [''],
            out: directoryTree
        };
    }

    return {
        error: true,
        msgs: [`rm: ${commandReturn.msgs}`],
    };
}
