import React from 'react';
import { useModal } from './useModalHook'
import { ElementCard, getElementNumber } from './ElementCard'




type ModalT = { id: number, x: number, y: number, onRemove: Function }

const ModalWrapper = ({ id, x, y, onClose, children }: { id: any, x: any, y: any, onClose: any, children: any }) => {
    const [isCrossHovered, setCrossIsHovered] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    return <div
        onMouseOver={() => {
            setIsHovered(true)
        }}
        onMouseOut={() => {
            setTimeout(() => {
                if (!isCrossHovered) {
                    setIsHovered(false)
                }
            }, 50)
        }}
        style={{
            position: 'absolute',
            left: x,
            top: y,
        }}
    >
        <ElementCard elementNumber={getElementNumber(id)}>
            {(isHovered || isCrossHovered) &&
                (
                    <div
                        className="modal-close"
                        onClick={onClose}
                        onMouseOver={() => {
                            setCrossIsHovered(true)
                        }}
                        onMouseOut={() => {
                            setCrossIsHovered(false)
                        }}
                    >
                        ✕
                    </div>)
            }
            {children}
        </ElementCard>
    </div>
}


export const Modal = ({ id, x, y, onRemove }: ModalT) => {
    const { showModal, hideModal } = useModal(
        ({ onClose }) => {
            return <ModalWrapper id={id} x={x} y={y} onClose={onClose}>
            </ModalWrapper>
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
    }, [])

    return <></>
}
