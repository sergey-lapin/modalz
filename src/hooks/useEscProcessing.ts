import * as React from "react";
const listeners: ((e: KeyboardEvent) => void)[] = [];

export const useEscProcessing = ({ onEsc }: { onEsc: Function }) => {
    React.useLayoutEffect(() => {
        let callback = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                onEsc()
                e.stopImmediatePropagation();
                document.removeEventListener('keydown', callback)
            }
        }

        for (let listener of listeners) {
            document.removeEventListener('keydown', listener)
        }

        document.addEventListener('keydown', callback);

        for (let i = listeners.length - 1; i >= 0; i--) {
            document.addEventListener('keydown', listeners[i]);
        }
        listeners.push(callback);

        return () => {
            document.removeEventListener('keydown', callback)
        }
    }, [])
}