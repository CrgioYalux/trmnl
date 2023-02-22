import { DirectoryTree, Directory, CommandReturn, goToPath, relativeDirectoryTree } from "./utils";

function walk(
    directoryTree: DirectoryTree,
    currentDirectory: Directory,
    prefix: string,
    logs: string[],
    counts: { dirs: number, files: number }
) {
    for (let i = 0; i < directoryTree.length; i++) {
        if (directoryTree[i].parent === currentDirectory.id) {
            const children = directoryTree.filter((child) => child.parent === directoryTree[i].parent);

            const link = directoryTree[i].id === children.pop()?.id ? ["└── ", "    "] : ["├── ", "│   "];
            const log = prefix + link[0] + directoryTree[i].name;

            logs.push(log);

            if (directoryTree[i].isDirectory) {
                counts.dirs += 1;
                walk(directoryTree, directoryTree[i], `${prefix}${link[1]}`, logs, counts);
            }
            else {
                counts.files += 1;
            }
        }
    }
}

export default function tree(
    args: string[],
    directoryTree: DirectoryTree,
    currentDirectory: Directory
): CommandReturn<{ counts: { dirs: number, files: number }, logs: string[] }> {
    const path = args[0];
    const counts = { dirs: 0, files: 0 };
    const logs: string[] = [];

    if (!path) {
        logs.push(currentDirectory.name);
        walk(directoryTree, currentDirectory, '', logs, counts);

        return {
            error: false,
            msgs: [],
            out: { counts, logs },
        }
    }

    const commandReturn = goToPath(directoryTree, currentDirectory, path);

    if (commandReturn.out) {
        const printDirectoryTree = relativeDirectoryTree(directoryTree, commandReturn.out);

        logs.push(commandReturn.out.name);

        walk(printDirectoryTree, commandReturn.out, '', logs, counts);

        return {
            error: false,
            msgs: [''],
            out: { counts, logs },
        }
    }

    return {
        error: true,
        msgs: [`tree: ${commandReturn.msgs[0]}`],
    }
}
