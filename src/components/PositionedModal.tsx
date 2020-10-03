import React from 'react';
import { useModal } from '../hooks/useModalHook'
import { Cross } from './Cross'

type ModalT = { id: number, x: number, y: number, onRemove: Function, children: any }

export const PositionedModal = ({ x, y, id, onRemove, children }: ModalT) => {
    const { showModal, hideModal } = useModal(
        () => {
            return <div style={{
                position: 'absolute',
                left: x,
                top: y,
            }}
            >
                <Cross onClose={() => hideModal()}>
                    {children}
                </Cross>
            </div >
        },
        { onClose: () => onRemove(id) },
        [x, y]
    );

    React.useEffect(() => {
        showModal();
        return () => hideModal()
    }, [showModal, hideModal])

    return <></>
}
