import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { PositionedModal } from './components/PositionedModal'
import { getRandomPosition, removeItemOnce } from './utils'
import { ElementCard, getElementNumber } from './components/ElementCard'

const App = () => {
  let buttonRef = React.useRef<HTMLButtonElement>(null);
  let [arrayOfModals, setArrayOfModals] = React.useState<number[]>([])

  const addModal = React.useCallback(() => {
    let lastElement = arrayOfModals[arrayOfModals.length - 1] || 0
    setArrayOfModals((arrayOfModals) => [...arrayOfModals, lastElement + 1]);
  }, [arrayOfModals])

  const closeModal = React.useCallback((id: number) => {
    setArrayOfModals((arrayOfModals) => removeItemOnce(arrayOfModals, id));
  }, [])

  const closeLast = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => arrayOfModals.slice(0, -1));
    // eslint-disable-next-line
  }, [arrayOfModals])

  const closeAll = React.useCallback(() => {
    setArrayOfModals(() => []);
  }, [])

  React.useLayoutEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      let position = getRandomPosition({
        hOffset: 250,
        vOffset: 250 * 1.25,
      })
      return (<PositionedModal
        {...position}
        key={i}
        id={i}
        onRemove={closeModal}
      >
        <ElementCard elementNumber={getElementNumber(i)} />
      </PositionedModal>)
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
