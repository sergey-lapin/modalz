import React from 'react';
import '../App.css';

import { useLongPress } from '../hooks/useLongPress'
type RefType = ((instance: HTMLButtonElement | null) => void) | React.MutableRefObject<HTMLButtonElement | null> | null

type ButtonT = {
    children: any,
    onClick: () => void,
    onKeyDown?: ((event: React.KeyboardEvent<HTMLButtonElement>) => void) | undefined
}

export const Button = React.forwardRef(({ children, onClick, onKeyDown }: ButtonT, ref: RefType) => {
    const longPress = useLongPress(onClick, 150);
    return (<button className="button" {...longPress} onKeyDown={onKeyDown} ref={ref}>
        {children}
    </button>)
})
