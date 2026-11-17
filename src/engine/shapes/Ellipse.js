import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';
export default class Ellipse extends Shapes {
    constructor() {
        super();
    }
    createBody() {
        return new PIXI.Graphics().ellipse(0, 0, 50, 30).fill(this.color);
    }
    getArea() {
        const scale = this.body.scale.x;
        return Math.PI * 50 * 30 * scale * scale;
    }
    getScaleRange() {
        return { min: 0.6, max: 1 };
    }
}