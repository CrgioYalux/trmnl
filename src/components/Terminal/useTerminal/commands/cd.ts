function cd(args: string[], setter: React.Dispatch<React.SetStateAction<string>>) {
    const where = args[0] ?? '~';

    setter(where);
}

export {
    cd 
}

