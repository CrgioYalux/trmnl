import React from 'react';

import { CommandReturn } from '../../providers/Terminal/useTerminalContext';
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

export const TerminalLogs: React.FC<{ logs: CommandReturn[] }> = ({ logs }) => {
    const logsList = logs
        .map(({ msgs, error, logCount, input }) => {
            return (
                <React.Fragment key={logCount}>
                    <TerminalInput 
                        usable={false}
                        value={input.value}
                        prompt={input.prompt}
                    />
                    {
                        msgs.length === 1
                            ? <SingleTerminalLog error={error} msg={msgs[0]}/>
                            : <MultipleTerminalLogs parentKey={logCount} msgs={msgs}/>
                    }

                </React.Fragment>   
            )
        });

    return <>{logsList}</>;
};



