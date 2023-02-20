import { Directory, CommandReturn, runPath } from "./utils";

export default function cd(
    args: string[],
    directory: Directory,
    currentDirectory: Directory[number],
    setter: React.Dispatch<React.SetStateAction<Directory[number]>>
): CommandReturn<Directory[number]> {
    const path = args[0];

    if (!path) {
        let root: Directory[number] | null = null;
    
        for (let i = 0; i < directory.length; i++) {
            if (directory[i].parent === null) {
                root = directory[i];
                break;
            }
        }

        if (root) setter(root);
        return { error: false, msgs: [] };
    }
    
    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {
        setter(commandReturn.out);
    }

    return commandReturn;
}
