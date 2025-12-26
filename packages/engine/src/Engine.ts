import { ImageLoader } from "./helpers/ImageLoader";

interface EngineConfig {
  canvasId: string;
}

export class Engine {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly images = new ImageLoader();

  private lastTime = 0;
  private running = false;
  private fps = 0;
  private debugEl: HTMLElement | null;

  // Loading progress
  private loadingProgress = 0;
  private totalAssets = 0;

  constructor(config: EngineConfig) {
    this.canvas = document.getElementById(config.canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;

    this.canvas.width = 800;
    this.canvas.height = 600;

    this.debugEl = document.getElementById("debug");
  }

  async start() {
    await this.preloadWithLoading();
    this.running = true;
    requestAnimationFrame(this.loop);
  }

  // Preload with loading screen
  private async preloadWithLoading() {
    // Define assets to load
    const assets = {
      ship: "/ship.png",
      another:
        "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fi.redd.it%2F1dnszcydmj2c1.png&sp=1766710871T4fc52edd13f4d0c0b0cf51a36381b9b6a546b81a9d07c50b36a1e75c56e14888",
      oneMOre:
        "https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.e7LaaiOcJSwKGvjRpLjO2gHaEA%3Fpid%3DApi&sp=1766710871T236f6f24c06cd6a11840f1a298385128515a2a6a1405d9f15d995779e2ca8f2d",
      // add more assets here
    };
    this.totalAssets = Object.keys(assets).length;

    const assetPromises = Object.entries(assets).map(([key, src], index) => {
      return this.images.load(key, src).then(() => {
        this.loadingProgress = index + 1;
        this.renderLoadingScreen();
      });
    });

    // Wait for all assets
    await Promise.all(assetPromises);
  }

  private renderLoadingScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    this.ctx.fillStyle = "#222";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Loading bar
    const barWidth = 400;
    const barHeight = 30;
    const progressWidth = (this.loadingProgress / this.totalAssets) * barWidth;

    this.ctx.fillStyle = "#555";
    this.ctx.fillRect(
      (this.canvas.width - barWidth) / 2,
      (this.canvas.height - barHeight) / 2,
      barWidth,
      barHeight
    );

    this.ctx.fillStyle = "#0f0";
    this.ctx.fillRect(
      (this.canvas.width - barWidth) / 2,
      (this.canvas.height - barHeight) / 2,
      progressWidth,
      barHeight
    );

    // Loading text
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "20px monospace";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      `Loading ${this.loadingProgress} / ${this.totalAssets}`,
      this.canvas.width / 2,
      (this.canvas.height - barHeight) / 2 - 10
    );
  }

  private loop = (time: number) => {
    if (!this.running) return;

    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;

    this.fps = Math.round(1 / dt); // FPS
    this.updateDebug(dt);
    this.update(dt);
    this.render();

    requestAnimationFrame(this.loop);
  };

  private updateDebug(delta: number) {
    if (!this.debugEl) return;

    this.debugEl.innerText = `
FPS: ${this.fps}
Delta: ${(delta * 1000).toFixed(2)} ms
Canvas: ${this.canvas.width} x ${this.canvas.height}
`;
  }

  private update(_dt: number) {
    // game logic here
  }

  private render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw the ship at a fixed position
    const ship = this.images.get("ship");
    this.ctx.drawImage(ship, 200, 200, 200, 200);
  }
}
