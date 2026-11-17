import { Application, Assets, Rectangle } from 'pixi.js';
import GameWindow from './GameWindow.js';
import Screen from './core/Screen.js';

const stage = document.querySelector('#stage');

class App {

    static pixiApp = null;
    static gameWindow = null;

    static pause = false;

    static async init() {
        Screen.update();
        const app = new Application();
        await app.init({
            width: Screen.width,
            height: Screen.height,
            background: '#1e2430',
            antialias: true,
        });

        await Assets.load([
            '/src/assets/play.png',
            '/src/assets/pause.png',
        ]);

        stage.appendChild(app.canvas);
        stage.insertBefore(app.canvas, document.querySelector('#controls'));
        app.stage.position.set(600 / 2, 400 / 2);
        const game = new GameWindow();
        app.stage.eventMode = 'static';
        app.stage.hitArea = new Rectangle(
            -app.screen.width / 2,
            -app.screen.height / 2,
            app.screen.width,
            app.screen.height,
        );
        app.stage.on('pointerdown', (event) => {
            const point = event.getLocalPosition(game);
            game.addShape(point.x, point.y);
        });

        app.stage.addChild(game);
        app.ticker.add(() => {
            game.tick(app.ticker.deltaMS);
        });

        document.querySelector('#rate-plus').addEventListener('click', () => game.changeRate(1));
        document.querySelector('#rate-minus').addEventListener('click', () => game.changeRate(-1));
        document.querySelector('#gravity-plus').addEventListener('click', () => game.changeGravity(100));
        document.querySelector('#gravity-minus').addEventListener('click', () => game.changeGravity(-100));

        App.pixiApp = app;
        App.gameWindow = game;
        Screen.on('resize', App.onResize);
        window.addEventListener('resize', () => {
            Screen.update();
        });
        this.onResize();
    }


    static onResize() {
        const pixi = App.pixiApp;
        pixi.renderer.resize(Screen.width, Screen.height);
        pixi.canvas.style.width = Screen.width + 'px';
        pixi.canvas.style.height = Screen.height + 'px';
        pixi.stage.position.set(Screen.width / 2, Screen.height / 2);
        pixi.stage.hitArea = new Rectangle(
            Screen.left,
            Screen.top,
            Screen.width,
            Screen.height,
        );

        const controls = document.querySelector('#controls');
        controls.style.zoom = Screen.orientation === 'portrait' ? 1.7 : 1;
        controls.style.gap = Screen.orientation === 'portrait' ? '30px' : '120px';

        const hud = document.querySelector('#hud');
        hud.style.zoom = Screen.orientation === 'portrait' ? 1.7 : 1;

        stage.style.zoom = 1;
        const margin = 16;
        const availableWidth = window.innerWidth - margin * 2;
        const availableHeight = window.innerHeight - margin * 2;
        stage.style.zoom = Math.min(
            1,
            availableWidth / stage.offsetWidth,
            availableHeight / stage.offsetHeight,
        );

        App.gameWindow.onResize();
    }
}

App.init();

export default App;
