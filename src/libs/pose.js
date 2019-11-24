import { updateSimulation } from './simulationStartStop';

var poses = []; // all poses recorded

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

export function newMeasure() {
  start = false;
  stop = false;
  ended = false;
  poses = [];
}



var ended = false;

//First
export const updatePoses = (pose) => {
  //updateSimulation();
  //console.log(wristDistace(pose));
  //console.log(showFace(pose));
  if (!ended) {
    if (start && !stop) {
      poses.push(pose);
    }
    else if (start && stop) {
      console.log("Start calculating the Data...");
      /*
      console.log(showData());
      console.log("------");
      console.log(groupSectionPoses(poses));
      console.log("-------");
      
      showIt(poses);
      */
      console.log(groupMotion(poses));
      console.log(getStringData());
      console.log("Finish calculating the Data...");
      ended = true;
    }
  }
}

function showIt(poses){
  var gM = groupMotion(poses);
  for(let i = 0; i<gM.length; i++)
    console.log(aveWristDistance(gM[i]));
}

function showFace(pose){
  var nose = getPartScore(pose,"nose");
  var leftEye = getPartScore(pose,"leftEye");
  var rightEye = getPartScore(pose,"rightEye");
  var leftEar = getPartScore(pose,"leftEar");
  var rightEar = getPartScore(pose,"rightEar");

  var sum = 0;

  if(nose > 0.8)
    sum ++;
  if(leftEye>0.8)
    sum++;
  if(rightEye > 0.8)
  sum++;
  if(leftEar > 0.8)
  sum++;
  if(rightEar > 0.8)
  sum++;

  if(sum > 0)
    return true;
  return false;
}

function aveShowFace(movement){
  var l = movement.length;
  var maxValue = 0;
  var curValue = 0;
  for(let i = 0; i<movement.length;i++){
    for(let j = 0; j < movement[i].poseGoup.length;j++){
      if(showFace(movement[i].poseGoup[j]))
        curValue ++;
      maxValue++;
    }
  }
  if(maxValue == 0)
  return 0;

  return curValue / maxValue;
  
}

//wirst is shoulder
function wristDistace(pose){
  var leftWrist = getPosePart(pose,"leftShoulder");
  var rightWrist = getPosePart(pose,"rightShoulder");
  var leftHip = getPosePart(pose,"leftHip");
  var rightHip = getPosePart(pose,"rightHip");

  var distXleft = abs(leftWrist.position.x - leftHip.position.x);
  var distXright = abs(rightWrist.position.x  - leftWrist.position.x);

  return (distXleft+distXright)/2; 
}

function aveWristDistance(movement){
  var l = movement.length;
  var ave = 0;
  for(let i = 0; i<movement.length;i++){
    var tmp = 0;
    for(let j = 0; j < movement[i].poseGoup.length;j++){
      tmp += wristDistace(movement[i].poseGoup[j]);
    }
    if(movement[i].poseGoup.length != 0)
    tmp = tmp / movement[i].poseGoup.length;
    ave += tmp;
  }
  if(movement.length!=0)
  return ave / movement.length;
  return 0;
}

export function getStringData(){
    var output = "";
    var gM = groupMotion(poses);
    var count = 0;
    for(let i = 0; i<gM.length; i++){
      if(gM[i].length>3){
      var value = aveWristDistance(gM[i]);
      var showEye = aveShowFace(gM[i]);
      var fullRange = isFullRange(gM[i]);
      output += "PushUp " + i + " :\n";
      
      if(value < 80)
        output += "-Put your Elbow a bit together\n";
      else if(value < 110)
        output += "-Your Elbow are nice!\n";
      else 
        output += "-Put Elbow further apart\n";

      if(showEye<0.5)
        output += "-Show in the camara..\n";
      else
        output += "-You look at the bottom..\n";

      if(fullRange){
        output += "-Nice Range of motion!\n";
        count ++;
      }
    
      else 
        output += "-Go lower!\n";
    }
    }
    output += "You did " + count + " correct PushUps\n";
    return output;
}



function isFullRange(movement){
    var bot = false;
    for(let i = 0; i<movement.length; i++)
      if(movement[i].section.localeCompare("bottom") == 0)
        bot = true;
    return bot;
}


function abs(value) {
  if(value > 0)return value;
  return value * (-1);
}



function groupMotion(pos) {
  var gSP = groupSectionPoses(pos);
  
  const holdStartPos = 5;
  var motion = [];
  var tmpMotion = [];
  //cutt the beginning

  var cut = 0;
  while (cut < gSP.length) {
    if (gSP[cut].section.localeCompare("start") == 0 && gSP[cut].poseGoup.length > holdStartPos)
      break;
    cut++;
  }
  var cutGSP = cutArray(gSP, cut);

  tmpMotion.push(cutGSP[0]);
  for (let i = 1; i < cutGSP.length; i++) {
    tmpMotion.push(cutGSP[i]);
    if (cutGSP[i].section.localeCompare("start") == 0) {
      motion.push(tmpMotion);
      tmpMotion = [];
      tmpMotion.push(cutGSP[i]);
    }
  }
  return motion;

}

function groupSectionPoses(pos) {
  var secPos = addSectionPoses(pos);
  
  var curSection = secPos[0].section;
  var tmpPos = [];
  tmpPos.push(secPos[0].pose);
  var groupSection = [];
  for (let i = 1; i < secPos.length; i++) {
    var tmpSection = secPos[i].section;
    if (curSection.localeCompare(tmpSection) == 0) {
      tmpPos.push(secPos[i].pose);
    }
    else {
      groupSection.push({ section: curSection, poseGoup: tmpPos });
      curSection = tmpSection;
      tmpPos = [];
    }
  }

  //clearSection
  var newGS = [];
  for (let i = 0; i < groupSection.length; i++) {
    if (groupSection[i].poseGoup.length > 0)
      newGS.push(groupSection[i]);
  }
  return newGS;
}

function addSectionPoses(pos) {
  let sectionPose = [];
  for (let i = 0; i < pos.length; i++) {
    let sec = detectMoveSection(pos[i]);
    if (sec.localeCompare("undefined") != 0) {
      sectionPose.push({ section: detectMoveSection(pos[i]), pose: pos[i] });
    }
  }
  if(sectionPose == null)
  return null;

  var newSecPose = [];
  //first check bundary start
  if (sectionPose[0].section.localeCompare(sectionPose[1].section) == 0)
    newSecPose.push(sectionPose[0]);
  for (let i = 1; i < sectionPose.length - 1; i++) {
    var pivot = sectionPose[i];
    var left = sectionPose[i - 1];
    var right = sectionPose[i + 1];
    if (left.section.localeCompare(pivot.section) == 0 || right.section.localeCompare(pivot.section) == 0)
      newSecPose.push(pivot);
  }
  if (sectionPose[sectionPose.length - 1].section.localeCompare(sectionPose[sectionPose.length]) == 0)
    newSecPose.push(sectionPose[sectionPose.length]);

  return newSecPose;
}





// Movement Start -> Middle -> Low -> Bottom -> Low -> Middle -> Start
function detectMoveSection(pose) {
  //Values from Felix:
  let aStartFrom = 190;
  let aMiddleFrom = 170;
  let aLowFrom = 140;
  let aBottomFrom = 90;

  var angle = getAngleElbos(pose);

  if (angle == -1) {
    console.log("Angle -1 was to  weak!");
    return "undefined"
  }

  if (angle < aBottomFrom)
    return "bottom";
  if (angle < aLowFrom)
    return "low";
  if (angle < aMiddleFrom)
    return "middle";
  if (angle < aStartFrom)
    return "start";

  return "undefined";
}


//Both angles of elbos need to be good -> angle from both  else return -1 as invalid
function getAngleElbos(pose) {

  var leftA = angleParts(pose, "leftWrist", "leftShoulder", "leftElbow");
  var rightA = angleParts(pose, "rightWrist", "rightShoulder", "rightElbow");

  var angle = (leftA + rightA) / 2;
  //console.log("left:" + leftA);
  //console.log("rigth:" + rightA);
  var scoreLeft = getPartScore(pose, "leftWrist", "leftShoulder", "leftElbow");
  var scoreRight = getPartScore(pose, "rightWrist", "rightShoulder", "rightElbow");

  if (scoreLeft != -1 && scoreRight != -1)
    return angle;

  return -1;
}

//If the Angel is valuable it returns the sum else it returns -1
function getAngleScore(pose, part1, part2, part3) {
  var s1 = getPartScore(pose, part1);
  var s2 = getPartScore(pose, part2);
  var s3 = getPartScore(pose, part3);

  var sum = (s1 + s2 + s3) / 3;

  //Less more po
  if (sum > 0.32)
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
function getPartScore(pose, part) {
  let suff = 1.0; // Is the point important enough?
  let score = getPosePart(pose, part).score;

  if (score <= suff)
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
