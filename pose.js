const posesNr = [100];
const nr = 0;
let boolean = 1; //true initial value (bool) -> return type of function checkRestofFrames()
let left;
let right;
let leftAfter;
let rightAfter;
let angleHigh = 170;
let angleLow = 50;
let angleLowMatched = 0; //false inital value (bool)
let angleHighMatched = 0; //false inital value (bool)

export const addStuff = (st) => {
  stuff = [...stuff, st];
}

export const calcPoses = (pose) => {
  funPose(pose);
}



function calculatePushUp(posesNr) {
  // First Case must be the initial position, if wrong there is an output
  // maby change this to the first 5 frames if this requirement is matched
  setLandR(left, right, posesNr, 0);
  if (left < angleHigh && right < angleHigh) {
    console.log("Ups this PushUp was Wrong! First Position is Wrong\nAngle left: %f\nAngle right: %f", left, right)
    return;
  }
  let counter = 0;

  for (let x = 0; x < length.posesNr && x + 1 <= length.posesNr; x++) {
    //get angle of new points
    setLandR(left, right, posesNr, x);
    setLandR(leftAfter, rightAfter, posesNr, x + 1);
    // is the next frame already smaller than the first one? if yes 
    if (left < 40 && right < 40)
      angleLowMatched = 1;

    if (angleLowMatched == 1) {
      //now check whether the rest is rising by calling helper function checkRestofFrames()
      if (checkRestofFrames(posesNr, x)) {
        console.log("Amazing you have done an exellent Push Up");
        return;
      }
      console.log("Ups this PushUp was Wrong! Please improve and do it agian!");
      return;
      //is angle smaller than 40 degree matched && all following movements increase to nearly 170 degree?
    }
    else if (leftAfter > left && rightAfter > right) {
      console.log("Ups this PushUp was Wrong! You didn't achieved the lower Position and went back up!!!")
      return;
    }
  }
  console.log("Ups this PushUp was Wrong! (after all Frames)");
}

// checks whether rest of all angels are bigger than before && 170 degrees are achieved
function checkRestofFrames(posesNr, nr) {
  for (nr; nr < length.posesNr && nr + 1 <= length.posesNr; nr++) {
    setLandR(left, right, posesNr, nr);
    setLandR(leftAfter, rightAfter, posesNr, nr + 1);
    if (leftAfter > left && rightAfter > right) {
      // is the initial position achieved
      if (left >= angleHigh && right >= angleHigh) {
        return boolean = 1;
      }
    }
    else {
      boolean = 0;
    }
  }
  //last case checks whether last frame angles are bigger than angles bevor and gt than 170 degrees
  setLandR(left, right, posesNr, nr);
  setLandR(leftAfter, rightAfter, posesNr, nr - 1);
  if (leftAfter < left && rightAfter < right) {
    // is the initial position achieved
    if (left >= angleHigh && right >= angleHigh) {
      return boolean = 1;
    }
    boolean = 0;
  }
  return boolean;
}

//function that sets the values of left and right by calling
function setLandR(anyLeft, anyRight, posesNr, xy) {
  anyLeft = angleParts(posesNr[xy], "leftWrist", "leftShoulder", "leftElbow");
  anyRight = angleParts(posesNr[xy], "rightWrist", "rightShoulder", "rightElbow");
}

function funPose(pose) {
  console.log(pose);
  //console.log(getPosePart(pose,"nose"));
  console.log(angleParts(pose, "leftEye", "rightEye", "nose"));
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
  if (score < suff)
    return -1;
  return score;
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

//returns the angle between (part1pivot) (part2pivot)
function angleParts(pose, part1, part2, pivot) {

  let dist1 = distParts(pose, part1, pivot);
  let dist2 = distParts(pose, part2, pivot);

  //console.log("Test1");
  //pos to the 0,0 coordinate
  let pos1x = getPosePos(pose, part1).x - getPosePos(pose, pivot).x;
  let pos1y = getPosePos(pose, part1).y - getPosePos(pose, pivot).y;

  let pos2x = getPosePos(pose, part2).x - getPosePos(pose, pivot).x;
  let pos2y = getPosePos(pose, part2).y - getPosePos(pose, pivot).y;

  //console.log("Test2");

  let dotproduct = pos1x * pos2x + pos1y * pos2y;
  let muldist = dist1 * dist2;
  //console.log("Test3");
  let radians = Math.acos(dotproduct / muldist);
  //console.log("Test4");
  return radians * (180 / Math.PI);

}

