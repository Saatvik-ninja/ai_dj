function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    canvas.position(425,200);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,400);
    fill("#34ebb7");
    stroke("#42b6f5");

    if(confidence_left_wrist>0.2){
        circle(left_wrist_x,left_wrist_y,20);
        InNumberleft_wrist_y=Number(left_wrist_y);
        remove_decimals=floor(left_wrist_y);
        volume=remove_decimals/400;
        document.getElementById("volume_answer").innerHTML="volume= "+volume
        song.setVolume(volume);
    }  
    circle(right_wrist_x,right_wrist_y,20);
    if(right_wrist_y>0 && right_wrist_y<=100){
        document.getElementById("speed_answer").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(right_wrist_y>100 && right_wrist_y<=200){
        document.getElementById("speed_answer").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(right_wrist_y>200 && right_wrist_y<=300){
        document.getElementById("speed_answer").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(right_wrist_y>300 && right_wrist_y<=400){
        document.getElementById("speed_answer").innerHTML="speed=2x";
        song.rate(2);
    }
}
 
left_wrist_x=0;
left_wrist_y=0;
right_wrist_x=0;
right_wrist_y=0;
song="";
confidence_left_wrist=0;
function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log('poseNet is started');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        confidence_left_wrist=results[0].pose.keypoints[9].score;
        console.log("confidence= "+confidence_left_wrist);
        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+left_wrist_x+"left wrist y= "+left_wrist_y);

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+right_wrist_x+"right wrist y= "+right_wrist_y);
    }
}
