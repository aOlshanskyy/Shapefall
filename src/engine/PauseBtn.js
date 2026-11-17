import * as PIXI from 'pixi.js';
import App from '../App.js';

export default class PauseBtn extends PIXI.Container {
    constructor() {
        super();

        this.textures = {
            play: PIXI.Texture.from('/src/assets/play.png'),
            pause: PIXI.Texture.from('/src/assets/pause.png')
        }

        this.view = this.addChild(new PIXI.Sprite(this.textures.play))
        this.view.anchor.set(0.5);

        this.view.eventMode = 'dynamic';
        this.view.on("pointerdown", this.handleClick, this);

        this.updateView();
    }

    handleClick(e) {
        if (!e.isPrimary) return;
        e.stopPropagation();
        App.pause = !App.pause;
        this.updateView();
    }

    updateView(){
        if(App.pause) this.view.texture = this.textures.play;
        else this.view.texture = this.textures.pause;
    }
}