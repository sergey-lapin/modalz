import React from 'react';

export const useLongPress = (callback = () => { }, ms = 300) => {
    const [startLongPress, setStartLongPress] = React.useState(false);

    React.useEffect(() => {
        let timerId: any;
        if (startLongPress) {
            timerId = setInterval(callback, ms);
        } else {
            clearInterval(timerId);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [callback, ms, startLongPress]);

    return {
        onMouseDown: () => setStartLongPress(true),
        onMouseUp: () => {
            setStartLongPress(false)
            callback();
        },
        onMouseLeave: () => setStartLongPress(false),
        onTouchStart: () => setStartLongPress(true),
        onTouchEnd: () => setStartLongPress(false),
    };
}
