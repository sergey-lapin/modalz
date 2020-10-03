import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ModalContext } from "./ModalContext";
import { assertFunctionalComponent } from './invariants'
import { useEscProcessing } from './useEscProcessing'

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
    { onClose }: { onClose: Function },
    inputs: any[] = []
): Props => {
    assertFunctionalComponent(component);

    const key = useMemo(generateKey, []);
    const modal = useMemo(() => component, [...inputs, component]);
    const context = useContext(ModalContext);

    useEscProcessing({
        onEsc: () => {
            onClose()
            context.hideModal(key);
        }
    })

    const showModal = useCallback(() => context.showModal(key, modal), []);
    const hideModal = useCallback(() => context.hideModal(key), []);

    return {
        showModal,
        hideModal
    }
};