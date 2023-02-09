# Jish.Dev

_A Constantly evovling web 'About Me' page_

## Overview

I use this repo primarily to:

- Expieriment with anything web related
- Try out various 2021 _web_ technologies
- Showcase and expierment with coding styles

To see free to check out [Jish.Dev](https://jish.dev) to see the currently released app.

## Run Locally

```
git clone ...
pnpm install
pnpm dev
```

## Build

A few notes here. For build, we are doing a typescript compile because Vite uses esbuild which performs transpilation without type information.

```
pnpm build
```

## Tech Choices

- react: **component library**
  Went with React since libraries like 'react-spring' are so easy to use.

- pnpm: **package manager**
  Just an alternative to npm

- vitejs/vite: **the code bundler**
  Using their SWC for compliation and bundling because its fast 😀

- @emotion/react: **componenet styling library**
  Low level CSS-in-JS library. Keeping the styles seperate from the 'react-spring' styles is a nice benefit.

- pmndrs/react-spring: **an animation library**
  Loved how performant they were and the api is great. Chosen over framer because it's light weight.

- pmndrs/zustand: **state management library**
  Rather than wrapping React context all over the place, I just went with unopinated state manager. Use it in a flux like pattern. It keeps the code simple and readable. Also allows for the ability to subscribe to the state, which provides much needed flexibility.

- firebase: **hosting/functions/routing - the serverless server**
  Free CDN and Hosting... easy choice.

- Typescript: **the primary language**
  Once you go Typescript, its hard to go back.
