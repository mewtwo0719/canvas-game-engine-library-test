export interface CameraTarget {
  x: number;
  y: number;
}

export interface CameraBounds {
  width?: number; // undefined = infinite
  height?: number; // undefined = infinite
}

export class Camera {
  x = 0;
  y = 0;

  readonly width: number;
  readonly height: number;

  zoom = 1;

  private target?: CameraTarget;
  private bounds: CameraBounds = {};

  constructor(viewportWidth: number, viewportHeight: number) {
    this.width = viewportWidth;
    this.height = viewportHeight;
  }

  follow(target: CameraTarget) {
    this.target = target;
  }

  setBounds(bounds: CameraBounds) {
    this.bounds = bounds;
  }

  update(_dt: number) {
    if (!this.target) return;

    this.x = this.target.x;
    this.y = this.target.y;

    // Clamp camera if world bounds exist
    if (this.bounds.width !== undefined) {
      const halfW = this.width / 2;
      this.x = Math.max(halfW, Math.min(this.x, this.bounds.width - halfW));
    }

    if (this.bounds.height !== undefined) {
      const halfH = this.height / 2;
      this.y = Math.max(halfH, Math.min(this.y, this.bounds.height - halfH));
    }
  }
}
