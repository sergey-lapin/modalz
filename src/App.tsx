import React from 'react';
import './App.css';
import { useModal } from './components/useModalHook'

const Modal = ({ children, x, y, onClose }: { children: any, x: number, y: number, onClose: (event: React.MouseEvent<any, MouseEvent>) => void }) => {
  return <div className="modal"
    style={{
      left: x,
      top: y,
    }}

  >
    <button
      onClick={onClose}
      style={{
        position: 'absolute',
        top: 10,
        right: 10
      }}>
      Cross
      </button>
    {children}
  </div>
}

const App = () => {
  const [count, setCount] = React.useState(0);

  const { showModal } = useModal(
    ({ onClose }) => (
      <Modal x={0} y={0} onClose={onClose}>
        <span>The count is {count}</span>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </Modal>
    ),
    [count]
  );

  return <div className="new-modal-wrapper">
    <button className="new-modal" onClick={showModal}>
      New Modal
    </button>
  </div>

};

export default App;
