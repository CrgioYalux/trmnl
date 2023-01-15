import { Directory } from './commands';

const root: Directory[number] = {
    id: 0,
    name: '/',
    isDirectory: true,
    parent: null,
    path: '/'
}

const defaultDirectoryTree: Directory = [
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

export const INITIAL_STATE = {
    currentDirectory: root,
    defaultDirectoryTree
};

