import command from "./commands";
import { INITIAL_STATE } from "./consts";
import { TerminalCommands } from "./commands/utils";
import { createPrompt } from "./utils";

import type { InternalTerminalState, TerminalReducerAction, TerminalLogs } from "./utils";
import type { Directory, DirectoryTree } from "./commands/utils";

function terminalReducer(state: InternalTerminalState, action: TerminalReducerAction): InternalTerminalState {
    let msgs: string[] = [];
    let error: boolean = false;
    let newCurrentDirectory: Directory | null = null;
    let newDirectoryTree: DirectoryTree | null = null;
    let newPrompt: string | null = null;
    let newLogs: TerminalLogs = [...state.logs];

    if (action.command.type === 'history') {
        msgs = [...state.history];
    }
    else if (action.command.type === 'help') {
        msgs = [...TerminalCommands];
    }
    else if (action.command.type === 'cd') {
        const cd = command.cd(action.command.args, state.directoryTree, state.currentDirectory);
        msgs = cd.msgs;
        error = cd.error;

        if (cd.out) {
            newCurrentDirectory = cd.out;
            newPrompt = createPrompt(cd.out.path);
        }
    }
    else if (action.command.type === 'ls') {
        const ls = command.ls(action.command.args, state.directoryTree, state.currentDirectory);
        msgs = ls.msgs;
        error = ls.error;
    }
    else if (action.command.type === 'mkdir') {
        const mkdir = command.mkdir(action.command.args, state.directoryTree, state.currentDirectory);
        msgs = mkdir.msgs;
        error = mkdir.error;

        if (mkdir.out) {
            newDirectoryTree = [...state.directoryTree];
            newDirectoryTree.push(mkdir.out);
        }
    }
    else if (action.command.type === 'rm') {
        const rm = command.rm(action.command.args, state.directoryTree, state.currentDirectory);
        msgs = rm.msgs;
        error = rm.error;

        if (rm.out) {
            newDirectoryTree = [...rm.out];
        }
    }
    else if (action.command.type === 'tree') {
        const tree = command.tree(action.command.args, state.directoryTree, state.currentDirectory);
        msgs = tree.msgs;
        error = true;

        if (!tree.error && tree.out) {
            msgs = [...tree.out.logs, `files: ${tree.out.counts.files} | dirs: ${tree.out.counts.dirs}`];
        }
    }
    else if (action.command.type === 'neofetch') {
        msgs = INITIAL_STATE.neofetch;
    }
    else if (action.command.type === 'pwd') {
        msgs = [state.currentDirectory.path];
    }
    else if (action.command.type !== 'clear') {
        msgs = [`${action.command.type}: Unknown command`];
        error = true;
    }

    newLogs.push({
        msgs: msgs,
        error: error,
        out: {
            input: {
                value: action.payload.value,
                prompt: createPrompt(state.currentDirectory.path),
                idx: newLogs.length + 1
            },
        }, 
    });

    if (action.command.type === 'clear') {
        newLogs.length = 0;
    }

    return {
        directoryTree: newDirectoryTree ?? state.directoryTree,
        currentDirectory: newCurrentDirectory ?? state.currentDirectory,
        prompt: newPrompt ?? state.prompt,
        history: [...state.history, `[${state.history.length + 1}] ${action.payload.value}`],
        logs: newLogs,
    };
}

export default terminalReducer;
