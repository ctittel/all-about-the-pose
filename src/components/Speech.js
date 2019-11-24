import React from 'react';
import Speech from 'react-speech';

const style = {
  fontSize: 40,
  margin: 20,
  outline: 'none',
  color: '#fff',
};

const SampleSpeech = () => <Speech   text="
Seit dem 1. Oktober 2019 ist Prof. Thomas F. Hofmann Präsident der Technischen Universität München (TUM). Der Lebensmittel- und Naturstoffchemiker möchte Menschen miteinander in Kontakt bringen und den Diskurs zwischen Universität und Gesellschaft stärken.  "
pitch="0.5"
rate="1"
volume="0.1"
lang="en-GB"
voice="Daniel"/>

export default SampleSpeech;
