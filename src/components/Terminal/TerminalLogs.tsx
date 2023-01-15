import React from 'react';

import { CommandReturn } from "./useTerminal";
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
    msgs: string[];
    parentKey: number;
}

const MultipleTerminalLogs: React.FC<MultipleTerminalLogs> = ({ msgs, parentKey }) => {
    const list = msgs.map((msg, childKey) => <SingleTerminalLog key={`${parentKey}-${childKey}`} msg={msg} />);
    return <>{list}</>
};

export const TerminalLogs: React.FC<{ logs: CommandReturn[] }> = ({ logs }) => {
    const logsList = logs
        .filter(({ msg }) => msg.length > 0)
        .map(({ msg, error, logCount, input }) => {
            return (
                <React.Fragment key={logCount}>
                    <TerminalInput 
                        usable={false}
                        value={input.value}
                        prompt={input.prompt}
                    />
                    {
                        typeof msg === 'string'
                            ? <SingleTerminalLog error={error} msg={msg} /> 
                            : <MultipleTerminalLogs parentKey={logCount} msgs={msg} />
                    }
                </React.Fragment>   
            )
        });

    return <>{logsList}</>;
};



