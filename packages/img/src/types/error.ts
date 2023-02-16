export class ImageError extends Error {
  errorCode: number;

  constructor(message: string, errorCode?: number) {
    super(message);
    Object.setPrototypeOf(this, ImageError.prototype);

    this.errorCode = errorCode || 500;
  }

  override toString() {
    return this.message;
  }
}

export class UnsupportedImageError extends ImageError {
  constructor(message: string) {
    super(message, 415);
    Object.setPrototypeOf(this, UnsupportedImageError.prototype);
  }
}
