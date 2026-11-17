import * as PIXI from 'pixi.js';
import {getRandomFromArray, getRandomInt, randomRangeFloat} from '../core/Helpers.js'
import Screen from '../core/Screen.js';

class Shapes extends PIXI.Sprite{

    static GRAVITY = 400;

    constructor(sides){
        super();

        this.sides = sides;
        this.velocity = 0;
        this.colors = [0xff0000, 0x27CFF5, 0x8E27F5, 0xF527CF, 0x05A659, 0xABED37]
        this.body = this.addChild(this.createBody());
        this.body.scale.set(this.shapeScaleValue)
    }

    get color(){
        return getRandomFromArray(this.colors);
    }

    get shapeScaleValue(){
        const range = this.getScaleRange();
        return randomRangeFloat(range.min, range.max);
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
        const width = getRandomInt(20, 80);
        const height = getRandomInt(20, 80);
        return new PIXI.Graphics().rect(-width/2, -height/2, width, height).fill(this.color);
    }

    tick(delta){
        const dt = delta / 1000;
        this.velocity += Shapes.GRAVITY * dt;
        this.y += this.velocity * dt;
    }
}

export default Shapes;