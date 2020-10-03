import React from 'react';
import '../App.css';

import { useLongPress } from '../hooks/useLongPress'
type RefType = ((instance: HTMLButtonElement | null) => void) | React.MutableRefObject<HTMLButtonElement | null> | null

export const Button = React.forwardRef(({ children, onClick }: { children: any, onClick: () => void }, ref: RefType) => {
    const longPress = useLongPress(onClick, 150);
    return (<button className="button" {...longPress} ref={ref}>
        {children}
    </button>)
})
