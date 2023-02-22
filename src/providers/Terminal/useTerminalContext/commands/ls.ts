import { DirectoryTree, Directory, goToPath, CommandReturn } from "./utils";

export default function ls(args: string[], directoryTree: DirectoryTree, currentDirectory: Directory): CommandReturn<Directory> {
    const path = args[0];
    const names: string[] = [];

    if (!path) {
        for (let i = 0; i < directoryTree.length; i++) {
            if (currentDirectory.id === directoryTree[i].parent) {
                names.push(directoryTree[i].name);
            }
        }

        return {
            error: false,
            msgs: names
        };
    }

    const commandReturn = goToPath(directoryTree, currentDirectory, path);

    if (commandReturn.out) {
        for (let i = 0; i < directoryTree.length; i++) {
            if (commandReturn.out.id === directoryTree[i].parent) {
                names.push(directoryTree[i].name);
            }
        }

        return {
            error: false,
            msgs: names
        };
    }

    return {
        error: true,
        msgs: [`ls: ${commandReturn.msgs[0]}`],
    };
}
