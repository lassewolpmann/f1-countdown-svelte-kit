export class TimerElement {
    windowWidth: number;
    diameter: number;
    strokeWidth: number;
    radius: number;
    dashArray: number;

    constructor(windowWidth: number) {
        this.windowWidth = windowWidth;
        this.diameter = this.windowWidth < 768 ? 135 : 270;
        this.strokeWidth = this.windowWidth < 768 ? 6 : 12;
        this.radius = this.diameter / 2 - (this.strokeWidth / 2);
        this.dashArray =  2 * Math.PI * this.radius;
    }
}