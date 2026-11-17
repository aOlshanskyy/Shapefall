import * as PIXI from 'pixi.js';
import {getRandomFromArray, getRandomInt, randomRangeFloat} from '../core/Helpers.js'
import Screen from '../core/Screen.js';

class Shapes extends PIXI.Sprite{

    static GRAVITY = 400;

    constructor(sides){
        super();

        this.sides = sides;
        this._w = 0;
        this._h = 0;
        this.velocity = 0;
        this.colors = [0xff0000, 0x27CFF5, 0x8E27F5, 0xF527CF, 0x05A659, 0xABED37, 0xfbff05];
        this._color = null;
        this.body = this.addChild(this.createBody());
        this.body.scale.set(this.shapeScaleValue)
    }

    get color(){
        if(!this._color) this._color = getRandomFromArray(this.colors);
        return this._color;
    }

    get shapeScaleValue(){
        const range = this.getScaleRange();
        return randomRangeFloat(range.min, range.max);
    }

    getArea(){
        return this._w * this._h * this.body.scale.x * this.body.scale.y;
    }

    isBellow(){
        const posLimit = this.position.y - this.getBounds().height/2;
        if(posLimit > Screen.bottom) return true;
        return false;
    }

    getScaleRange() {
        return { min: 1, max: 1 };
    }

    createBody(){
        this._w = getRandomInt(20, 80);
        this._h = getRandomInt(20, 80);
        return new PIXI.Graphics().rect(-this._w/2, -this._h/2, this._w, this._h).fill(this.color);
    }

    tick(delta){
        const dt = delta / 1000;
        this.velocity += Shapes.GRAVITY * dt;
        this.y += this.velocity * dt;
    }
}

export default Shapes;