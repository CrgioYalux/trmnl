import './Terminal.css';

import { useState, useEffect } from 'react';
import { useTerminal, CommandReturn } from './useTerminal';
import { createPrompt, setInput } from './utils';

interface TerminalInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ value, onChange }) => {
    return (
        <input
            type='text'
            name='commandInput'
            value={value}
            onChange={onChange}
            autoFocus
        />
    );
}

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
                        className={`Terminal__command_log ${error ? '--unsuccess' : '--success'}`}
                        key={`${logCount}-${i}`}
                    >{mi}</pre>
                ))
            )
        );

    return <>{logsList}</>;
}


export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const { interpretInput, activeLocation, logs } = useTerminal();

    const [value, setValue] = useState<string>('');
    const [prompt, setPrompt] = useState<string>(() => createPrompt(activeLocation));

    useEffect(() => {
        setValue(setInput('', prompt));
    }, [prompt]);
    
    useEffect(() => {
        setPrompt(createPrompt(activeLocation));
    }, [activeLocation]);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement & {
            commandInput: HTMLInputElement;
        }

        const commandInputValue = value.slice(prompt.length);

        interpretInput(commandInputValue);
    
        setValue(setInput('', prompt));
        form.commandInput.focus();
    };

    const handleClick = (event: React.SyntheticEvent) => {
        const form = event.target as HTMLFormElement & {
            commandInput: HTMLInputElement
        }
        form.commandInput.focus();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(setInput(event.target.value, prompt));

    return (
        <form 
            className={`Terminal ${className}`}
            onSubmit={handleSubmit}
            onClick={handleClick}
        >
            <Logs logs={logs} />
            <TerminalInput value={value}
                onChange={handleChange}
            />
        </form>
    );
}
