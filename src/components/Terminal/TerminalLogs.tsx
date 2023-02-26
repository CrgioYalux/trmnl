import React from 'react';

import { TerminalInput } from "./TerminalInput";
import { useTerminalContext } from '../../providers/Terminal';

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


interface MultipleTerminalLogsProps {
    msgs: string[];
    parentKey: number;
}

const MultipleTerminalLogs: React.FC<MultipleTerminalLogsProps> = ({ msgs, parentKey }) => {
    const list = msgs.map((msg, childKey) => <SingleTerminalLog key={`${parentKey}-${childKey}`} msg={msg} />);
    return <>{list}</>
};

interface TerminalLogsProps {}

export const TerminalLogs: React.FC<TerminalLogsProps> = () => {
    const [state] = useTerminalContext();

    const logsList = state.logs
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
