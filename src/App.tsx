import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { Modal } from './components/Modal'
import { getRandomPosition, removeItemOnce } from './utils'

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
      return (<Modal id={i}
        {...getRandomPosition({
          hOffset: 200,
          vOffset: 350,
        })}
        onRemove={closeModal}
      />)
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
