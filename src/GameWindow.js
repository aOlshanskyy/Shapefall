import * as PIXI from 'pixi.js';
import Screen from './core/Screen.js';
import { getRandomFromArray, getRandomInt } from './core/Helpers.js';
import Circle from './engine/shapes/Circle.js';
import Rect from './engine/shapes/Rect.js';
import Shapes from './engine/Shapes.js';
import Star from './engine/shapes/Star.js';
import Poligon from './engine/shapes/Poligon.js';

class GameWindow extends PIXI.Container {
    constructor() {
        super();

        this.pool = [];
        this.timer = 0;
        this.delay = 1000;
    }

    getShapeType() {
        const types = [Circle, Rect, Shapes, Star, Poligon, Poligon];
        return getRandomFromArray(types);
    }

    addShape(x = null, y = null) {
        const ShapeType = this.getShapeType();
        const shape = ShapeType === Poligon
            ? new Poligon(getRandomFromArray([3, 5, 6]))
            : new ShapeType();
        if (x === null) x = getRandomInt(Screen.left, Screen.right)
        if (y === null) y = Screen.top - shape.getBounds().height / 2;
        shape.position.set(x, y);
        this.addChild(shape);
        this.pool.push(shape);
    }

    removeShape(shape, i) {
        this.pool.splice(i, 1);
        // this.removeChild(shape);
        shape.destroy({ children: true });
    }

    tick(delta) {
        this.timer += delta;
        if (this.timer >= this.delay) {
            this.addShape();
            this.timer = 0;
        }

        for (let i = this.pool.length - 1; i >= 0; i--) {
            const shape = this.pool[i];
            shape.tick(delta);

            if (shape.isBellow()) this.removeShape(shape, i);
        }
        // this.pool.forEach(e => e.tick(delta));
    }

    onResize() {

    }
}

export default GameWindow;