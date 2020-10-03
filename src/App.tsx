import React from 'react';
import './App.css';
import { useModal } from './components/useModalHook'

function removeItemOnce(arr: any, value: any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return [...arr];
}

const Modal = ({ children, x, y, onClose, onFocus }: {
  children: any,
  x: number,
  y: number,
  onClose: (event: React.MouseEvent<any, MouseEvent>) => void,
  onFocus?: (event: React.MouseEvent) => void
}) => {
  return <div className="modal"
    onClick={onFocus}
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
    {children}
  </div>
}

const SingleModal = ({ id, x, y, onRemove }: { id: number, x: number, y: number, onRemove: Function }) => {
  const { showModal } = useModal(
    ({ onClose }) => (
      <Modal x={x} y={y} onClose={() => {
        onRemove(id);
        onClose();
      }}
      >
        hello {id}
      </Modal>
    ), {
    onClose: () => onRemove(id)
  },
    [x, y]
  );

  React.useEffect(() => {
    showModal();
  }, [])

  return <></>
}

const getRandomPosition = () => {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  }
}

const App = () => {
  let buttonRef = React.useRef<HTMLButtonElement>(null);
  let [arrayOfModals, setArrayOfModals] = React.useState<number[]>([])

  const addModal = React.useCallback(() => {
    let lastElement = arrayOfModals[arrayOfModals.length - 1] || 0
    setArrayOfModals([...arrayOfModals, lastElement + 1]);
  }, [arrayOfModals])

  const closeModal = React.useCallback((id: number) => {
    setArrayOfModals(removeItemOnce(arrayOfModals, id));
  }, [arrayOfModals])

  React.useLayoutEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      const position = getRandomPosition()
      return (<SingleModal id={i} {...position} onRemove={closeModal} />)
    })}
    <button className="new-modal" onClick={addModal} tabIndex={0} ref={buttonRef}>
      New Modal
    </button>
  </div>

};

export default App;
