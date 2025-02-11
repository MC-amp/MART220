function setup() {
  createCanvas(400, 400);
  squarex=100
  squarey=80
  circlex=300
  circley=100
  car2x=200
  car2y=200
  fallingShapex=0
  fallingShapey=0
  randomColorBackground = color(random(255), random(255), random(255));
  randomColorSquare = color(random(255), random(255), random(255));
  randomColorCircle = color(random(255), random(255), random(255));
  randomColorFallingShape = color(random(255), random(255), random(255));
  myFont=loadFont('assets/fonts/Playfair.ttf');
  car=loadImage('assets/images/carimage.png');
  gptCar=loadImage('assets/images/gptCar.png');
  car2=loadImage('assets/images/Car2.png');
}

function draw() {
  background(randomColorBackground);
  image(car,squarex,squarey,50,50);
  image(gptCar,circlex,circley,50,50);
  image(car2,car2x,car2y,50,50);
  setInterval(car2speed, 1000);
  car2speed();
  function car2speed(){  
    car2x++; 
    if(car2x >= 400){
      car2x = 0; 
       
     }
    }
  //squarecharacter(squarex,squarey)
  //circlecharacter(circlex,circley)
  fill(randomColorCircle)
  textFont(myFont);
  text("Basic Moving Shapes", 20, 20);
  text("Matthew ", 300, 380);
  if (keyIsPressed) {
    if(key=='w'){
      squarey=squarey-2
    }
    else if(key=='s'){
      squarey=squarey+2
    }
    else if(key=='d'){
      squarex=squarex+2
    }
    else if(key=='a'){
      squarex=squarex-2
    }
  }
    if (keyIsPressed) {
    if(key=='8'){
      circley=circley-2
    }
    else if(key=='5'){
      circley=circley+2
    }
    else if(key=='6'){
      circlex=circlex+2
    }
    else if(key=='4'){
      circlex=circlex-2
    }
  }
  fallingShape(0,fallingShapey)
  fallingShape(25,fallingShapey)
  fallingShape(50,fallingShapey)
  fallingShape(75,fallingShapey)
  fallingShape(100,fallingShapey)
  fallingShape(125,fallingShapey)
  fallingShape(150,fallingShapey)
  fallingShape(175,fallingShapey)
  fallingShape(200,fallingShapey)
  fallingShape(225,fallingShapey)
  fallingShape(250,fallingShapey)
  fallingShape(275,fallingShapey)
  fallingShape(300,fallingShapey)
  fallingShape(325,fallingShapey)
  fallingShape(350,fallingShapey)
  fallingShape(375,fallingShapey)
  fallingShape(400,fallingShapey)
  if (fallingShapey<400){
    fallingShapey=fallingShapey+1
  }
  else if (fallingShapey>=400){
    fallingShapey=0
  }
}
function squarecharacter(squarex,squarey) {
  fill(randomColorSquare)
  square (squarex,squarey,40)
}
function circlecharacter(circlex,circley) {
  fill(randomColorCircle)
  circle (circlex,circley,40)
}
function fallingShape(fallingShapex,fallingShapey) {
  fill(randomColorFallingShape)
  circle (fallingShapex,fallingShapey,10)
}
