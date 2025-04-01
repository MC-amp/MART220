var i = 0;
var x = 100;
var y = 100;
var currentAnimation
var foodArray = [];
var obstacleArray=[];
var particles = [];
var myBackgroundSound
var myGoodSound 
var myBadSound 
var score = 0;
var health = 5;
var countDown = 60;
var countDownInterval;
function preload() {

    soundFormats('mp3', 'ogg', 'wav');
    myBackgroundSound = loadSound('../sounds/backgroundsound.wav');
    myGoodSound = loadSound('../sounds/bellding.wav');
    myBadSound = loadSound('../sounds/buzzer.wav');
    idleStrings = loadStrings("../files/idle.txt");
    runStrings = loadStrings("../files/run.txt");
    attackStrings = loadStrings("../files/attack.txt");
}

function setup() {
    let myCanvas = createCanvas(800, 800);
    myAnimation = new character(200, 200);
    myAnimation.loadAnimation('idle', idleStrings);
    myAnimation.loadAnimation('run', runStrings);
    myAnimation.loadAnimation('attack', attackStrings);
    countDownInterval = setInterval(updateCountDown, 1000);
    setInterval(replayAnimation, 2000);
    for (let i = 0; i < 40; i++) {

        if (floor(random(0, 2)) == 0) {
            myFood = new food(random(300, 700), random(100, 600), false);

        }
        else {
            myFood = new food(random(300, 700), random(100, 600), true);

        }

        foodArray.push(myFood);
    }
    for (let i = 0; i < 5; i++) {
        myObstacle = new obstacles(random(300, 600), random(300, 600));
        obstacleArray.push(myObstacle);
}
}
function draw() {

    background(120);

    stroke(0);
    strokeWeight(1);

    displayFood();

    moveCharacter();

    displayScore();

    displayCountDown();

    displayAnimation();
    if (score > 9 && health > 0) {
        noLoop();
        textSize(50);
        fill(0, 255, 0);
        textAlign(CENTER, CENTER);
        text("You Win!", width / 2, height / 2);
    }

    else if (health <= 0) {
        noLoop();
        textSize(50);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        text("Game Over!", width / 2, height / 2);
    }
}

function displayAnimation() {
    noFill();
    stroke(0, 0, 100);
    strokeWeight(1);
    animS.circle('c1', 60, 480, 120, 120, 100);
}
function moveCharacter() {
    myAnimation.draw('idle');
    myAnimation.updatePosition('idle');

    if (kb.pressing('d')) {
        myAnimation.updatePosition('forward');
        myAnimation.draw('run');
    } else if (kb.pressing('a')) {
        myAnimation.updatePosition('reverse');
        myAnimation.draw('run');
    } else if (kb.pressing('w')) {
        myAnimation.updatePosition('up');
        myAnimation.draw('run');
    } else if (kb.pressing('s')) {
        myAnimation.updatePosition('down');
        myAnimation.draw('run');
    } else if (kb.pressing('x')) {
        myAnimation.draw('attack');
        
        for (let i = 0; i < obstacleArray.length; i++) {
            if (myAnimation.isColliding(obstacleArray[i].obstacle)) {
                createParticles(obstacleArray[i].obstacle.position.x, obstacleArray[i].obstacle.position.y);
                obstacleArray[i].obstacle.remove();  
                obstacleArray.splice(i, 1);          
                break; 
            }
        }
    } else {
        myAnimation.draw('idle');
    }

    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw();

        if (myAnimation.isColliding(foodArray[i].foodPiece)) {
            if (foodArray[i].isGood) {
                score++;
                myGoodSound.play();
            } else {
                health--;
                myBadSound.play();
            }
            foodArray[i].foodPiece.remove();
        }
    }
}

function displayFood() {
    for (let i = 0; i < foodArray.length; i++) {
        foodArray[i].draw();
    }

}

function displayScore() {
    fill(0);
    textSize(24);
    text("Score: " + score, 50, 50);
    text("Health: " + health, 50, 110);
}

function updateIndex() {
}
function playBackgroundSound() {
    if (kb.pressing('e')) {
    myBackgroundSound.play();
    }
}
function updateCountDown() {
    countDown--;
    if (countDown == 0) {
        clearInterval(countDownInterval);
    }
}
function displayCountDown() {
    textSize(24);
    text("Time left: " + countDown, width - 200, 50);
}
function replayAnimation() {
    animS.reset();
}
function createParticles(x,y)
{
for (let i = 0; i < 5; i++) {
    let p = new particle(x,y);
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}