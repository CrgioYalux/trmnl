import './Terminal.css';

import { useState, useRef } from 'react';
import { useTerminal, CommandReturn } from './useTerminal';

const Logs: React.FC<{ logs: CommandReturn[] }> = ({ logs }) => {
    const logsList = logs
        .filter(({ msg }) => msg.length > 0)
        .map(({ msg, error, logCount}) => 
            typeof msg === 'string' 
            ? (
                <pre
                    className={`Terminal__command_log ${error ? '--unsuccess' : '--success'}`}
                    key={logCount}
                >{msg}</pre>
            )
            : (
                msg.map((mi, i) => (
                    <pre
                        className={`Terminal__command_log ${error ? '--unsuccess' : '--success'}`} key={`${logCount}-${i}`}
                    >{mi}</pre>
                ))
            )
        );

    return <>{logsList}</>;
}

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { interpretInput, logs, prompt } = useTerminal();

    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState<string>('');

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        interpretInput(value);
    
        inputRef.current && inputRef.current.focus();
        setValue('');
    };

    return (
        <form 
            className={`Terminal ${className}`}
            onSubmit={handleSubmit}
            onClick={() => { inputRef.current && inputRef.current.focus(); }}
        >
            <Logs logs={logs} />
            <label className='Terminal__input_label'>
                <span>{prompt}</span>
                <input
                    type='text'
                    ref={inputRef}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    autoFocus
                />
            </label>
        </form>
    );
}
