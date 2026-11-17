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
        this.addListenerShape(shape);
        this.addChild(shape);
        this.pool.push(shape);
    }

    addListenerShape(shape) {
        shape.eventMode = 'dynamic';
        shape.once('pointerdown', this.handleClickShape, this);
    }

    removeListenerShape(shape) {
        shape.off('pointerdown', this.handleClickShape, this);
    }

    handleClickShape(e) {
        if (!e.isPrimary) return;
        e.stopPropagation();
        const shape = e.currentTarget;
        const index = this.pool.indexOf(shape);
        if (index !== -1) this.removeShape(shape, index);
    }

    removeShape(shape, i) {
        this.pool.splice(i, 1);
        // this.removeChild(shape);
        shape.destroy({ children: true });
    }

    countOnScene() {
        let count = 0;
        let area = 0;
        for (const shape of this.pool) {
            const bounds = shape.getLocalBounds();
            const top = shape.y + bounds.minY;
            const bottom = shape.y + bounds.maxY;
            const left = shape.x + bounds.minX;
            const right = shape.x + bounds.maxX;
            const enters = bottom > Screen.top && top < Screen.bottom
                && right > Screen.left && left < Screen.right;
            if (enters) {
                count++;
                area += shape.getArea();
            }
        }
        return { count: count, area: area };
    }

    updateHud() {
        const { count, area } = this.countOnScene();
        document.querySelector('#shape-count').textContent =
            `Shapes: ${count}`;

        document.querySelector('#shape-area').textContent =
            `Area: ${area.toFixed(2)}`;
    }

    changeRate(value) {
        const perSecond = Math.max(1, Math.round(1000 / this.delay) + value);
        this.delay = 1000 / perSecond;
        document.querySelector('#rate-value').textContent = `${perSecond} / s`;
    }

    changeGravity(value) {
        Shapes.GRAVITY = Math.max(0, Shapes.GRAVITY + value);
        document.querySelector('#gravity-value').textContent = String(Shapes.GRAVITY);
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

            if (shape.isBellow()) {
                this.removeListenerShape(shape);
                this.removeShape(shape, i);
            }
        }

        this.updateHud();
        // this.pool.forEach(e => e.tick(delta));
    }

    onResize() {

    }
}

export default GameWindow;