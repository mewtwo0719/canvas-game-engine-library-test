export interface EngineOptions {
  canvasId: string;
}

export class Engine {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;

  private running = false;
  private lastTime = 0;

  constructor(options: EngineOptions) {
    const canvas = document.getElementById(options.canvasId);

    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error(
        `Engine: element with id "${options.canvasId}" is not a <canvas>`
      );
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Engine: failed to get 2D rendering context");
    }

    this.canvas = canvas;
    this.ctx = ctx;

    console.log("[engine] canvas resolved:", canvas);
    console.log("[engine] context resolved:", ctx);
  }

  start() {
    if (this.running) return;
    this.running = true;
    requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
  }

  private loop = (time: number) => {
    if (!this.running) return;

    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  };

  protected update(_dt: number) {}
  protected render() {}
}
