import { goToPath, relativeDirectoryTree, sliceFromDirectoryTree } from "./utils";
import type { DirectoryTree, Directory, CommandReturn } from "./utils";

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

        const newDirectoryTree = sliceFromDirectoryTree(directoryTree, removeDirectoryTree);

        return {
            error: false,
            msgs: [''],
            out: newDirectoryTree, 
        };
    }

    return {
        error: true,
        msgs: [`rm: ${commandReturn.msgs}`],
    };
}
