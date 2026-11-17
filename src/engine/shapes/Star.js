import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Star extends Shapes {
    constructor() {
        super();
    }

    createBody() {
        return new PIXI.Graphics().star(0, 0, 5, 40, 20, 0).fill(this.color);
    }

    getScaleRange() {
        return { min: 0.6, max: 1 };
    }
}