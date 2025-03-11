class Animations{
    constructor(path) {
        this.path = path;
        this.myImage = loadImage(this.path);
        this.x = x;
        this.y = y;
        this.imageWidth = 150;
        this.imageHeight = 200;
        this.flipX = false;
    }

    draw() {
      push();
      if (this.flipX) {
        translate(this.imageWidth, 0);
        scale(-1.0, 1.0);
        image(this.myImage, -this.x, this.y, 150, 200);
      }
      else {
        image(this.myImage, this.x, this.y, 150, 200);
      }
      pop();
    }

}