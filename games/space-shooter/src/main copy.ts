import { Engine } from "@engine/core"; // adjust if your engine path is different

// Create a simple engine instance and link it to the canvas
const engine = new Engine({
  canvasId: "game", // make sure your index.html has <canvas id="game">
});

// Example: override update/render if needed
class MyGameEngine extends Engine {
  protected update(dt: number) {
    console.log("Game updating… dt:", dt);
  }

  protected render() {
    const ctx = this.ctx;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // example: draw a moving rectangle
    ctx.fillStyle = "#0f0";
    ctx.fillRect(Math.sin(Date.now() / 500) * 50 + 100, 100, 50, 50);
  }
}

// Replace engine with our game engine
const game = new MyGameEngine({ canvasId: "game" });
game.start();

// Hot Module Replacement support
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("[main.ts] module hot reloaded");
  });
}
