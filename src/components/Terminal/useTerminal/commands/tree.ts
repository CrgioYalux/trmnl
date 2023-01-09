type Directory = Array<{
    name: string;
    isDirectory: boolean;
    parent: number | null;
    id: number;
}>


function tree(directory: Directory, parent: number | null) {
    const counts = { dirs: 0, files: 0 };
    const logs: string[] = [];

    function walk(directory: Directory, parent: number | null, prefix: string) {
        for (let i = 0; i < directory.length; i++) {
                if (directory[i].parent === parent) {
                    const children = directory.filter(c => c.parent === directory[i].parent);
                    const link = directory[i].id === children.pop()?.id ? ["└── ", "    "] : ["├── ", "│   "];
                    // const path = directory[i].name === '/' ? directory[i].name : prefix + link[0] + directory[i].name;
                    const path = prefix + link[0] + directory[i].name;
                    logs.push(path);
                    if (directory[i].isDirectory) {
                        counts.dirs += 1;
                        walk(directory, directory[i].id, `${prefix}${link[1]}`);
                    }
                    else {
                        counts.files += 1;
                    }
                }
        }
    }
    walk(directory, parent, '');

    return { counts, logs };
}

export {
    tree,
    type Directory
}
