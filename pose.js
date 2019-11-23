import { updateSimulation } from './simulationStartStop';
import { isNameStartChar } from 'xmlchars/xml/1.0/ed5';
import { getPositivePatterns } from 'fast-glob/out/managers/tasks';

const poses = []; // all poses recorded

var start = false; 
var stop = false;
//call in camara when you click on startMeasure
export function startMeasure(){
  console.log("in startMeasure()")
  start = true;
}
//call in camara when you click on endMeasure
export function endMeasure(){
  if(start = true){
    console.log("in endMeasure()")
    stop = true;
  }
}

var ended = false;

//First
export const updatePoses = (pose) => {
  updateSimulation();
  if(!ended){
    if(start && !stop){
      console.log(movSectionCheck(pose,"start"));
      poses.push(pose); 
    } 
    else if(start && stop){
      console.log("Start calculating the Data...");
      
      console.log("Finish calculating the Data...");
      ended = true;
    }
  }
  else
    console.log("Waiting for next Measure...");
}

function movSectionCheck(pose,sec){
  switch(sec){
    case "start": return isStart(pose);
    default: return false;
  }
}

function isStart(pose){
  var anyLeft = angleParts(pose, "leftWrist", "leftShoulder", "leftElbow");
  var anyRight = angleParts(pose, "rightWrist", "rightShoulder", "rightElbow");

  var score = (getPartScore(pose,"leftWrist") + getPartScore(pose,"leftShoulder") + getPartScore(pose,"leftElbow")) / 3

  /*
  var slS = getPartScore(pose,"leftShoulder");
  var slW = getPartScore(pose,"leftWrist");
  var slE = getPartScore(pose,"leftElbow");

  console.log("leftShoulder: " + slS+ " leftWrist:" + slW + " leftElbow:" +slE);
  */

  //console.log(score);

  if(anyLeft > 150 && anyRight > 150)
    return "True with accuracy: " + score;
    
  return "Wrong with accuracy: " + score;
}




//Returns the first index from pose of starting doing the motion
function detectStartMotion(p){
    /* Measure the Frames with be in scope for the discussion "Is it a good starting Point" If number higher more datas but if its to hight
    you look in a different motion We need hight frame rate!*/
    var crit = 1;  
    var thinkStart;

}

function detectedEndMotion(p){
  var start = detectStartMotion(p);
  start++;
  for(let i = start; i<p.length; i++){

  }
}

// cutArray([0,1,2,3,4,5..],2) -> [2,3,4,5]
function cutArray(a,index){
  var newA = [];
  for(let i = 0; i<a.length;i++){
    if(i>= index){
      newA.push(a[i]);
    }
  }
  return newA;
}


//Drops from poses the first Motion detected
function dropFirstMotion(p){
   var newPoses = [];
   var startIndexNew = detectStartMotion() + 1;
   //Copie current poses the newPoses exept the first Motion
   for(let i = 0; i<p.length;i++){
     if(i>= startIndexNew){
        newPoses.push(p[i]);
     }
   }
   return newPoses;
}


//Returns the keypoint for a part
function getPosePart(pose,part){
  for(let i = 0; i < 17; i++){
    if(pose.keypoints[i].part.localeCompare(part) == 0)
      return pose.keypoints[i];
  }
  console.log("Wrong input in part! You wrote: " + part);
}

function getPosePos(pose,part){
    return getPosePart(pose,part).position;
}

//Function returns the score if the score is important enough
function getPartScore(pose,part){
    let suff = 1.0; // Is the point important enough?
    let score = getPosePart(pose,part).score;
    
    if(score < suff)
      return score;
    
    return -1;
}


function distParts(pose,part1,part2){
  if(part1.localeCompare(part2) == 0)
    return 0;
    
  let pos1 = getPosePos(pose,part1);
  let pos2 = getPosePos(pose,part2);
  
  var a = pos1.x - pos2.x;
  var b = pos1.y - pos2.y;
  return Math.sqrt( a*a + b*b );
}

// returns the angle between (part1pivot) (part2pivot)
// console.log(angleParts(pose,"leftEye","rightEye","nose"));
function angleParts(pose,part1,part2,pivot){
  
  let dist1 = distParts(pose,part1,pivot);
  let dist2 = distParts(pose,part2,pivot);

  //console.log("Test1");
  //pos to the 0,0 coordinate
  let pos1x = getPosePos(pose,part1).x - getPosePos(pose,pivot).x;
  let pos1y = getPosePos(pose,part1).y - getPosePos(pose,pivot).y;

  let pos2x = getPosePos(pose,part2).x - getPosePos(pose,pivot).x;
  let pos2y = getPosePos(pose,part2).y - getPosePos(pose,pivot).y;

  //console.log("Test2");

  let dotproduct = pos1x * pos2x + pos1y * pos2y;
  let muldist = dist1 * dist2;
  //console.log("Test3");
  let radians =  Math.acos(dotproduct / muldist);
  //console.log("Test4");
  return radians * (180/Math.PI);
  
}

