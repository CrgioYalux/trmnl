import React from 'react';

import { TerminalContextCommandReturn } from '../../providers/Terminal/useTerminalContext';
import { TerminalInput } from "./TerminalInput";

interface SingleTerminalLogProps {
    error?: boolean;
    msg: string;
}

const SingleTerminalLog: React.FC<SingleTerminalLogProps> = ({ error = false, msg }) => {
    return (
            <pre
                className={`SingleTerminalLog ${error ? '--unsuccess' : '--success'}`}
            >
                {msg}
            </pre>
    );
};


interface MultipleTerminalLogs {
    msgs: readonly string[];
    parentKey: number;
}

const MultipleTerminalLogs: React.FC<MultipleTerminalLogs> = ({ msgs, parentKey }) => {
    const list = msgs.map((msg, childKey) => <SingleTerminalLog key={`${parentKey}-${childKey}`} msg={msg} />);
    return <>{list}</>
};

export const TerminalLogs: React.FC<{ logs: TerminalContextCommandReturn[] }> = ({ logs }) => {
    const logsList = logs
        .map((log) => {
            if (log.out) return (
                <React.Fragment key={log.out.input.idx}>
                    <TerminalInput 
                        usable={false}
                        value={log.out.input.value}
                        prompt={log.out.input.prompt}
                    />
                    {
                        log.msgs.length === 1
                            ? <SingleTerminalLog error={log.error} msg={log.msgs[0]}/>
                            : <MultipleTerminalLogs parentKey={log.out.input.idx} msgs={log.msgs}/>
                    }

                </React.Fragment>   
            )
        });

    return <>{logsList}</>;
};
