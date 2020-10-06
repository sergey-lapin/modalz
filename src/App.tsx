import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { PositionedModal } from './components/PositionedModal'
import { getRandomPosition } from './utils'
import { ElementCard, getElementNumber } from './components/ElementCard'
const useMobileDetect = require('use-mobile-detect-hook')

type ModalT = {
  index: number;
  x: number;
  y: number;
}
const App = () => {
  let detectMobile = useMobileDetect();
  let [shouldCloseAllOnEsc, setShouldCloseAllOnEsc] = React.useState(false);
  let [arrayOfModals, setArrayOfModals] = React.useState<ModalT[]>([])

  const addModal = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => {
      let position = getRandomPosition({
        hOffset: 250,
        vOffset: 350,
      })
      let lastElement = arrayOfModals[arrayOfModals.length - 1]
      let lastElementIndex = lastElement ? lastElement.index : 0

      return [...arrayOfModals, {
        index: lastElementIndex + 1,
        ...position
      }];
    });
  }, [])

  const closeModal = React.useCallback((index: number) => {
    setArrayOfModals((arrayOfModals) => {
      let foundIndex = arrayOfModals.findIndex((item) => item.index === index);
      if (foundIndex > -1) {
        arrayOfModals.splice(foundIndex, 1);
      }
      return [...arrayOfModals];
    });
  }, [])

  const closeLast = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => arrayOfModals.slice(0, -1));
  }, [])

  const closeAll = React.useCallback(() => {
    setArrayOfModals(() => []);
  }, [])

  React.useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        addModal();
      }
    }
    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [addModal])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((item) => {
      return (<PositionedModal
        x={item.x}
        y={item.y}
        onEscCloseAll={shouldCloseAllOnEsc ? closeAll : undefined}
        key={item.index}
        id={item.index}
        onRemove={closeModal}
      >
        <ElementCard elementNumber={getElementNumber(item.index)} />
      </PositionedModal>)
    })}

    <div className="row">
      {!!arrayOfModals.length && <>
        <Button onClick={closeAll}>
          Close All
        </Button>
        <Button onClick={closeLast}>
          Close Last
        </Button>
      </>}
    </div>
    <div className="row" >
      <Button onClick={addModal} >
        New Modal
      </Button>

      {!detectMobile.isMobile() && (
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              value="shouldCloseAllOnEsc"
              checked={shouldCloseAllOnEsc}
              onChange={() => setShouldCloseAllOnEsc(!shouldCloseAllOnEsc)} />
          Close all on Esc
        </label>
        </div>
      )}
    </div>
  </div>

};

export default App;
