# Let's Get Smashed

A responsive website for a smash burger restaurant, built with React and Tailwind CSS. The design follows the Figma file, and every page works on phones, tablets and desktops.

## Pages

| Page | Route | What it has |
| --- | --- | --- |
| Home | `/` | Hero, menu with sticky tabs, deal banners, special deal, testimonials slider, price list |
| Item details | `/menu/:itemId` | Photo, price, size and quantity, add to cart, description and reviews tabs, related products |
| Cart | `/cart` | Items with quantity buttons, remove, order summary, empty cart state |
| About | `/about` | Story, numbers, reasons to choose us, call to action |
| Contact | `/contact` | Contact details, message form, Google map |

## Features

- Loading screen with a progress bar and a curtain exit animation
- Sticky navbar, with a full screen menu on mobile
- "Our Menu" title and tabs stay pinned while you scroll, and the active tab follows the scroll
- Shopping cart saved in the browser (localStorage), with a count badge in the navbar
- Testimonials slider (Swiper): 3 cards on desktop, 2 on tablet, 1 on mobile
- Scroll reveal animations (they respect the "reduce motion" setting)

## Tech stack

- [React](https://react.dev) 19
- [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) 4
- [React Router](https://reactrouter.com)
- [Swiper](https://swiperjs.com)

## Getting started

You need Node.js 18 or newer.

```bash
# install the packages
npm install

# start the dev server (http://localhost:5173)
npm run dev
```

Other scripts:

```bash
npm run build     # production build, the output goes to dist/
npm run preview   # preview the production build
npm run lint      # check the code with oxlint
```

## Project structure

```
public/images/     all the images (hero, menu, banners, contact ...)
src/
  components/      sections and small parts (Navbar, Hero, OurMenu, Footer ...)
  pages/           one file per page
  context/         the cart (CartContext + useCart)
  data/menuData.js the menu items, edit this file to change the menu
  lib/             small helpers
  index.css        Tailwind setup, colors, fonts and animations
```

## Notes

- The text on the About page, the reviews and the extra details on the item page are placeholder text.
- The contact form and the checkout button are not connected to a server yet.
- When you deploy, the host must send all routes to `index.html`, otherwise opening a page like `/cart` directly will give a 404.
