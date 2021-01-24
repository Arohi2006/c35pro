var balloon, balloonImg;
var database;
var position;

function preload(){
balloonImg = loadImage("Hot Air Ballon-04.png");
}


function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImg);
  var databaseBallooonPos=database.ref("balloon/position");
  databaseBallooonPos.on("value", readPosition);
}

function draw(){
  background("white");
  if(keyDown(LEFT_ARROW)){
     writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
     writePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
     writePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
     writePosition(0,+1);
  }
  drawSprites();
}

function writePosition(x,y){
  database.ref("balloon/position").set({
      "x":position.x+x,
      "y":position.y+y
  })
}

function readPosition(data){
  console.log(data);
  position = data.val();
  console.log(position);
  balloon.x = position.x;
  balloon.y = position.y;
}