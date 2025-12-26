import { Camera, CameraBounds } from "./Camera";

export abstract class Scene {
  readonly camera: Camera;
  readonly world: CameraBounds;

  constructor(viewportWidth: number, viewportHeight: number) {
    this.camera = new Camera(viewportWidth, viewportHeight);
    this.world = {};

    // Camera needs to know world limits (if any)
    this.camera.setBounds(this.world);
  }

  abstract update(dt: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
