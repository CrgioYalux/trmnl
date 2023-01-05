/* Change Directory */

type Env = number;

type DataType = 'file' | 'directory';

/*
* 'Envs' are directories, which are treated as objects
* e.g. ENV_A: ENV = {
*   location: '/', // home
*   type: 'file', // : DataType
* */

function cd1(args: string[], setter: (state: string) => void) {
    const where = args[0] ?? '~';

    setter(where);
}

function cd(args: string[], setter: React.Dispatch<React.SetStateAction<string>>) {
    const where = args[0] ?? '~';

    setter(where);
}

export {
    cd 
}

