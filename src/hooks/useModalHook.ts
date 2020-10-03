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

export const useModal = (
    component: React.FunctionComponent<any>,
    { onClose }: { onClose: Function },
    inputs: any[] = []
): Props => {
    assertFunctionalComponent(component);

    const key = useMemo(generateKey, []);
    // eslint-disable-next-line
    const modal = useMemo(() => component, [...inputs, component]);
    const context = useContext(ModalContext);

    useEscProcessing({
        onEsc: () => {
            onClose()
            context.hideModal(key);
        }
    })

    // eslint-disable-next-line
    const showModal = useCallback(() => context.showModal(key, modal), []);
    // eslint-disable-next-line
    const hideModal = useCallback(() => context.hideModal(key), []);

    return {
        showModal,
        hideModal
    }
};