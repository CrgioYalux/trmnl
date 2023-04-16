import { DirectoryTree, Directory, CommandReturn, goToPath } from "./utils";

export default function echo(
    args: string[],
    directoryTree: DirectoryTree,
    currentDirectory: Directory,
): CommandReturn<Directory> {

    // two (three* actually) to-be-covered cases
    // 1. `echo 'some text here'` = `echo some text here` => `NEW_PROMPT some text here` \n NEW_PROMPT
    // 2. `echo 'some text here to save in a file' >> [relative|absolute] path` = `echo some text here to save in a file >> [relative|absolute] path` => NEW_PROMPT
    //   a. `>>` operand should create the output file in case it does not exist
    //   b. otherwise, append the echoed text at the end of the file
    // (actually) 3. `echo 'some text' > [relative|absolute] path` => NEW_PROMPT
    //   a. `>` operand should create the file in case it does not exist
    //   b. otherwise, replace the file's content with the echoed text

    const outputOperandIndex = args.findIndex(arg => arg === '>>' || arg === '>');

    if (outputOperandIndex === -1) {
        const textToEcho = args.join(' ');
        return {
            msgs: [textToEcho],
            error: false,
        };
    }

    const path = args.slice(outputOperandIndex + 1).join(' ').trim();

    if (!path) return {
        msgs: ['echo: >> \' : Path not passed'],
        error: true,
    };
    
    const textToEcho = args.slice(0, outputOperandIndex);
    const firstCommandReturn = goToPath(directoryTree, currentDirectory, path);

    if (!firstCommandReturn.out) {
        const pathParts = path.split('/');
        const parentDirectory = pathParts.slice(0, pathParts.length - 1).join('/');

        const secondCommandReturn = goToPath(directoryTree, currentDirectory, parentDirectory);

        if (!secondCommandReturn.out) {
            // the parent directory of the desired-to-create file does not exist
            // so the whole echo operation is invalid
        
            return {
                msgs: secondCommandReturn.msgs,
                error: true,
            };
        }

        // did not found the relative or absolute path (1)
        // or passed the name of the file as the last part of the path (2)
        //
        // in case (1) => error
        // but to make sure, and because it'll be also useful for case (2),
        // pop() the last part of the path (that might or might not be the
        // desired name for the file containing the echoed text), and re exec
        // goToPath with it; that way, verify that the parent directory exists
        // if it does, create the file with the last part of the path,
        // if not => error
        
        return {
            msgs: [],
            error: false,
        };
    } 

    // the file exists and it can be a directory or not
    // if it's a directory then just create the file there
    // but if it's a file then append the echoed text to the end of the file

    if (firstCommandReturn.out.isDirectory) {
        // create the file and set its content as the echoed text
    
        return {
            msgs: [],
            error: false,
        };
    }

    // the file is not a directory, so append the echoed text at the end of the file

    return { 
        msgs: [],
        error: false,
    };
};
