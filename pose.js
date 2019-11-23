const calc = [];

export const hello = () => {
  console.log('hello');
}

export const printStuff = (stuff) => {
  console.log(stuff);
}

export const addStuff = (st) => {
  stuff = [...stuff, st];
}

export const calcPoses = (pose) => {
  funPose(pose);
}

function funPose(pose){
  //console.log(pose);
  //console.log(getPosePart(pose,"nose"));
  console.log(angleParts(pose,"leftEye","rightEye","nose"));
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
      return -1;
    return score;
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

//returns the angle between (part1pivot) (part2pivot)
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

