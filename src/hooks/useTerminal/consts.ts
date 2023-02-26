import { createPrompt } from './utils';
import type { DirectoryTree, Directory } from './commands/utils';

const root: Directory = {
    id: 0,
    name: '~',
    isDirectory: true,
    parent: null,
    path: '/'
};

const directoryTree: DirectoryTree = [
    root,
    {
        id: 1,
        name: 'documents',
        isDirectory: true,
        parent: 0,
        path: '/documents'
    },
    {
        id: 2,
        name: 'to_know',
        isDirectory: true,
        parent: 1,
        path: '/documents/to_know'
    },
    {
        id: 3,
        name: '1.txt',
        isDirectory: false,
        parent: 2,
        path: '/documents/to_know/1.txt'
    },
    {
        id: 4,
        name: '2.txt',
        isDirectory: false,
        parent: 2,
        path: '/documents/to_know/2.txt'
    },
    {
        id: 5,
        name: 'stuff',
        isDirectory: true,
        parent: 0,
        path: '/stuff'
    },
    {
        id: 6,
        name: 'about',
        isDirectory: true,
        parent: 2,
        path: '/documents/to_know/about'
    },
];

const prompt: string = createPrompt(root.path);

const neofetchText: string[] = [
"A terminal (not actually) in the browser",
"Made with React (what a surprise, am i right?)",
"> Project's Repository: github.com/CrgioYalux/trmnl",
"> My Github, where you would find more cool projects",
"  like this (If I had them): github.com/CrgioYalux",
];

const neofetch = [
"                ###            ###                ", // 0
"             ##     ##      ##     ##             ", // 1
"            ##       ##    ##       ##            ", // 2
"            ##         ####         ##            ", // 3
"            ##          ##          ##            ", // 4
"             ##       ##  ##       ##             ", // 5
`         ##### ###### ###### ###### #####         ${neofetchText[0]}`, // 6
`      ##       ##   ##      ##   ##       ##      ${neofetchText[1]}`, // 7
"    ##          ## ##        ## ##          ##    ", // 8  
"   ##            ###   ####   ###            ##   ", // 9
`   ##            ###   ####   ###            ##   ${neofetchText[2]}`, // 10    
`    ##          ## ##        ## ##          ##    ${neofetchText[3]}`, // 11     
`      ##       ##   ##      ##   ##       ##      ${neofetchText[4]}`, // 12     
"         ##### ###### ###### ###### #####         ", // 13    
"             ##       ##  ##       ##             ", // 14     
"            ##          ##          ##            ", // 15     
"            ##         ####         ##            ", // 16
"            ##       ##    ##       ##            ", // 17
"             ##     ##      ##     ##             ", // 18
"                ###            ###                ", // 19
];

const terminalState = {
    directoryTree: directoryTree,
    currentDirectory: root,
    prompt: prompt,
    history: [],
    logs: [],
};

export const INITIAL_STATE = {
    currentDirectory: root,
    directoryTree,
    terminalState,
    prompt,
    neofetch
};

