import { startMeasure, endMeasure }   from './pose';

var simV = 0;

var startFrame = 0;
var endFrame  = 50;

var started = false;
var finished = false;

export function updateSimulation(){
    if(simV >= endFrame && !finished){
        finished = true;
        console.log("Press End Measure");
        endMeasure();
    }
    else if (simV >= startFrame && !started){
        started = true;
        console.log("Press Start Measure");
        startMeasure();
    }
    simV++;
}
