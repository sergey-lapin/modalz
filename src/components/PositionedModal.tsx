import React from 'react';
import { useModal } from '../hooks/useModalHook'
import { CrossWrapper } from './Cross'

type ModalT = { id: number, x: number, y: number, onRemove: Function, children: any }

export const PositionedModal = ({ id, x, y, onRemove, children }: ModalT) => {
    const { showModal, hideModal } = useModal(
        ({ onClose }) => {
            return <div style={{
                position: 'absolute',
                left: x,
                top: y,
            }}
            >
                <CrossWrapper onClose={onClose}>
                    {children}
                </CrossWrapper>
            </div >
        }, {
        onClose: () => onRemove(id)
    },
        [x, y]
    );

    React.useEffect(() => {
        showModal();
        return () => {
            hideModal();
        }
    }, [showModal, hideModal])

    return <></>
}
