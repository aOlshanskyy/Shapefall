import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Circle extends Shapes{
    constructor(){
        super();
    }

    createBody(){
        return new PIXI.Graphics().circle(0, 0, 50).fill(0xff0000);
    }
}