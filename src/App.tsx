import React from 'react';
import './App.css';
import { Button } from './components/Button'
import { PositionedModal } from './components/PositionedModal'
import { getRandomPosition, removeItemOnce } from './utils'
import { ElementCard, getElementNumber } from './components/ElementCard'
const useMobileDetect = require('use-mobile-detect-hook')

const App = () => {
  let detectMobile = useMobileDetect();
  let [shouldCloseAllOnEsc, setShouldCloseAllOnEsc] = React.useState(false);
  let [arrayOfModals, setArrayOfModals] = React.useState<number[]>([])

  const addModal = React.useCallback(() => {
    setArrayOfModals((arrayOfModals) => {
      let lastElement = arrayOfModals[arrayOfModals.length - 1] || 0
      return [...arrayOfModals, lastElement + 1];
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
  }, [])

  return <div className="new-modal-wrapper">
    {arrayOfModals.map((i) => {
      let position = getRandomPosition({
        hOffset: 250,
        vOffset: 350,
      })
      return (<PositionedModal
        {...position}
        onEscCloseAll={shouldCloseAllOnEsc ? closeAll : undefined}
        key={i}
        id={i}
        onRemove={closeModal}
      >
        <ElementCard elementNumber={getElementNumber(i)} />
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
