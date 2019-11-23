import React, { useState } from 'react';
import { Header } from './components/Header';

import logo from './logo.svg';
import Panel from './components/ControlPanel';
import './App.css';
import './libs/camera';


function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setIsOpen(true)}>
          Learn
        </button>
        <Header />
        <div id='main'>
          <video id="video" playsInline={true}
            style={{ transform: 'scaleX(-1)', display: 'none' }}/>
          <canvas id="output" />
        </div>
      </header>
      <Panel isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default App;
