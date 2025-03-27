
var idlePaths = [];
var myAnimation;
var myWalkAnimation;
var walkPaths = [];
var catImage;

function preload() {
   idlePaths = loadStrings("./images/idle/idle.txt");
   walkPaths = loadStrings("./images/walk/walk.txt");
   
}

function setup() {
  createCanvas(800,600);
  myAnimation = new animationImage( 200, 200, 150, 150);
  myAnimation.loadAnimation('idle', idlePaths);
  myAnimation.loadAnimation('walk', walkPaths);

  catImage = createSprite(450, 200,100,100, 'static');
  catImage.img = "./images/cat.jpg";
  catImage.scale = 0.05;
  catImage.diameter = 150;

}

function draw() 
{

    background(120);
    
    if(kb.pressing('d'))
    {
        myAnimation.updatePosition('forward');
        myAnimation.drawAnimation('walk');    
        if(myAnimation.isColliding(catImage))
        {
            myAnimation.drawAnimation('idle');
            myAnimation.updatePosition('idle');
            
        }     
    }
    else if(kb.pressing('a'))
    {
        myAnimation.updatePosition('reverse');
        myAnimation.drawAnimation('walk');        
    }
    else
    {
        myAnimation.drawAnimation('idle');
    } 

    catImage.debug = mouseIsPressed;

}

