export type ResponsiveSize = {
  size: {
    width: number;
    height?: number;
  };
  maxWidth?: number;
  minWidth?: number;
};

/** RGBA hex values 0...255 */
export type Color = [number, number, number, number];
