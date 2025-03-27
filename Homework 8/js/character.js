class character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation;
    this.createAnimation();
    this.speed = 3;
    this.currentAnimation.rotationLock = true;
  }
  createAnimation() {
    this.currentAnimation = createSprite(this.x, this.y);
  }

  loadAnimation(animationType, fileNames) {
    this.currentAnimation.addAnimation(animationType, ... fileNames);
    this.currentAnimation.animation.looping = true;
    this.currentAnimation.width = 300;
    this.currentAnimation.height = 500;
  }

  draw(animationType) {
    this.currentAnimation.frameDelay = 5;
    this.currentAnimation.scale = .5;
    if (this.currentAnimation.animation !== this.currentAnimation.animations[animationType]) {
    this.currentAnimation.changeAnimation(animationType);
    }
    if (animationType == 'run' && this.direction == 'forward') {
      this.currentAnimation.direction = 0;
      this.currentAnimation.mirror.x = false;
      this.currentAnimation.speed = this.speed;
    }
    else if (animationType == 'run' && this.direction == 'reverse') {

      this.currentAnimation.mirror.x = true;
      this.currentAnimation.direction = 180;
      this.currentAnimation.speed = this.speed;

    }
    else if (animationType == 'run' && this.direction == 'down') {

      this.currentAnimation.mirror.x = false;
      this.currentAnimation.direction = -270;
      this.currentAnimation.speed = this.speed;

    }
    else if (animationType == 'run' && this.direction == 'up') {

      this.currentAnimation.mirror.x = false;
      this.currentAnimation.direction = 270;
      this.currentAnimation.speed = this.speed;

    }
    else {
      this.currentAnimation.velocity.x = 0;
      this.currentAnimation.velocity.y = 0;
    }
  }

  updatePosition(direction) {
    this.direction = direction;
  }

  isColliding(obstacleArray) {
    return this.currentAnimation.overlaps(obstacleArray);
  }
}