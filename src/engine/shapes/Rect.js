import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Rect extends Shapes{
    constructor(){
        super();
    }

    createBody(){
        return new PIXI.Graphics().rect(-50, -50, 100, 100).fill(0xff0000);
    }
}