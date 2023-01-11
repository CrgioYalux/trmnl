import './Terminal.css';

import { useState, useRef } from 'react';
import { useTerminal } from './useTerminal';
import { TerminalLogs } from './TerminalLogs';
import { TerminalInput } from './TerminalInput';

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
            <TerminalLogs logs={logs} />
            <TerminalInput
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                prompt={prompt}
                usable
            />
        </form>
    );
}
