// default: is mobile first;
// 600 is tablet
// 1000 is laptop
// 1500 is desktop
const supportedSizes = ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'] as const;

export type SupportedSizes = (typeof supportedSizes)[number];

// module.exports = {
//   theme: {
//     screens: {
//       'sm': '640px',
//       // => @media (min-width: 640px) { ... }

//       'md': '768px',
//       // => @media (min-width: 768px) { ... }

//       'lg': '1024px',
//       // => @media (min-width: 1024px) { ... }

//       'xl': '1280px',
//       // => @media (min-width: 1280px) { ... }

//       '2xl': '1536px',
//       // => @media (min-width: 1536px) { ... }
//     }
//   }
// }
export default supportedSizes;
