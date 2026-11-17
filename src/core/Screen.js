import { EventEmitter } from 'pixi.js';

const events = new EventEmitter();

export default class Screen {
    static designWidth = 960;
    static designHeight = 960;

    static windowWidth = 0;
    static windowHeight = 0;
    static width = 0;
    static height = 0;
    static scale = 1;
    static orientation = 'landscape';

    static left = 0;
    static right = 0;
    static top = 0;
    static bottom = 0;

    static setDesignSize(width, height) {
        this.designWidth = width;
        this.designHeight = height;
    }

    static update(windowWidth = window.innerWidth, windowHeight = window.innerHeight) {
        if (windowWidth === this.windowWidth && windowHeight === this.windowHeight) return;

        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
        if (this.orientation === 'landscape') {
            this.width = 600;
            this.height = 400;
        } else {
            this.width = 600;
            this.height = 400;
        }
        const margin = this.orientation === 'portrait' ? 16 : 16;
        const availableWidth = windowWidth - margin * 2;
        this.scale = this.width <= availableWidth ? 1 : availableWidth / this.width;
        this.viewWidth = Math.floor(this.width * this.scale);
        this.viewHeight = Math.floor(this.height * this.scale);
        this.left = -this.width / 2;
        this.right = this.width / 2;
        this.top = -this.height / 2;
        this.bottom = this.height / 2;

        events.emit('resize');
    }

    static on(event, handler, context) {
        events.on(event, handler, context);
    }

    static off(event, handler, context) {
        events.off(event, handler, context);
    }
}