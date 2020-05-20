import { BubbleProp } from './types';


class Bubble implements BubbleProp {

    constructor(color: string, ySpeed: number, whichCtx: CanvasRenderingContext2D) {
        this.whichCtx = whichCtx;
        this.ySpeed = ySpeed;
        this.color = color;
        this.vy = ((Math.random() * 0.0002) + 0.001) + ySpeed;
        this.vx = (Math.random() * 4) - 2;
    }
    public whichCtx: CanvasRenderingContext2D;
    public ySpeed: number;
    public color: string;
    public radius = (Math.random() * 150) + 20;
    public life = true;
    // position [x, y]
    public x = Math.random() * innerWidth;
    public y = (Math.random() * 20) + innerHeight + this.radius;
    // velociy [x, y] axis
    public vy: number;
    public vx: number;
    // velocity of radius
    public vr = 0;

    update() {
        this.vy += 0.00001;
        this.vr += 0.02;
        this.y -= this.vy;
        this.x += this.vx;
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }

    draw() {
        this.whichCtx.beginPath();
        this.whichCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.whichCtx.fillStyle = this.color;
        this.whichCtx.fill();
    }
}

export { Bubble };