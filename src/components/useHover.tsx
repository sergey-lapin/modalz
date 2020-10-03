import React from 'react';

export const useHover = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    const ref = React.useRef<any>(null);

    const handleMouseOver = () => setIsHovered(true);
    const handleMouseOut = () => setIsHovered(false);

    React.useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);

                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [ref.current]
    );

    return { ref, setIsHovered, isHovered };
}