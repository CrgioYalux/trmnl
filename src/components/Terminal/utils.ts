enum TerminalCommand {
    help = 'help',
    cd = 'cd',
    ls = 'ls',
    pwd = 'pwd',
    neofetch = 'neofetch'
}

type CommandReturn = {
    error: boolean,
    msg: string,
}

function sliceFirstWord(sentence: string) {
    const firstSpaceIndex = sentence.indexOf(' ');
    const firstWord = firstSpaceIndex === -1 ? sentence : sentence.slice(0, firstSpaceIndex);

    return firstWord;
}

function interpretCommand(command: TerminalCommand) {
    switch (command) {
        case TerminalCommand.cd:
        case TerminalCommand.ls:
        case TerminalCommand.pwd:
        case TerminalCommand.help:
        case TerminalCommand.neofetch:
        default:
            return {
                error: false,
                msg: `ran \`${command}\` command`
            }
    }
}

function runCommand(command: string): CommandReturn {
    const firstWord = sliceFirstWord(command);

    if (Object.values(TerminalCommand).find((v) => firstWord === v)) {
        const reqCommand = firstWord as TerminalCommand;
        const commandReturn = interpretCommand(reqCommand);
        return commandReturn;
    }

    return {
        error: true,
        msg: `\`${firstWord}\`: Unknown command`
    }
}

export {
    interpretCommand,
    runCommand,
    type CommandReturn      
}
