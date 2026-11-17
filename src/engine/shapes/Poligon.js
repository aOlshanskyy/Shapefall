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

    createBody() {
        return new PIXI.Graphics()
            .regularPoly(0, 0, 40, this.sides, -Math.PI / 2)
            .fill(this.color);
    }
}