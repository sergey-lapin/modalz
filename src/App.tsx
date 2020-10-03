import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { PositionedModal } from './components/PositionedModal'
import { getRandomPosition, removeItemOnce } from './utils'
import { ElementCard, getElementNumber } from './components/ElementCard'
import { cardWidth, cardHeight } from './consts'

const App = () => {
  let buttonRef = React.useRef<HTMLButtonElement>(null);
  let [arrayOfModals, setArrayOfModals] = React.useState<number[]>([])

  const addModal = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => {
      let lastElement = arrayOfModals[arrayOfModals.length - 1] || 0
      return [...arrayOfModals, lastElement + 1]
    });
  }, [])

  const closeModal = React.useCallback((id: number) => {
    setArrayOfModals((arrayOfModals) => removeItemOnce(arrayOfModals, id));
  }, [])

  const closeLast = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => arrayOfModals.slice(0, -1));
  }, [])

  const closeAll = React.useCallback(() => {
    setArrayOfModals(() => []);
  }, [])

  React.useLayoutEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      let position = getRandomPosition({
        hOffset: cardWidth,
        vOffset: cardHeight,
      });

      return (<PositionedModal id={i}
        {...position}
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
