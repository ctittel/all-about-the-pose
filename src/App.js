/* eslint-disable */

import React, { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import logo from './logo.svg';
import Panel from './components/ControlPanel';
import { startMeasure, endMeasure, newMeasure, getStringData } from './libs/pose';
import './App.css';
import './libs/camera';
// import './components/Annyang'
import speak_text from './components/Speech'
// import SampleSpeech from './components/Speech'
import { activateAnnyang } from './components/Annyang'

function App() {
  const [isStop, setStop] = useState(true);
  const [speechActivated, setSpeech] = useState(false);
  if (speechActivated === false) {
    setSpeech(true);
    activateAnnyang(async () => {
      await setTimeout(() => {}, 1500);
      console.log('START');
      speak_text('Measurement started');
      startMeasure();
      setStop(false);
    }, async () => {
      await setTimeout(() => {}, 1500);
      console.log('END');
      speak_text('Measurement ended');
      endMeasure();
      setStop(true);
      const output = getStringData();
      speak_text(output);
      newMeasure();
    }); 
  }
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <Button
          isStop={isStop}
          setStop={async () => {
            
            if (!isStop) {
              await setTimeout(() => {}, 1500);
              console.log('END');
              endMeasure();
              const output = getStringData();
              speak_text(output);
              newMeasure();
            } else {
              await setTimeout(() => {}, 1500);
              console.log('START');
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
        { window.motions && window.motions.length > 0 ? `You did ${window.motions.length} push ups` : '' }
      </header>
    </div>
  );
}

export default App;
