import { updateSimulation } from './simulationStartStop';

const poses = []; // all poses recorded

var start = false;
var stop = false;
//call in camara when you click on startMeasure
export function startMeasure() {
  console.log("in startMeasure()")
  start = true;
}
//call in camara when you click on endMeasure
export function endMeasure() {
  if (start = true) {
    console.log("in endMeasure()")
    stop = true;
  }
}

var ended = false;

//First
export const updatePoses = (pose) => {
  updateSimulation();
  if (!ended) {
    if (start && !stop) {
      poses.push(pose);
    }
    else if (start && stop) {
      console.log("Start calculating the Data...");
      showData();
      console.log("Finish calculating the Data...");
      ended = true;
    }
  }
  else
    console.log("Waiting for next Measure...");
}

function showData(){
  let sectionPose = []
  for(let i = 0; i < poses.length ; i++){
    sectionPose.push(detectMoveSection(poses[i]));
  }
  for(let i = 0; i < sectionPose.length; i++){
    console.log("Index: " + i + ", " + sectionPose[i]);
  }
}

// Movement Start -> Middle -> Low -> Bottom -> Low -> Middle -> Start
function detectMoveSection(pose) {
    //Values from Felix:
    let aStartFrom = 190;
    let aMiddleFrom = 170;
    let aLowFrom = 140;
    let aBottomFrom = 90;
    
    var angle = getAngleElbos(pose);
    
    if(angle == -1){
      console.log("Angle -1 was to  weak!");
      return "undefined"
    }
    
    
    if(angle < aBottomFrom)
      return "bottom";
    if(angle < aLowFrom)
      return "low";
    if(angle < aMiddleFrom)
      return "middle";
    if(angle < aStartFrom)
      return "start";  
    
    return "undefined";
}


//Both angles of elbos need to be good -> angle from both  else return -1 as invalid
function getAngleElbos(pose){

  var leftA = angleParts(pose, "leftWrist", "leftShoulder", "leftElbow");
  var rightA = angleParts(pose, "rightWrist", "rightShoulder", "rightElbow");

  var angle = (leftA + rightA)/2;
  console.log("left:" + leftA);
  console.log("rigth:" + rightA);
  var scoreLeft = getPartScore(pose, "leftWrist", "leftShoulder", "leftElbow");
  var scoreRight = getPartScore(pose, "rightWrist", "rightShoulder", "rightElbow");

  if(scoreLeft != -1 && scoreRight != -1)
    return angle;
  
  return -1;
}

//If the Angel is valuable it returns the sum else it returns -1
function getAngleScore(pose,part1,part2,part3){
  var s1 = getPartScore(pose,part1);
  var s2 = getPartScore(pose,part2);
  var s3 = getPartScore(pose,part3);

  var sum = s1 + s2 + s3;

  if(sum > 1.0)
    return sum;
  
  return -1;
}


// cutArray([0,1,2,3,4,5..],2) -> [2,3,4,5]
function cutArray(a, index) {
  var newA = [];
  for (let i = 0; i < a.length; i++) {
    if (i >= index) {
      newA.push(a[i]);
    }
  }
  return newA;
}


//Returns the keypoint for a part
function getPosePart(pose, part) {
  for (let i = 0; i < 17; i++) {
    if (pose.keypoints[i].part.localeCompare(part) == 0)
      return pose.keypoints[i];
  }
  console.log("Wrong input in part! You wrote: " + part);
}

function getPosePos(pose, part) {
  return getPosePart(pose, part).position;
}

//Function returns the score if the score is important enough
function getPartScore(pose,part){
    let suff = 1.0; // Is the point important enough?
    let score = getPosePart(pose,part).score;
    
    if(score <= suff)
      return score;
    
    return -1;
}

function distParts(pose, part1, part2) {
  if (part1.localeCompare(part2) == 0)
    return 0;

  let pos1 = getPosePos(pose, part1);
  let pos2 = getPosePos(pose, part2);

  var a = pos1.x - pos2.x;
  var b = pos1.y - pos2.y;
  return Math.sqrt(a * a + b * b);
}

// returns the angle between (part1pivot) (part2pivot)
function angleParts(pose, part1, part2, pivot) {

  let dist1 = distParts(pose, part1, pivot);
  let dist2 = distParts(pose, part2, pivot);

  //pos to the 0,0 coordinate
  let pos1x = getPosePos(pose, part1).x - getPosePos(pose, pivot).x;
  let pos1y = getPosePos(pose, part1).y - getPosePos(pose, pivot).y;

  let pos2x = getPosePos(pose, part2).x - getPosePos(pose, pivot).x;
  let pos2y = getPosePos(pose, part2).y - getPosePos(pose, pivot).y;

  let dotproduct = pos1x * pos2x + pos1y * pos2y;
  let muldist = dist1 * dist2;
  let radians = Math.acos(dotproduct / muldist);
  return radians * (180 / Math.PI);
}
