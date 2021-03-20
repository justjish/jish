
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const isEven = (x: number) => (x % 2 === 0 ? true : false);
export const shifty = (x: number) => (isEven(x) ? 125 + Math.random() * 100 : -100 + Math.random() * -100);