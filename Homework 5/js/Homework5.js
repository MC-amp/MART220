var animation = [];
var foodArray =[];
var runAnimation = [];
var i = 0;
var x = 100;
var y = 100;
var myIdle;
var myFood;
var foodFound = false;
function preload(){
    for(let i = 0; i< 10; i++){
        myIdle = new idleAnimation("../images/Idle__00" + i + ".png",x,y);  
        animation.push(myIdle);
    }
    for(let i = 0; i< 5; i++){
    myFood = new food(x,y);
    foodArray.push(myFood);
    }
}
function setup(){
    createCanvas(800, 800);
    setInterval(updateIndexIdle, 50);
    for (let i = 0; i < 5; i++) {
        myFood = new food(random(100, 600), random(100, 600), 25);
        foodArray.push(myFood);
    }
}
function draw(){
    background(240);
    animation[i].draw();
    for (let i = 0; i < foodArray.length; i+=1) {
        foodArray[i].draw();
    }

    if (keyIsPressed) {
        if (key == "a") {
            x=x-1;
        }
        if (key == "d") {
            x=x+1;
        }
        if (key == "w") {
            y=y-1;
        }
        if (key == "s") {
            y=y+1;
        }
        for (let i = 0; i < 10; i+=1) {
            animation[i].x = x;
            animation[i].y = y;
        }

        for (let k = 0; k < foodArray.length; k++) {
            if (animation[i].hasCollided(foodArray[k].x, foodArray[k].y, 25, 25)) {
                foodArray.splice(k, 1);
                
            }
           
            
        }
       
    }
}
function updateIndexIdle(){
    i+=1;
    if(i > 9){
        i = 0;
    }
    
}