import React from 'react';

interface TerminalInputProps {
    value: string;
    prompt: string;
    usable: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TerminalInput = React.forwardRef<HTMLInputElement, TerminalInputProps>((props, ref) => {
    const { value, onChange, prompt, usable } = props;

    const Input = usable 
        ? <input
            className='TerminalInput__input'
            type='text'
            ref={ref}
            value={value}
            onChange={onChange}
            autoFocus={usable}
        />
        : <span className='TerminalInput__input'>{value}</span>;

    return (
        <label className={`TerminalInput ${usable ? '--usable' : '--unusable'}`}>
            <span>{prompt}</span>
            {Input}
        </label>
    );
});
