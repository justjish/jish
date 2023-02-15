import type { FC } from 'react';
import { a, SpringValue } from '@react-spring/web';
// import { Image, MimeType } from 'vendor/remix-image/packages/remix-image';
import fullBodyPng from '~/assets/pictures/fullbody.png';

// const AnimatedImage = a(Image);

export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
  return (
    <a.img
      className={'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]'}
      // srcSet={`${fbSDWebp} .5x, ${fbHQPng} 1.5x, ${fbSDPng} .5x`}
      src={fullBodyPng}
      alt="sujish patel"
      style={{ opacity, x }}
    />
  );
};

// export const HelloProfile: FC<{ opacity: SpringValue<number>; x: SpringValue<number> }> = ({ opacity, x }) => {
//   return (
//     <AnimatedImage
//       // className={'object-scale-down w-[120vw] sm:w-[90vw] lg:w-[50vw] 2xl:w-[40vw]'}
//       loaderUrl={'/api/image'}
//       options={{ contentType: MimeType.AVIF ,fit: 'inside', position: 'center'}}
//       responsive={[
//         {
//           size: {
//             width: 640,
//           },
//           maxWidth: 200,
//         },
//         {
//           size: {
//             width: 768,
//           },
//           maxWidth: 768,
//         },
//         {
//           size: {
//             width: 1024,
//           },
//           maxWidth: 1024,
//         },
//         {
//           size: {
//             width: 1280,
//           },
//           maxWidth: 1280,
//         },
//         {
//           size: {
//             width: 1536,
//           },
//           maxWidth: 1536,
//         },
//       ]}
//       src={fullBodyPng}
//       alt="sujish patel"
//       style={{ opacity, x }}
//     />
//   );
// };
