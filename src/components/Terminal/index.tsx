import { useState, useEffect, useRef } from 'react';

import { useTerminalContext } from '../../providers/Terminal';
import { TerminalLogs } from './TerminalLogs';
import { TerminalInput } from './TerminalInput';

import './Terminal.css';

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [state, actions] = useTerminalContext();
    const [value, setValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.scrollIntoView();
        }
    }, [state.logs]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        actions.interpretInput(value);
    
        setValue('');
    };

    return (
        <form 
            className={`Terminal ${className}`}
            onSubmit={handleSubmit}
            onClick={() => { inputRef.current && inputRef.current.focus(); }}
        >
            <TerminalLogs />
            <TerminalInput
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                prompt={state.prompt}
                usable
            />
        </form>
    );
}
