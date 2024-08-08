<p align="center">
  <a href="https://blog.nurriyad.xyz" target="_blank">
    <img  src="./assets/images/dark.png">
  </a>
</p>

<h1 align="center">Nuxt Blog A Personal Blog Site</h1>

### Built with

<p align="center">
    <img width="200" src="./assets/images/logo.png">
</p>

 Nuxt Blog built with [Nuxt3](https://nuxt.com), [Nuxt-Content2](https://content.nuxtjs.org/blog/announcing-v2/), [Vue3](https://vuejs.org) & [TailwindCss](https://tailwindcss.com/)

## Features
- Write blog with markdown file
- Auto generate category from blog post
- Blog list page with search and pagination
- About me page for user info
- Auto generate table of content for blog post
- Auto generate Sitemap
- Url preview with Nuxt ogImage
- Dark and light mode
- Server Side Rendered(SSR) with Nuxt3


## How to Make This Blog Template Yours in 5 Minutes
- Clone this repo or use it as a template
- Go to ./data/index.ts file & add your personal info
- Then head over to the ./content/blogs folder to add new blogs
- Voilà! You've got a personalized blog site!

## Preview

<p align="center">
  <a href="https://blog.nurriyad.xyz" target="_blank">
    <img width="1090" src="./assets/images/preview1.png">
    <img width="1090" src="./assets/images/preview2.png">
    <img width="1090" src="./assets/images/preview3.png">
    <img width="1090" src="./assets/images/preview4.png">
    <br>
    Live Demo
  </a>
</p>

## Demo

https://blog.nurriyad.xyz

> Hosted on [Vercel](https://vercel.com/): `npm run build`

## Build Setup

**Requires Node.js 16+**

```bash
# install dependencies
yarn install

# serve in dev mode, with hot reload at localhost:5173
ENABLE_I18N=true npm run dev # with multilanguage support 

ENABLE_I18N=false npm run dev # without multilanguage support 

# build for production
yarn run build

# serve in production mode
yarn run  preview

```
### Note: For Production You Must Set an Enviroment variable named `ENABLE_I18N` true or false for multilanguage settings
