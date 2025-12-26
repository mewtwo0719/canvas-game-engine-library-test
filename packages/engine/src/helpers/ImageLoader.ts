export class ImageLoader {
  private images = new Map<string, HTMLImageElement>();

  load(name: string, src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = src;

      image.onload = () => {
        this.images.set(name, image);
        resolve(image);
      };

      image.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
    });
  }

  get(name: string): HTMLImageElement {
    const image = this.images.get(name);
    if (!image) {
      throw new Error(`Image "${name}" not loaded`);
    }
    return image;
  }
}
