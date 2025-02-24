var animation = [];
var i = 0;
var myIdle;
function preload(){
    for(var i = 0; i< 10; i++){
        myIdle = new idleAnimation("../images/Idle__00" + i + ".png");  
        animation.push(myIdle);
    }
    }
function setup(){
    createCanvas(800, 800);
    setInterval(updateIndexIdle, 50);
}
function draw(){
    background(240);
    animation[i].draw();
}
function updateIndexIdle(){
    i+=1;
    if(i > 9){
        i = 0;
    }
    
}