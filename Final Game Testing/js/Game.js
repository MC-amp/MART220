var pinModel;
var ball;
var pins = [];
var displacedPins = 0;
var currentRound = 1;
var gravity;
var curveStrength = 0;
var maxCurve = 0.2;
var cubes = [];
var cubeSize = 40;
var hitCube = false;

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

  generateCubes();
}

function draw() {
  background(200);
  camera(0, -400, 1200, 0, 0, 0, 0, 1, 0);

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

  if (ball.pos.z <= -600 && !hitCube) {
    currentRound++;
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
  text('Round: ' + currentRound, 450, 30);
  pop();

  push();
  translate(ball.pos.x, ball.pos.y, ball.pos.z);
  rotateX(ball.rotation.x);
  rotateZ(ball.rotation.z);
  fill(255, 0, 0);
  sphere(ball.radius);
  pop();

  for (let cube of cubes) {
    push();
    translate(cube.pos.x, cube.pos.y, cube.pos.z);
    fill(0, 0, 255);
    box(cubeSize);
    pop();

    let d = dist(ball.pos.x, ball.pos.y, ball.pos.z, cube.pos.x, cube.pos.y, cube.pos.z);
    if (d < ball.radius + cubeSize / 2 && !hitCube) {
      hitCube = true;
      ball.velocity.set(0, 0, 0);
      ball.aiming = true;
      ball.pos.set(-15, -40, 500);
      currentRound++;
      resetPins();
    }
  }

  for (let pin of pins) {
    let d = p5.Vector.dist(ball.pos, pin.pos);
    if (d < ball.radius + pin.radius && !hitCube) {
      let pushDir = p5.Vector.sub(pin.pos, ball.pos).normalize();
      pin.velocity.add(p5.Vector.mult(pushDir, 1.5));
      if (!pin.falling) {
        displacedPins++;
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
          displacedPins++;
          a.falling = true;
        }
        if (!b.falling) {
          displacedPins++;
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

  if (currentRound >= 11) {
    screen2();
    noLoop();
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

  generateCubes();
  hitCube = false;
}

function generateCubes() {
  cubes = [];
  let count = getCubeCountForRound(currentRound);

  let attempts = 0;
  while (cubes.length < count && attempts < 1000) {
    let candidate = createVector(random(-100, 100), -15, random(50, 400));
    let tooClose = false;

    for (let other of cubes) {
      if (p5.Vector.dist(candidate, other.pos) < 50) {
        tooClose = true;
        break;
      }
    }

    if (!tooClose) {
      cubes.push({ pos: candidate });
    }

    attempts++;
  }
}

function getCubeCountForRound(round) {
  if (round <= 2) return 1;
  else if (round <= 4) return 2;
  else if (round <= 6) return 3;
  else if (round <= 8) return 4;
  else return 5;
}

function screen2() {
  push();
  fill(random(20, 255), random(20, 255), random(20, 255));
  translate(0, 0, 550);
  rect(-1000, -1000, 10000, 10000);
  pop();
  push();
  translate(0, 0, 552);
  translate(-width / 2, -height / 2, 0);
  textFont(myFont);
  textSize(30);
  fill(0);
  text('Game Over.', 200, 30);
  text(' Final Score:' + displacedPins, 200, 60);
  pop();
}
