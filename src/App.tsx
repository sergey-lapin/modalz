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
  const { showModal, hideModal } = useModal(
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
    return () => {
      hideModal();
    }
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
    setArrayOfModals((arrayOfModals) => [...arrayOfModals, lastElement + 1]);
  }, [arrayOfModals])

  const closeModal = React.useCallback((id: number) => {
    setArrayOfModals((arrayOfModals) => removeItemOnce(arrayOfModals, id));
  }, [arrayOfModals])

  const closeAll = React.useCallback(() => {
    setArrayOfModals(() => []);
  }, [arrayOfModals])

  React.useLayoutEffect(() => {
    buttonRef.current?.focus()
  }, [])

  console.log(arrayOfModals)

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      const position = getRandomPosition()
      return (<SingleModal id={i} {...position} onRemove={closeModal} />)
    })}
    <div className="row">
      <button className="button" onClick={addModal} ref={buttonRef}>
        New Modal
    </button>
      <button className="button" onClick={closeAll}>
        Close all
    </button>
    </div>
  </div>

};

export default App;
