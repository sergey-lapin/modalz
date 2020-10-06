import { useContext, useCallback, useMemo } from "react";
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
    inputs: any[] = []
): Props => {
    assertFunctionalComponent(component);

    const key = useMemo(generateKey, []);
    const modal = useMemo(() => component, inputs);
    const context = useContext(ModalContext);

    const showModal = useCallback(() => context.showModal(key, modal), []);
    const hideModal = useCallback(() => {
        context.hideModal(key)
        onClose()
    }, []);

    useEscProcessing({ onEsc: hideModal, onEscCloseAll })

    return {
        showModal,
        hideModal
    }
};