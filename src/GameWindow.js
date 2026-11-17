import * as PIXI from 'pixi.js';
import Circle from '/src/engine/shapes/Circle.js';

class GameWindow extends PIXI.Container{
    constructor(){
        super();

        this.pool = [];
        this.timer = 0;
        this.delay = 2000;
    }

    addShape(){
        this.addChild(new Circle());
    }

    tick(delta){
        this.timer += delta;
        if(this.timer>=this.delay){
            this.addShape();
            this.timer = 0;
        }
    }
}

export default GameWindow;