class Sphere extends threeDShape{

    constructor(x, y, speedX, speedY, radius)
    {
        super(x,y, speedX, speedY);
        this.radius = radius;

    }

    draw()
    {
        push();
        super.moveShape();
        sphere(this.radius);
        pop();
    }
}