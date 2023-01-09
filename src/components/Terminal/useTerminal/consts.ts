import { Directory } from './commands';

const defaultDirectoryTree: Directory = [
    {
        id: 0,
        name: '/',
        isDirectory: true,
        parent: null,
    },
    {
        id: 1,
        name: '/documents',
        isDirectory: true,
        parent: 0,
    },
    {
        id: 2,
        name: '/documents/to_know',
        isDirectory: true,
        parent: 1,
    },
    {
        id: 3,
        name: '/documents/to_know/1.txt',
        isDirectory: false,
        parent: 2,
    },
    {
        id: 4,
        name: '/documents/to_know/2.txt',
        isDirectory: false,
        parent: 2,
    },
    {
        id: 5,
        name: '/stuff',
        isDirectory: true,
        parent: 0,
    },
];

export const INITIAL_STATE = {
    activeLocation: '~',
    defaultDirectoryTree
};

