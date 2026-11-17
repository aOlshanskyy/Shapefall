import { Application } from 'pixi.js';
import GameWindow from './GameWindow.js';

const stage = document.querySelector('#stage');

const app = new Application();
await app.init({
  width: 600,
  height: 400,
  background: '#1e2430',
  antialias: true,
});

stage.appendChild(app.canvas);
app.stage.position.set(600 / 2, 400 / 2);
const game = new GameWindow();
app.stage.addChild(game);
app.ticker.add(() => {
    game.tick(app.ticker.deltaMS);
});
