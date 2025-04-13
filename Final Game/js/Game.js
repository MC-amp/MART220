var pinModel;
var ball;
var pins = [];

function preload() {
  pinModel = loadModel('objects/Pin.obj');
}

function setup() {
  createCanvas(600, 1000, WEBGL);

  ball = {
    pos: createVector(-15, 0, 500),
    radius: 40,
    velocity: createVector(0, 0, 0),
    rotation: createVector(0, 0, 0),
    rotationSpeed: createVector(0, 0, 0),
    aiming: true,
    aimAngle: 0
  };

  var positions = [
    [0, 0, 0], [2, 0, 0], [-2, 0, 0], [4, 0, 0],
    [1, 0, 2], [-1, 0, 2], [3, 0, 2],
    [2, 0, 4], [0, 0, 4],
    [1, 0, 6]
  ];

  for (let p of positions) {
    let pos = createVector(p[0] * 25, 0, p[2] * 25);
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
  orbitControl();

  if (ball.aiming) {
    ball.aimAngle += 0.05;
    ball.pos.x = 150 * sin(ball.aimAngle);
  } else {
    ball.pos.add(ball.velocity);
  }
  
  if (!ball.aiming && ball.velocity.mag() > 0.1) {
    ball.rotation.add(ball.rotationSpeed);
  }
  
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
      pin.falling = true;
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

        a.falling = true;
        b.falling = true;
      }
    }
  }

  for (let pin of pins) {
    pin.pos.add(pin.velocity);
    pin.velocity.mult(0.95);

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
  if (key === ' ' && ball.aiming) {
    ball.velocity = createVector(0, 0, -5);
    ball.rotationSpeed = createVector(0.3, 0, 0.1);
    ball.aiming = false;
  }
}