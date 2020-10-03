import React from 'react';
import './App.css';
import { useModal } from './components/useModalHook'
import { Button } from './components/Button'

function removeItemOnce(arr: any, value: any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return [...arr];
}

type ModalT = { id: number, x: number, y: number, onRemove: Function }

const Modal = ({ id, x, y, onRemove }: ModalT) => {
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

const getRandomPosition = ({ width, height }: { width: number, height: number }) => {
  return {
    x: Math.random() * Math.max(0, (window.innerWidth - width)),
    y: Math.random() * Math.max(0, (window.innerHeight - height)),
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

  const closeLast = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => arrayOfModals.slice(0, -1));
  }, [arrayOfModals])

  const closeAll = React.useCallback(() => {
    setArrayOfModals(() => []);
  }, [arrayOfModals])

  React.useLayoutEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      const position = getRandomPosition({
        width: 200,
        height: 350,
      })
      return (<Modal id={i} {...position} onRemove={closeModal} />)
    })}
    <div className="row">
      <Button onClick={addModal} ref={buttonRef}>
        New Modal
      </Button>
      {!!arrayOfModals.length && <Button onClick={closeAll}>
        Close All
      </Button>}
      <Button onClick={closeLast}>
        Close Last
      </Button>
    </div>
  </div>

};

export default App;
