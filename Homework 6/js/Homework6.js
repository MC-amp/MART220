var idleAnimation = [];
var foodArray =[];
var runAnimation = [];
var i = 0;
var x = 100;
var y = 100;
var myAnimations;
var myFood;
var myImage
var score=0
var idleStrings = [];
var runStrings = [];
var flipX = false;
var timer=20
function preload(){
    idleStrings = loadStrings("../files/idle.txt");
    runStrings = loadStrings("../files/run.txt");
    }

function setup(){
    createCanvas(800, 800);
    setInterval(updateIndex, 50);
    setInterval(updateTimer, 1000);
    setInterval(updateFood, 10000);
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
}
function draw(){
    background(240);
    fill(0);
    textSize(10)
    text("Score "+ score,20,20);
    text("Timer "+ timer,600,20);
    
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

    if (keyIsPressed) {
        runAnimation[i].draw();
        if (key == "a") {
            flipX=true
            x=x-1;
        }
        if (key == "d") {
            flipX=false
            x=x+1;
        }
        if (key == "w") {
            y=y-1;
        }
        if (key == "s") {
            y=y+1;
        }
        for (let i = 0; i < idleStrings.length; i++) {
            
            idleAnimation[i].flipX = flipX;
            idleAnimation[i].x = x;
            idleAnimation[i].y = y;
            runAnimation[i].flipX = flipX;
            runAnimation[i].x = x;
            runAnimation[i].y = y;
        }

        for (let k = 0; k < foodArray.length; k++) {
            if (idleAnimation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
                foodArray.splice(k, 1);
                score+=1
            }
           
            
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