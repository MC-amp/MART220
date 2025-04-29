var pinModel;
var ball;
var pins = [];
var displacedPins = 0;
var whichRound = 1;
var gravity;
var curveStrength = 0;
var maxCurve = 0.2;

function preload() {
  pinModel = loadModel('objects/Pin.obj');
  myFont = loadFont('fonts/Roboto-Italic-VariableFont_wdth,wght.ttf');
}

function setup() {
  createCanvas(600, 1000, WEBGL);

  gravity = createVector(0, 0.2, 0);

  ball = {
    pos: createVector(-15, -40, 500),
    radius: 40,
    velocity: createVector(0, 0, 0),
    rotation: createVector(0, 0, 0),
    rotationSpeed: createVector(0, 0, 0),
    aiming: true,
    aimAngle: 0
  };

  var positions = [
    [0, 0, -10], [2, 0, -10], [-2, 0, -10], [4, 0, -10],
    [1, 0, -8], [-1, 0, -8], [3, 0, -8],
    [2, 0, -6], [0, 0, -6],
    [1, 0, -4]
  ];

  for (let p of positions) {
    let pos = createVector(p[0] * 25, -15, p[2] * 25);
    pins.push({
      pos: pos,
      velocity: createVector(0, 0, 0),
      falling: false,
      rotation: 0,
      fallAxis: p5.Vector.random3D(),
      radius: 15
    });
  }
}

function draw() {
  background(200);
  let camX = 0;
  let camY = -400;
  let camZ = 1200;

  camera(camX, camY, camZ,
       0, 0, 0,
       0, 1, 0);


  push();
  rotateX(HALF_PI);
  fill(150, 200, 150);
  noStroke();
  plane(600, 1000);
  pop();

  if (ball.aiming) {
    ball.aimAngle += 0.05;
    ball.pos.x = 150 * sin(ball.aimAngle);
  } else {

    ball.velocity.add(gravity);
    ball.velocity.x += curveStrength;
    ball.pos.add(ball.velocity);
  }

  if (!ball.aiming && ball.velocity.mag() > 0.1) {
    ball.rotation.add(ball.rotationSpeed);
  }

  if (ball.pos.y + ball.radius > 0) {
    ball.pos.y = -ball.radius;
    ball.velocity.y = 0;
  }

  if (ball.pos.z <= -600) {
  whichRound+=1;
    ball.velocity.set(0, 0, 0);
    ball.aiming = true;
    ball.pos.set(-15, -40, 500);
    resetPins();
  }

  push();
  translate(-width / 2, -height / 2, 0);
  textFont(myFont);
  textSize(32);
  fill(0);
  text('Score: ' + displacedPins, 20, 30);
  text('Round: ' + whichRound, 450, 30);
  pop();

  push();
  translate(ball.pos.x, ball.pos.y, ball.pos.z);
  rotateX(ball.rotation.x);
  rotateZ(ball.rotation.z);
  fill(255, 0, 0);
  sphere(ball.radius);
  pop();

  for (let pin of pins) {
    let d = p5.Vector.dist(ball.pos, pin.pos);
    if (d < ball.radius + pin.radius) {
      let pushDir = p5.Vector.sub(pin.pos, ball.pos).normalize();
      pin.velocity.add(p5.Vector.mult(pushDir, 1.5));
      if (!pin.falling) {
        displacedPins+=1;
        pin.falling = true;
      }
    }
  }

  for (let i = 0; i < pins.length; i++) {
    for (let j = i + 1; j < pins.length; j++) {
      let a = pins[i];
      let b = pins[j];
      let dist = p5.Vector.dist(a.pos, b.pos);
      if (dist < a.radius + b.radius) {
        let overlap = (a.radius + b.radius) - dist;
        let dir = p5.Vector.sub(b.pos, a.pos).normalize();
        b.pos.add(p5.Vector.mult(dir, overlap / 2));
        a.pos.sub(p5.Vector.mult(dir, overlap / 2));

        let pushVel = dir.copy().mult(0.5);
        a.velocity.sub(pushVel);
        b.velocity.add(pushVel);

        if (!a.falling) {
          displacedPins+=1;
          a.falling = true;
        }
        if (!b.falling) {
          displacedPins+=1;
          b.falling = true;
        }
      }
    }
  }

  for (let pin of pins) {
    if (pin.pos.y + pin.radius < 0.1) {
      pin.velocity.add(gravity);
    }

    pin.pos.add(pin.velocity);
    pin.velocity.mult(0.95);

    if (pin.pos.y + pin.radius > 0) {
      pin.pos.y = -pin.radius;
      pin.velocity.y = 0;
    }

    push();
    translate(pin.pos.x, pin.pos.y, pin.pos.z);

    if (pin.falling && pin.rotation < HALF_PI) {
      pin.rotation += 0.03;
    }

    rotate(pin.rotation, pin.fallAxis);
    scale(-25);
    model(pinModel);
    pop();
  }

  if (ball.velocity.mag() > 0.1) {
    ball.rotation.x += 0.2;
    ball.rotation.z += 0.05;
  }
}

function keyPressed() {
  if (key === 'w' && ball.aiming) {
    ball.velocity = createVector(0, 0, -5);
    ball.rotationSpeed = createVector(0.3, 0, 0.1);
    ball.aiming = false;
  }

  if (key === 'a' && !ball.aiming) {
    curveStrength = -maxCurve;
  } else if (key === 'd' && !ball.aiming) {
    curveStrength = maxCurve;
  }
}

function keyReleased() {
  if (key === 'a' || key === 'd') {
    curveStrength = 0;
  }
}

function resetPins() {
  
  var positions = [
    [0, 0, -10], [2, 0, -10], [-2, 0, -10], [4, 0, -10],
    [1, 0, -8], [-1, 0, -8], [3, 0, -8],
    [2, 0, -6], [0, 0, -6],
    [1, 0, -4]
  ];

  for (let i = 0; i < pins.length; i++) {
    let p = positions[i];
    pins[i].pos.set(p[0] * 25, -15, p[2] * 25);
    pins[i].velocity.set(0, 0, 0);
    pins[i].falling = false;
    pins[i].rotation = 0;
  }
}
