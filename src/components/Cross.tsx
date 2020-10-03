
import React from 'react';
import './Cross.css'

type CrossT = {
    onClose: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
    children: any
}

export const Cross = ({ onClose, children }: CrossT) => {
    const [isHovered, setIsHovered] = React.useState(false);
    let onMouseOver = React.useCallback(() => setIsHovered(true), [])
    let onMouseLeave = React.useCallback(() => setIsHovered(false), [])

    return <div
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
    >
        {
            isHovered && (
                <div
                    className="cross"
                    onClick={onClose}
                >
                    ✕
                </div>
            )
        }
        {children}
    </div>
}

