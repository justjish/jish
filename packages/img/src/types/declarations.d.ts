declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

declare module "get-rgba-palette" {
  const getPalette: (
    image: Uint8Array,
    count?: number,
    quality?: number
  ) => [number, number, number][];

  export default getPalette;
}

declare module global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }

