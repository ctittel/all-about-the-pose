import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import logo from './logo.svg';
import Panel from './components/ControlPanel';
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
          setStop={() => setStop(!isStop)}
        />
        <div id='main'>
          <video id="video" playsInline={true}
            style={{ transform: 'scaleX(-1)', display: 'none' }}/>
          <canvas id="output" />
        </div>
      </header>
    </div>
  );
}

export default App;
