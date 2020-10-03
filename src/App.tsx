import React from 'react';
import './App.css';
import { useModal } from './components/useModalHook'
import { useLongPress } from './components/useLongPress'

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

type RefType = ((instance: HTMLButtonElement | null) => void) | React.MutableRefObject<HTMLButtonElement | null> | null

const Button = React.forwardRef(({ children, onClick }: { children: any, onClick: () => void }, ref: RefType) => {
  const longPress = useLongPress(onClick, 150);
  return (<button className="button" {...longPress} ref={ref}>
    {children}
  </button>)
})

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
      return (<SingleModal id={i} {...position} onRemove={closeModal} />)
    })}
    <div className="row">
      <Button onClick={addModal} ref={buttonRef}>
        New Modal
      </Button>
      <Button onClick={closeAll}>
        Close all
      </Button>
      <Button onClick={closeLast}>
        Close last
      </Button>
    </div>
  </div>

};

export default App;
