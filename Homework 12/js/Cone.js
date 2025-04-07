class Cone extends threeDShape{

    constructor(x, y, speedX, speedY, radius, height)
    {
        super(x,y, speedX, speedY);
        this.radius = radius;
        this.height = height;

    }

    draw()
    {
        push();
        super.moveShape();
        cone(this.radius, this.height);
        pop();
    }
}