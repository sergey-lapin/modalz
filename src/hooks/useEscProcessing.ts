import * as React from "react";
let listeners: ((e: KeyboardEvent) => void)[] = [];

const addCallback = (callback: (e: KeyboardEvent) => void) => {
    for (let listener of listeners) {
        document.removeEventListener('keydown', listener)
    }

    document.addEventListener('keydown', callback);
    listeners.unshift(callback);

    for (let listener of listeners) {
        document.addEventListener('keydown', listener)
    }
}

const removeCallback = (callback: (e: KeyboardEvent) => void) => {
    let foundIndex = listeners.findIndex((item) => item === callback)
    if (foundIndex !== -1) {
        listeners.splice(foundIndex, 1);
        document.removeEventListener('keydown', callback);
    }
}

const removeAllCallbacks = () => {
    listeners.forEach(callback => {
        document.removeEventListener('keydown', callback);
    });
    listeners = [];
}

export const useEscProcessing = ({ onEsc, onEscCloseAll }: { onEsc: Function, onEscCloseAll?: Function }) => {
    React.useLayoutEffect(() => {
        let callback = (e: KeyboardEvent) => {
            if (e.keyCode === 27) {
                if (onEscCloseAll) {
                    e.stopPropagation();
                    onEscCloseAll();
                    removeAllCallbacks();
                } else {
                    e.stopImmediatePropagation();
                    onEsc()
                    removeCallback(callback);
                }

                document.removeEventListener('keydown', callback)
            }
        }

        addCallback(callback)

        return () => {
            removeCallback(callback);
        }
    }, [onEsc, onEscCloseAll])
}