import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Circle extends Shapes{
    constructor(){
        super();
    }

    createBody(){
        return new PIXI.Graphics().circle(0, 0, 40).fill(this.color);
    }

    getScaleRange() {
        return { min: 0.6, max: 1 };
    }
}