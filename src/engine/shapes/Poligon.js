import Shapes from "../Shapes.js";
import * as PIXI from 'pixi.js';

export default class Poligon extends Shapes {
    constructor(sides) {
        super(sides);
        this.rotation = Math.random() * Math.PI * 2;
    }

    getScaleRange() {
        return { min: 0.5, max: 1 };
    }

    getArea() {
        const scale = this.body.scale.x;
        const radius = 40;
        return (this.sides / 2) * radius * radius * Math.sin((2 * Math.PI) / this.sides) * scale * scale;
    }

    createBody() {
        return new PIXI.Graphics()
            .regularPoly(0, 0, 40, this.sides, -Math.PI / 2)
            .fill(this.color);
    }
}