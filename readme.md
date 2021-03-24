# Jish.Dev

*A Constantly evovling web 'About Me' page*

## Overview

I use this repo primarily to:
 * Expieriment with anything web related
 * Try out various 2021 *web* technologies 
 * Showcase and expierment with coding styles

To see free to check out [Jish.Dev](https://www.jish.dev) to see the currently released app.

## Run Locally
```
git clone ...
yarn install
yarn dev
```

## Tech Choices
* facebook/react@17: component library.
  I just love their functional components + hooks implementation. Primarily chosen over vite/svelte because I wanted to explore web based animations with react-spring and design through motion. Also react@17 was chosen over react@16 because there are so many tiny performance considerations on re-renders that I do not have to worry about. 

* yarn: package manager.
  Chosen over npm because I just prefer it. However skypack+snowpack combination is something I am looking forward to see evovling.

* vitejs/vite: the code bundler.
  After testing both Snowpack and ViteJS, extensively I ended up choosing Vite since it bundles up the code. I like keeping a snowpack config around however, because ESM modules are great, and the prospect of moving away from a package manager seems exciting. Webpack and Parcel are great tools as well, but wanted to try the newer communities. I also noticed that my computer fans don't ramp up as much when using snowpack. 

* @emotion/react: componenet styling library. 
  This evolved from styled-components -> @emotion/styled -> @emotion/react because the css prop helped to keep inline style adjustments seperated from react-spring which I use for animations.

* pmndrs/react-spring: an animation library. 
  Loved how performant they were and the api is great. Chosen over framer because it's light weight. 

* pmndrs/zustand: state management library. 
  Rather than wrapping React context all over the place, I just went with unopinated state manager. Use it in a flux like pattern. It keeps the code simple and readable. Also allows for the ability to subscribe to the state, which provides much needed flexibility.

* firebase: hosting/functions/routing - the serverless server
  It's simple to get up and running and wanted to keep the code serverless. I generally prefer GCP over Azure or AWS because I just like that it all rests on Kubernetes and the products are well thought out from a developer expierence mindset. Plus I just like the design of the console :). 

* Typescript: the primary language
  Because a fully typed web app is provides a great developer expierence. 

* Cloud Build: builds and deploy - TODO