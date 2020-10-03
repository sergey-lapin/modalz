
import React from 'react';
import './Cross.css'

type CrossT = {
    onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
}

export const Cross = ({ onClick }: CrossT) => (
    <div
        className="cross"
        onClick={onClick}
    >
        ✕
    </div>
)

type CrossWrapperT = {
    onClose: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void),
    children: any
}

export const CrossWrapper = ({ onClose, children }: CrossWrapperT) => {
    const [isHovered, setIsHovered] = React.useState(false);
    let onMouseOver = React.useCallback(() => setIsHovered(true), [])
    let onMouseLeave = React.useCallback(() => setIsHovered(false), [])

    return <div
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
    >
        {isHovered && <Cross onClick={onClose} />}
        {children}
    </div>
}

