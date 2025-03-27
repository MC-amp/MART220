class obstacles
{
    constructor(x,y,)
    {
        this.x = x;
        this.y = y;
        this.obstacle = new Sprite(x, y, 100);
    }
    draw()
    {

        this.obstacle.color = "yellow"
    }
}