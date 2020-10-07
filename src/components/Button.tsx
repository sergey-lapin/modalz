import React from 'react';
import '../App.css';

import { useLongPress } from '../hooks/useLongPress'

type ButtonT = {
    children: any,
    onClick: () => void,
}

export const Button = ({ children, onClick }: ButtonT) => {
    const longPress = useLongPress(onClick, 150);
    return (<button className="button" {...longPress}>
        {children}
    </button>)
}
