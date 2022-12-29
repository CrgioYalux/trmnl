import { useState } from 'react';

import './Terminal.css';

const promptSymbol = '~# ';

export const Terminal: React.FC<{ className?: string }> = ({ className = '' }) => {
    const [value, setValue] = useState<string>(promptSymbol);

    return (
        <div className={`Terminal ${className}`}>
            <textarea 
                value={value}
                onChange={(e) => setValue(`${promptSymbol}${e.target.value.slice(promptSymbol.length)}`)}
            ></textarea>
        </div>
    );
}
