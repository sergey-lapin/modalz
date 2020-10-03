import * as React from "react";
let listeners: ((e: KeyboardEvent) => void)[] = [];

const addCallback = (callback: (e: KeyboardEvent) => void) => {
    for (let listener of listeners) {
        document.removeEventListener('keydown', listener)
    }

    document.addEventListener('keydown', callback);

    for (let i = listeners.length - 1; i >= 0; i--) {
        document.addEventListener('keydown', listeners[i]);
    }
    listeners.push(callback);
}

export const useEscProcessing = ({ onEsc, onEscCloseAll }: { onEsc: Function, onEscCloseAll?: Function }) => {
    React.useLayoutEffect(() => {
        let callback = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                if (onEscCloseAll) {
                    e.stopPropagation();
                    onEscCloseAll();
                    listeners = []
                } else {
                    let foundIndex = listeners.findIndex((item) => item === callback)
                    listeners.splice(foundIndex, 1);
                    onEsc()
                    e.stopImmediatePropagation();
                }

                document.removeEventListener('keydown', callback)
            }
        }

        addCallback(callback)

        return () => {
            listeners = []
            document.removeEventListener('keydown', callback)
        }
    }, [onEsc, onEscCloseAll])
}