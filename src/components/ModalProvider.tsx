import * as React from "react";
import { ModalContext } from "./ModalContext";
import { ModalRoot } from "./ModalRoot";

export type Props = {
    container?: Element;
    rootComponent?: React.ComponentType<any>;
    children: React.ReactNode;
}

export const ModalProvider = ({
    container,
    rootComponent,
    children
}: Props) => {
    const [modals, setModals] = React.useState<Record<string, React.FunctionComponent<any>>>({});

    const showModal = React.useCallback(
        (key: string, modal: React.FunctionComponent<any>) => {
            return setModals(modals => {
                return {
                    ...modals,
                    [key]: modal
                }
            })
        },
        []
    );

    const hideModal = React.useCallback(
        (key: string) =>
            setModals(modals => {
                if (!modals[key]) {
                    return modals;
                }
                const newModals = { ...modals };
                delete newModals[key];
                return newModals;
            }),
        []
    );

    const isShown = React.useCallback(
        (key: string) =>
            !!Object.keys(modals).find((item) => item === key),
        [modals]
    );

    const onClose = React.useCallback(
        (key: string) => hideModal(key),
        [hideModal]
    );

    const contextValue = React.useMemo(() => ({ showModal, hideModal, isShown }), [showModal, hideModal, isShown]);

    return (
        <ModalContext.Provider value={contextValue} >
            <>
                {children}
                <ModalRoot
                    onClose={onClose}
                    modals={modals}
                    component={rootComponent}
                    container={container}
                />
            </>
        </ModalContext.Provider>
    );
};