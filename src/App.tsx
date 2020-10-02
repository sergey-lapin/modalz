import React from 'react';
import './App.css';

function removeItemOnce(arr: any, value: any) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return [...arr];
}

const NewModalButton = ({ onClick }: { onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) => {
  return <button className="new-modal" onClick={onClick}>
    New Modal
  </button>
}

const Modal = ({ x, y, onClose }: { x: number, y: number, onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) => {
  let closeMeCallback = (event: KeyboardEvent) => {
    if (event.keyCode == 27) {
      onClose(event as any);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeMeCallback);
  }, [])

  return <div className="modal"
    style={{
      left: x,
      top: y,
      width: 200,
      height: 200,
      border: '1px solid',
      backgroundColor: "#fff"
    }}
    onClick={onClose}>
    <button
      style={{
        position: 'absolute',
        top: 10,
        right: 10
      }}>
      Cross
    </button>
  </div>
}

function App() {
  let [arrayOfModals, setArrayOfModals] = React.useState<number[]>([])

  const addModal = () => {
    setArrayOfModals([...arrayOfModals, arrayOfModals.length + 1]);
  }

  const closeModal = (id: number) => {
    setArrayOfModals(removeItemOnce(arrayOfModals, id));
  }

  return (
    <div className="App">
      <div className="new-modal-wrapper">
        {arrayOfModals.map((i) => {
          return <Modal key={i} x={100 * i} y={100 * i} onClose={(event) => {
            console.log(event);
            closeModal(i)
          }} />
        })}
        <NewModalButton onClick={addModal} />
      </div>
    </div>
  );
}

export default App;
