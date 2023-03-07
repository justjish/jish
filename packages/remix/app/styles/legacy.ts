import { clsx } from 'clsx';
export const section = 'box-border h-screen flex overflow-hidden items-center justify-center flex-col p-5';
export const box =
  'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border rounded-2xl border-solid border-[rgba(255,255,255,0.18)] py-2 px-4 text-center';

export const h1 = 'font-extrabold not-italic text-[4rem] leading-[0.7] text-[rgba(253,223,70,1)] font-acier';
export const h2 = 'not-italic text-[1.25rem] whitespace-nowrap text-[rgba(8,9,69,1)] font-vag';
export const h3 = 'font-extrabold not-italic uppercase text-[1.35rem] text-[rgba(136,200,255,1)] font-omnium';
export const h4 = 'font-bold not-italic font-sauna';
export const h3Inline = 'font-extrabold not-italic uppercase text-[2em] text-[yellow] inline font-omnium';
export const row = 'w-full flex flex-wrap justify-center items-center transition duration-75 ease-in-out ';
export const grid = clsx(box, 'grid grid-cols-[0.2fr_0.8fr] gap-[0.4rem]');
export const flex = clsx(box, 'flex');
export const menuItem =
  'bg-[rgba(255,255,255,0.25)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[5px] border flex flex-col justify-center items-center text-center h-12 w-12 touch-none select-none m-auto rounded-2xl border-solid border-[rgba(255,255,255,0.18)]';
