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

export const useModal = (
    component: React.FunctionComponent<any>,
    inputs: any[] = []
): Props => {
    assertFunctionalComponent(component);

    const key = useMemo(generateKey, []);
    const [isShown, setShown] = useState<boolean>(false);

    const modal = useMemo(() => component, [...inputs, component]);

    const context = useContext(ModalContext);

    useEffect(() => {
        if (isShown) {
            context.showModal(key, modal);
        } else {
            context.hideModal(key);
        }

        return () => context.hideModal(key);
    }, [modal, isShown, context, key]);


    const showModal = useCallback(() => setShown(true), []);
    const hideModal = useCallback(() => setShown(false), []);

    return {
        showModal,
        hideModal
    }
};