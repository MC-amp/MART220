class obstacles
{
    constructor(x,y,)
    {
        this.x = x;
        this.y = y;
        this.obstacle = new Sprite(x, y, 100);
        this.obstacle.collider = STATIC;
    }
    draw()
    {
        this.obstacle.color = "yellow"
        this.obstacle.position = createVector(this.x, this.y); 
        this.obstacle.draw();
}
}