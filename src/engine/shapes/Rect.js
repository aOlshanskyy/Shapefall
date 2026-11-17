import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Rect extends Shapes{
    constructor(){
        super();
        this._w = 60;
        this._h = 60;
    }

    getScaleRange() {
        return { min: 0.5, max: 1 };
    }

    createBody(){
        return new PIXI.Graphics().rect(-30, -30, 60, 60).fill(this.color);
    }
}