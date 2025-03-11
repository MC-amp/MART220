var idleAnimation = [];
var foodArray =[];
var badfoodArray =[];
var runAnimation = [];
var i = 0;
var x = 100;
var y = 100;
var myAnimations;
var myFood;
var myBadFood;
var myBackgroundSound
var myGoodSound 
var myBadSound 
var myImage
var score=0
var idleStrings = [];
var runStrings = [];
var flipX = false;
var timer=20

function preload(){
    soundFormats('mp3', 'ogg', 'wav');
    myBackgroundSound = loadSound('../sounds/backgroundsound.wav');
    myGoodSound = loadSound('../sounds/bellding.wav');
    myBadSound = loadSound('../sounds/buzzer.wav');
    idleStrings = loadStrings("../files/idle.txt");
    runStrings = loadStrings("../files/run.txt");
}
function setup(){
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
    setInterval(updateTimer, 1000);
    setInterval(updateFood, 10000);
    setInterval(updateBadFood, 10000);
    for (let i = 0; i < idleStrings.length; i++) {
        myAnimations = new Animations(idleStrings[i],x,y);  
        idleAnimation.push(myAnimations);
        myAnimations= new Animations(runStrings[i],x,y);  
        runAnimation.push(myAnimations);
    }
    for (let i = 0; i < 5; i++) {
        myFood = new food(random(100, 600), random(100, 600), 25);
        foodArray.push(myFood);
    }
    for (let i = 0; i < 5; i++) {
        myBadFood = new badfood(random(100, 600), random(100, 600), 25);
        badfoodArray.push(myBadFood);
    }
}
function draw(){
    background(240);
    fill(0);
    textSize(10)
    text("Score "+ score,20,20);
    text("Timer "+ timer,600,20);
    noFill();
    animS.circle('c1', 400, 400, 120, 120, 120);
    if(keyIsPressed){
        if (key == "e") {
        myBackgroundSound.play();
    }
}
    
    if (score>=5){
        textSize(30)
        fill(0)
        text("You Win", 300, 30)
    }
    if (timer<=0 && score<5){
        textSize(30)
        text("You Lose", 300, 30)
    }
    fill(0)
    for (let i = 0; i < foodArray.length; i+=1) {
        foodArray[i].draw();
    }
    for (let i = 0; i < badfoodArray.length; i+=1) {
        badfoodArray[i].draw();
    }
    for (let k = 0; k < foodArray.length; k++) {
        if (collideRectRect(idleAnimation[i].x, idleAnimation[i].y, idleAnimation[i].imageWidth, idleAnimation[i].imageHeight,foodArray[k].x, foodArray[k].y, 25, 25)) {
            foodArray.splice(k, 1);
            score+=1;
            myGoodSound.play();
        }    
               
    }
    for (let k = 0; k < badfoodArray.length; k++) {
        if (collideRectRect(idleAnimation[i].x, idleAnimation[i].y, idleAnimation[i].imageWidth, idleAnimation[i].imageHeight,badfoodArray[k].x, badfoodArray[k].y, 25, 25)) {
            badfoodArray.splice(k, 1);
            score-=1;
            myBadSound.play();
        }                   
    }

    if (keyIsPressed) {
        runAnimation[i].draw();        
        if (key == "a") {
            flipX=true
            x=x-2;
        }
        if (key == "d") {
            flipX=false
            x=x+2;
        }
        if (key == "w") {
            y=y-2;
        }
        if (key == "s") {
            y=y+2;
        }
        for (let i = 0; i < idleStrings.length; i++) {
            
            idleAnimation[i].flipX = flipX;
            idleAnimation[i].x = x;
            idleAnimation[i].y = y;
            runAnimation[i].flipX = flipX;
            runAnimation[i].x = x;
            runAnimation[i].y = y;
        }      
    }
    else
    {
        idleAnimation[i].draw();
    }
}
function updateIndex(){
    i+=1;
    if(i > 9){
        i = 0;
    }
    
}
function updateTimer(){
    timer-=1;
}
function updateFood(){
    foodArray.splice(foodArray, 5)
    for (let i = 0; i < 5; i++) {        
        myFood = new food(random(100, 600), random(100, 600), 25);
        foodArray.push(myFood);
    }
}
function updateBadFood(){    
    badfoodArray.splice(badfoodArray, 5)
    for (let i = 0; i < 5; i++) {        
        myBadFood = new badfood(random(100, 600), random(100, 600), 25);
        badfoodArray.push(myBadFood);        
    }
}