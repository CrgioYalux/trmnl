import { useState, useEffect, useRef } from 'react';

import { useTerminal } from '../../providers/Terminal/useTerminal';
import { TerminalLogs } from './TerminalLogs';
import { TerminalInput } from './TerminalInput';

import './Terminal.css';

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { interpretInput, logs, prompt } = useTerminal();
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView();
        }
    }, [logs]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        interpretInput(value);
    
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
