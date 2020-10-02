import * as React from "react";
import { invariantViolationUseModalOutsideProvider } from './invariants'

export interface ModalContextT {
    showModal(key: string, component: React.FunctionComponent<any>): void;
    hideModal(key: string): void;
}

export const ModalContext = React.createContext<ModalContextT>({
    showModal: invariantViolationUseModalOutsideProvider,
    hideModal: invariantViolationUseModalOutsideProvider,
});