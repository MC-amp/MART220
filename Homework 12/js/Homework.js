var shape1, shape2, shape3;
var shapes = [];
var currentNumber = 0;
function setup()
{
    myFont=loadFont('fonts/Roboto-Italic-VariableFont_wdth,wght.ttf');
    fireTexture = loadImage('textures/fire2.jpg');
    metalTexture = loadImage('textures/metalbackground1.png');
    createCanvas(800,800, WEBGL);
    shape1 = new Box(random(-300,-100),random(-300,-100), .02, .05, 50, 25);
    shape2 = new Torus(random(-100,100),random(-100,100), .01, .1, 30, 20);
    shape3 = new Torus(random(100,300),random(100,300), .08, .2, 80, 40);
    shape4 = new Sphere(random(-300,-100),random(100,300), .2, .3, 80);
    shape5 = new Cone(random(100,300),random(-100,-300), .1, .5, 60, 60);
    
    shapes[0] = shape1;
    shapes[1] = shape2;
    shapes[2] = shape3;
    shapes[3] = shape4;
    shapes[4] = shape5;

}

function draw()
{
    background(120);
    textFont(myFont);
    textSize(24);
    text("Basic Moving Shapes 3D", -350, -350);
    text("Matthew ", 300, 300); 
    texture(fireTexture);
    shapes[4].draw();
    shapes[3].draw();
    shapes[2].draw();
    texture(metalTexture);
    shapes[1].draw();
    shapes[0].draw();
    
       
}
