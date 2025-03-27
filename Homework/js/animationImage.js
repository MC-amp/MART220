class animationImage {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.currentAnimation;
        this.createAnimation();
        this.direction = "";
    }

    getX() {
        return this.x;
    }

    setX(x) {
        this.x = x;
    }

    setCurrentFrameCount(currentFrameCount) {

        this.currentFrameCount = currentFrameCount;
    }

    createAnimation() {
        this.currentAnimation = createSprite(this.x, this.y);
    }

    loadAnimation(animationType, fileNames) {


        this.currentAnimation.addAnimation(animationType, fileNames[0], fileNames[fileNames.length - 1]);
        // set the hit box
        this.currentAnimation.width = 300;
        this.currentAnimation.height = 150;

    }


    drawAnimation(animationType) {
        
        this.currentAnimation.frameDelay = 5;
        this.currentAnimation.scale = .5;
        this.currentAnimation.changeAnimation(animationType);
        if (animationType == 'walk' && this.direction == 'forward') {
            this.currentAnimation.direction = 0;
            this.currentAnimation.mirror.x = false;
            this.currentAnimation.speed = 1;

        }
        else if (animationType == 'walk' && this.direction == 'reverse') {

            this.currentAnimation.mirror.x = true;
            this.currentAnimation.direction = 180;
            this.currentAnimation.speed = 1;

        }
        else {
            this.currentAnimation.velocity.x = 0;
        }


    }

    incrementIndex() {

        if (this.currentFrameCount % 5 == 0) {
            this.i++;
        }

        if (this.i >= this.fileNames.length) {
            this.i = 0;
        }
    }

    updatePosition(direction) {
        this.direction = direction;
       
    }

    isColliding(myImage) {
        return this.currentAnimation.collide(myImage);
    }

}