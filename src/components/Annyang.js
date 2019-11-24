const annyang = require('annyang');

export function activateAnnyang(startFn, stopFn) {
  if (annyang) {
    console.log("annyang found");
    // Let's define a command.
    annyang.debug();
    var commands = {
      'hello world': function () { console.log('I am sorry john I cannot let you do that'); },
      'open google': function () { window.open("https://google.com"); },
      'start': function () {
        startFn();
      },
      'stop': function () {
        stopFn();
      }
    };
    annyang.setLanguage('en-GB');
    // Add our commands to annyang
    annyang.addCommands(commands);

    annyang.addCallback('soundstart', function () {
      console.log('sound detected');
    });

    annyang.addCallback('result', function () {
      console.log('sound stopped');
    });

    // Start listening.
    annyang.start();
  }

}
