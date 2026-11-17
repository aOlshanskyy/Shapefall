import * as PIXI from 'pixi.js';

class Shapes extends PIXI.Sprite{
    constructor(){
        super();

        this.body = this.addChild(this.createBody());
    }

    createBody(){
        return new PIXI.Graphics().rect(-50, -50, 100, 100).fill(0xff0000);
    }
}

export default Shapes;