import React from 'react';
import { Header } from './components/Header';
import logo from './logo.svg';
import './App.css';
import './libs/camera';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <div id='main'>
          <video id="video" playsInline={true}
            style={{ transform: 'scaleX(-1)', display: 'none' }}/>
          <canvas id="output" />
        </div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
