import { Directory, runPath, CommandReturn } from "./utils";

export default function ls(args: string[], directory: Directory, currentDirectory: Directory[number]): CommandReturn<Directory[number]> {
    const path = args[0];
    const names: string[] = [];

    if (!path) {
        for (let i = 0; i < directory.length; i++) {
            if (currentDirectory.id === directory[i].parent) {
                names.push(directory[i].name);
            }
        }

        return {
            error: false,
            msgs: names
        };
    }

    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {
        for (let i = 0; i < directory.length; i++) {
            if (commandReturn.out.id === directory[i].parent) {
                names.push(directory[i].name);
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
