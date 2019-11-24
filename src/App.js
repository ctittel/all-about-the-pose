/* eslint-disable */

import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import logo from './logo.svg';
import Panel from './components/ControlPanel';
import { startMeasure, endMeasure, newMeasure } from './libs/pose';
import './App.css';
import './libs/camera';

function App() {
  const [isStop, setStop] = useState(true);
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <Button
          isStop={isStop}
          setStop={() => {
            if (!isStop) {
              endMeasure();
            } else {
              startMeasure();
            }
            setStop(!isStop);
          }}
        />
        <div id='main'>
          <video id="video" playsInline={true}
            style={{ transform: 'scaleX(-1)', display: 'none' }}/>
          <canvas id="output" />
        </div>
        <button onClick={() => newMeasure()}>RESET</button>
        { window.motions && window.motions.length > 0 ? `You did ${window.motions.length} push ups` : '' }
      </header>
    </div>
  );
}

export default App;
