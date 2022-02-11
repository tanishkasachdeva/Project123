noseX=0;
noseY=0;
leftWristX=0;
rightWristX=0;
difference=0;

function enter()
{
    font=document.getElementById("text_on_canvas").value;
}

function setup()
{
    video=createCapture(VIDEO);
    video.position(130,150);
    canvas=createCanvas(550,490);
    canvas.position(950,150);
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("Model Is Loaded!");
}

function draw()
{
    document.getElementById("font").innerHTML="Size Of The Text Will Be "+difference+"px";
    background('#30D5C8');
    textSize(difference);
    fill('#FFC0CB');
    text(font,noseX,noseY);
}

function gotPoses(results)
{
    if (results.length>0)
    {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("Nose X = "+noseX+" Nose Y = "+noseY);
        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.x;
        difference=floor(leftWristX-rightWristX);
        console.log("Left Wrist X = "+leftWristX+" Right Wrist X = "+rightWristX+" Difference = "+difference);
    }
} 