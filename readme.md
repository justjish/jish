# Jish.Dev

A typescript monorepo that houses the following packages:

* @jish/img - A modified version of [remix-image](https://github.com/Josh-McFarlin/remix-image) that supports Cloudflare Workers 'Module' Syntax (wip)
* @jish/remix - Primary used as an about-me/resume site.. Check out [Jish.Dev](https://jish.dev) to see the currently released version!
* @jish/worker - The entry point for the Cloudflare Workers deployment. Deploys the @jish/remix site using a custom remix server adapter made for Cloudflare Workers 'Module' Syntax.
* @jish/cloudflare-env - A typescript definition that defines types specific to my Cloudflare Workers deployment config.
* @jish/tsconfig - A base tsconfig using the strictest typescript compiler options.
* @jish/eslint-config - A base eslint config that is extended on a per package basis.

The purpose of this repo is to:

* Experiment with the latest offers available in the Javascript/Typescript Ecosystem.
* Showcase my coding style for those interested.
* Test possible solutions to common pain-points unique to my team.

## Notable Packages

### @jish/remix + @jish/worker

This is my about-me/resume site updated for 2023. Its an evolution from the previous version that was a Single Page React App built in 2021.

#### Tech Stack

* [Remix](https://remix.run/) - A full stack web Framework
  * [React](https://reactjs.org/) - The component framework used by Remix. The entire site is built using only Functional Components and Hooks.
  * [react-spring](https://github.com/pmndrs/react-spring) - Used for all the animated you see on the site. Spring-based animations are definitely a cut-above time-based ones.
* [Tailwind](https://tailwindcss.com/) - An awesome CSS Framework. Previously used the CSS-in-JS library [Emotion](https://emotion.sh/).
* [Github Actions](https://github.com/features/actions) - Used for Continuous Deployment to Cloudflare. Previously used Actions to Deploy to Firebase Hosting.
* [Turborepo](https://turbo.build/repo) - Used to manage the monorepo.
* [Cloudflare Workers](https://workers.cloudflare.com/) - Used to globally deploy the site. Previously deployed on Firebase Hosting as an SPA.
* [Typescript](https://www.typescriptlang.org/) - 100% fully typed without an 'any' in sight.

#### Performance and Fluidity



## Getting Starting

Before going further ensure you have the following installed on your system:

* node
* pnpm
* wrangler2

### Local

```bash
git clone ...
pnpm install
pnpm dev
```

### Build

```bash
pnpm build

```

### Deploy

The deployment is handled by Github Workflows. Commits to the main branch will trigger a new deployment.
