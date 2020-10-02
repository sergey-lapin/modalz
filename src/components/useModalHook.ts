import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ModalContext } from "./ModalContext";
import { assertFunctionalComponent } from './invariants'

const generateKey = (() => {
    let count = 0;
    return () => `${++count}`;
})();

type Props = {
    showModal: () => void,
    hideModal: () => void
}

const listeners: any = [];

export const useModal = (
    component: React.FunctionComponent<any>,
    { onClose }: { onClose: Function },
    inputs: any[] = []
): Props => {
    assertFunctionalComponent(component);

    const key = useMemo(generateKey, []);
    const [isShown, setShown] = useState<boolean>(false);

    const modal = useMemo(() => component, [...inputs, component]);

    const context = useContext(ModalContext);

    useEffect(() => {
        if (isShown) {
            setShown(true);
            context.showModal(key, modal);
        } else {
            setShown(false);
            context.hideModal(key);

        }

        return () => context.hideModal(key);
    }, [modal, isShown, context, key]);


    useEffect(() => {
        let callback = (e: KeyboardEvent) => {
            if (e.keyCode == 27) {
                onClose()
                context.hideModal(key);
                e.stopImmediatePropagation();
                document.removeEventListener('keyup', callback)
            }
        }

        for (let listener of listeners) {
            document.removeEventListener('keyup', listener)
        }

        document.addEventListener('keyup', callback);

        for (let i = listeners.length - 1; i >= 0; i--) {
            document.addEventListener('keyup', listeners[i]);
        }
        listeners.push(callback);

        return () => {
            document.removeEventListener('keyup', callback)
        }
    }, [modal, isShown, context, key]);


    const showModal = useCallback(() => setShown(true), []);
    const hideModal = useCallback(() => setShown(false), []);

    return {
        showModal,
        hideModal
    }
};