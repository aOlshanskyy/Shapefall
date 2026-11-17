# Shapefall

Falling shapes on a PixiJS canvas. Shapes spawn above the scene, fall under gravity, and are removed after they leave the bottom edge.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Controls

- Click an empty spot to spawn a shape.
- Click a shape to remove it.
- `+` / `−` next to the rate change how many shapes appear per second.
- `+` / `−` next to the gravity value change how fast shapes fall.
- The button in the corner pauses and resumes the scene.

The labels above the canvas show how many shapes are inside the scene and their total area in px².