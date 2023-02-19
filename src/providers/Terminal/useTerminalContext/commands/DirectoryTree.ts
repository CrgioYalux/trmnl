type Directory = {
    id: number;
    name: string;
    path: string;
    parent: number | null;
    isDirectory: boolean;
}

type TreeNode<T> = {
    value: T,
    children?: TreeNode<T>[],
}

type DirectoryTree = TreeNode<string>;

export type {
    Directory,
    TreeNode,
    DirectoryTree
}

function printAfterNTabs(value: any, n: number) {
    if (n === 0) { 
        console.log(value);
        return;
    }

    const marginLeft: string = new Array(n).fill('\t').join('');
    console.log(`${marginLeft}${value}`);
}


function walk(dir: DirectoryTree, prefix: number = 0) {
    printAfterNTabs(dir.value, prefix);

    if (!dir.children || dir.children.length === 0) {
        return;
    }

    for (let i = 0; i < dir.children.length; i++) {
        walk(dir.children[i], prefix + 1);
    }
}

function tree(dir: DirectoryTree, depth: number) {
    walk(dir, 0);
}

const dir: DirectoryTree = {
    value: 'home',
    children: [
        {
            value: 'things',
            children: [
                {
                    value: 'a.txt',
                }
            ]
        },
        {
            value: 'stuff.pdf'
        },
        {
            value: 'super duper secret',
            children: [
                {
                    value: 'photos',
                    children: [
                        { value: '1.jpg' },
                        { value: '2.jpg' },
                        { value: '3.jpg' },
                        { value: '4.jpg' },
                        { value: '5.jpg' },
                    ]
                }
            ]
        }
    ]
};

export default function main() {
    tree(dir, 0);
}



