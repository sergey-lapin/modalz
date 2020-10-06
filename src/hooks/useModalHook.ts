import { useContext, useCallback, useMemo, useRef, useState, useEffect, DependencyList } from "react";
import { ModalContext } from "../components/ModalContext";
import { assertFunctionalComponent } from '../components/invariants'
import { useEscProcessing } from './useEscProcessing'

const generateKey = (() => {
    let count = 0;
    return () => `${++count}`;
})();

type Props = {
    showModal: () => void,
    hideModal: () => void
}

type OptionsT = { onClose: Function, onEscCloseAll?: Function }

export const useModal = (
    component: React.FunctionComponent<any>,
    { onClose, onEscCloseAll }: OptionsT,
    inputs: DependencyList = []
): Props => {
    assertFunctionalComponent(component);
    const contextRef = useRef(useContext(ModalContext));
    const key = useMemo(generateKey, []);
    const modal = useCallback(component, inputs);
    const modalRef = useRef(modal);

    const [isShown, setShown] = useState<boolean>(false);

    const showModal = useCallback(() => {
        contextRef.current.showModal(key, modalRef.current);
        setShown(true);
    }, [key]);

    const hideModal = useCallback(() => {
        contextRef.current.hideModal(key)
        setShown(false);
        onClose();
    }, [key, onClose]);

    useEffect(() => {
        const context = contextRef.current;
        if (isShown) {
            context.showModal(key, modal);
        } else {
            context.hideModal(key);
        }

        return () => context.hideModal(key);
    }, [key, modal, isShown, onClose]);

    useEscProcessing({ onEsc: hideModal, onEscCloseAll })

    return {
        showModal,
        hideModal
    }
};