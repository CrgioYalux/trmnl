import { DirectoryTree, Directory, CommandReturn, goToPath } from "./utils";

export default function cd(
    args: string[],
    directoryTree: DirectoryTree,
    currentDirectory: Directory,
): CommandReturn<Directory> {
    const path = args[0];

    if (!path) {
        let root: Directory | null = null;
    
        for (let i = 0; i < directoryTree.length; i++) {
            if (directoryTree[i].parent === null) {
                root = directoryTree[i];
                break;
            }
        }

        if (root) {
            return { 
                error: false,
                msgs: [],
                out: root
            };
        }
    }
    
    const commandReturn = goToPath(directoryTree, currentDirectory, path);

    if (commandReturn.out) {
        return {
            error: false,
            msgs: [''],
            out: commandReturn.out,
        }
    }

    return {
        error: true,
        msgs: [`cd: ${commandReturn.msgs[0]}`]
    };
}
