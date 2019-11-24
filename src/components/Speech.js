import React from 'react';
import Speech from 'speak-tts'

const speech = new Speech() // will throw an exception if not browser supported
if (speech.hasBrowserSupport()) { // returns a boolean
    console.log("speech synthesis supported")
}

// speech.init({
//     'lang': 'en-GB',
//     'voice':'Google UK English Male'
// }).then((data) => {
//     // The "data" object contains the list of available voices and the voice synthesis params
//     console.log("Speech is ready, voices are available", data)
// }).catch(e => {
//     console.error("An error occured while initializing : ", e)
// })

speech.init({
    'volume': 1,
    'lang': 'en-GB',
    'rate': 1,
    'pitch': 1,
    'voice': 'Google UK English Male',
    'splitSentences': true
}).then((data) => {
    // The "data" object contains the list of available voices and the voice synthesis params
    console.log("Speech is ready, voices are available", data)
}).catch(e => {
    console.error("An error occured while initializing : ", e)
})

speech.setLanguage('en-GB')

export default function speak_text(text) {
    speech.speak({
        text: text,
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
}

// speak_text('test');
speak_text('Hello. How are you?');