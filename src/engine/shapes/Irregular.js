import Shapes from '../Shapes.js';
import * as PIXI from 'pixi.js';

export default class Irregular extends Shapes {
    createBody() {
        const count = 5 + Math.floor(Math.random() * 4);
        this.points = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 20 + Math.random() * 25;
            this.points.push({
                angle,
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
            });
        }

        this.points.sort((a, b) => a.angle - b.angle);

        return new PIXI.Graphics().poly(this.points).fill(this.color);
    }

    getArea() {
        const scale = this.body.scale.x;
        let sum = 0;

        for (let i = 0; i < this.points.length; i++) {
            const a = this.points[i];
            const b = this.points[(i + 1) % this.points.length];
            sum += a.x * b.y - b.x * a.y;
        }

        return Math.abs(sum) / 2 * scale * scale;
    }

    getScaleRange() {
        return { min: 0.6, max: 1 };
    }
}