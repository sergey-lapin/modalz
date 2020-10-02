import React from 'react';

export const ElementCard = ({ name, color }: { name: string, color: string }) => {
    return (
        <div style={{ backgroundColor: color }}>
            {name}
        </div>
    );
}