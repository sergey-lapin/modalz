import React from 'react';
import { useModal } from './useModalHook'

type ModalT = { id: number, x: number, y: number, onRemove: Function }

export const Modal = ({ id, x, y, onRemove }: ModalT) => {
    const { showModal, hideModal } = useModal(
        ({ onClose }) => (
            <div className="modal"
                style={{
                    left: x,
                    top: y,
                }}

            >
                <div
                    className="modal-close"
                    onClick={onClose}
                >
                    ✕
      </div>
      hello {id}
            </div>
        ), {
        onClose: () => onRemove(id)
    },
        [x, y]
    );

    React.useEffect(() => {
        showModal();
        return () => {
            hideModal();
        }
    }, [])

    return <></>
}
