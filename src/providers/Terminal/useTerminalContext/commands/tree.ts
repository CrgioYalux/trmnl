import { Directory, CommandReturn, runPath, relativeDirectoryTree } from "./utils";

function walk(
    directory: Directory,
    currentDirectory: Directory[number],
    prefix: string,
    logs: string[],
    counts: { dirs: number, files: number }
) {
    for (let i = 0; i < directory.length; i++) {
        if (directory[i].parent === currentDirectory.id) {
            const children = directory.filter((child) => child.parent === directory[i].parent);

            const link = directory[i].id === children.pop()?.id ? ["└── ", "    "] : ["├── ", "│   "];
            const log = prefix + link[0] + directory[i].name;

            logs.push(log);

            if (directory[i].isDirectory) {
                counts.dirs += 1;
                walk(directory, directory[i], `${prefix}${link[1]}`, logs, counts);
            }
            else {
                counts.files += 1;
            }
        }
    }
}

export default function tree(
    args: string[],
    directory: Directory,
    currentDirectory: Directory[number]
): CommandReturn<{ counts: { dirs: number, files: number }, logs: string[] }> {
    const path = args[0];
    const counts = { dirs: 0, files: 0 };
    const logs: string[] = [];

    if (!path) {
        logs.push(currentDirectory.name);
        walk(directory, currentDirectory, '', logs, counts);

        return {
            error: false,
            msgs: [],
            out: { counts, logs },
        }
    }

    const commandReturn = runPath(directory, currentDirectory, path);

    if (commandReturn.out) {
        const relativeDirectory = relativeDirectoryTree(directory, commandReturn.out);

        logs.push(commandReturn.out.name);

        walk(relativeDirectory, commandReturn.out, '', logs, counts);
    }

    return {
        error: true,
        msgs: [`tree: ${commandReturn.msgs}`],
    }
}
