import './Terminal.css';

import { useState } from 'react';
import { runCommand, CommandReturn } from './utils';

const promptSymbol = '~# ';

function handleSubmit(event: React.SyntheticEvent, cb: (command: CommandReturn) => void) {
    event.preventDefault();

    const form = event.target as HTMLFormElement & {
        commandInput: HTMLInputElement
    }
    const command = form.commandInput.value.slice(promptSymbol.length);

    cb(runCommand(command));
    form.commandInput.focus();
}

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [value, setValue] = useState<string>(promptSymbol);
    const [logs, setLogs] = useState<CommandReturn[]>([]);
    
    return (
        <form 
            className={`Terminal ${className}`}
            onSubmit={(event) => handleSubmit(event, (log) => {
                setLogs((prev) => [...prev, log]);
                setValue(promptSymbol);
            })}
            onClick={(event) => {
                const form = event.target as HTMLFormElement & {
                    commandInput: HTMLInputElement
                }
                form.commandInput.focus();
            }}
        >
            {logs.map(({ error, msg }, i) => (
                <li 
                    key={i}
                    className={`Terminal__command_log ${error ? '--unsuccess' : '-success'}`}
                >{msg}</li>
            ))}
            <input
                type='text'
                value={value}
                name='commandInput'
                onChange={(e) => setValue(`${promptSymbol}${e.target.value.slice(promptSymbol.length)}`)}
                autoFocus
            />
        </form>
    );
}
