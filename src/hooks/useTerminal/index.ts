import { useReducer } from 'react';
import type { Reducer } from 'react';

import { INITIAL_STATE } from './consts';
import { sliceFirstWord } from './utils';
import terminalReducer from './terminalReducer';

import type { InternalTerminalState, ExternalTerminalState, TerminalActions, TerminalReducerAction } from './utils';
import type { TerminalCommand, Command } from './commands/utils';

type useTerminalState = readonly [
    state: ExternalTerminalState,
    actions: TerminalActions,
]

function useTerminal(): useTerminalState {
    const [state, dispatch] = useReducer<Reducer<InternalTerminalState, TerminalReducerAction>>(terminalReducer, INITIAL_STATE.terminalState);

    const interpretInput = (input: string) => {
        const { firstWord, rest } = sliceFirstWord(input);
        const args = rest === null ? [] : rest.split(' ');

        const command: Command = {
            type: firstWord as TerminalCommand,
            args,
        };

        dispatch({ command, payload: { value: input }});
    };

    const out: useTerminalState = [
        {
            directoryTree: state.directoryTree,
            prompt: state.prompt,
            logs: state.logs,
        },
        { interpretInput },
    ];

    return out;
};

export type { useTerminalState };
export default useTerminal;
