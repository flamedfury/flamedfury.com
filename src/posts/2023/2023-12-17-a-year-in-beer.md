---
title: My Year In Beer 2023
description: I drank a lot of great beers this year, let's take a look.
tags:
  - beer
date: 2023-12-17
updated: 2024-01-07
type: untappd
---

I've been tracking the beers I drink in [Untappd](https://untappd.com/) since 2013. Like many companies, Untappd also produce an end of year look back that I thought would be fun to share here on my own website.

Untappd don't provide any easy way to get your data out so I jacked this straight from their website. It took a bit of hacking but here it is.

Don't look under the hood, it's a mess of jacked code from a React app.

RSS viewers you will have to click through to the [web version](/posts/my-year-in-beer-2023/) to see the breakdown.

<style>
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px
  }

  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit
  }

  a {
    color: inherit;
    text-decoration: inherit
  }

  b,
  strong {
    font-weight: bolder
  }

  code,
  kbd,
  pre,
  samp {
    font-family: var(--font-vt323), ui-sans-serif, system-ui;
    font-size: 1em
  }

  small {
    font-size: 80%
  }

  :-moz-focusring {
    outline: auto
  }

  :-moz-ui-invalid {
    box-shadow: none
  }

  progress {
    vertical-align: baseline
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto
  }

  [type=search] {
    -webkit-appearance: textfield;
    outline-offset: -2px
  }

  ::-webkit-search-decoration {
    -webkit-appearance: none
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
  }

  summary {
    display: list-item
  }

  blockquote,
  dd,
  dl,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  pre {
    margin: 0
  }

  fieldset {
    margin: 0
  }

  fieldset,
  legend {
    padding: 0
  }

  menu,
  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0
  }

  dialog {
    padding: 0
  }

  textarea {
    resize: vertical
  }

  input::-moz-placeholder,
  textarea::-moz-placeholder {
    opacity: 1;
    color: #9ca3af
  }

  input::placeholder,
  textarea::placeholder {
    opacity: 1;
    color: #9ca3af
  }

  [role=button],
  button {
    cursor: pointer
  }

  :disabled {
    cursor: default
  }

  .post img {
    aspect-ratio: auto;
  }

  [hidden] {
    display: none
  }

  :root {
    --color-black: #0a1916
  }

  *,
  :after,
  :before {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
  }

  ::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgba(59, 130, 246, .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
  }

  .container {
    width: 100%
  }

  @media (min-width:380px) {
    .container {
      max-width: 380px
    }
  }

  @media (min-width:640px) {
    .container {
      max-width: 640px
    }
  }

  @media (min-width:768px) {
    .container {
      max-width: 768px
    }
  }

  @media (min-width:1024px) {
    .container {
      max-width: 1024px
    }
  }

  @media (min-width:1280px) {
    .container {
      max-width: 1280px
    }
  }

  @media (min-width:1536px) {
    .container {
      max-width: 1536px
    }
  }

  .visible {
    visibility: visible
  }

  .static {
    position: static
  }

  .fixed {
    position: fixed
  }

  .absolute {
    position: absolute
  }

  .relative {
    position: relative
  }

  .sticky {
    position: sticky
  }

  .inset-0 {
    inset: 0
  }

  .inset-y-0 {
    top: 0;
    bottom: 0
  }

  .-left-\[2px\] {
    left: -2px
  }

  .-right-\[2px\] {
    right: -2px
  }

  .left-0 {
    left: 0
  }

  .right-0 {
    right: 0
  }

  .top-0 {
    top: 0
  }

  .top-\[-9px\] {
    top: -9px
  }

  .-z-10 {
    z-index: -10
  }

  .z-10 {
    z-index: 10
  }

  .z-20 {
    z-index: 20
  }

  .z-30 {
    z-index: 30
  }

  .z-40 {
    z-index: 40
  }

  .z-50 {
    z-index: 50
  }

  .col-span-2 {
    grid-column: span 2/span 2
  }

  .col-start-1 {
    grid-column-start: 1
  }

  .row-span-2 {
    grid-row: span 2/span 2
  }

  .row-start-1 {
    grid-row-start: 1
  }

  .row-start-2 {
    grid-row-start: 2
  }

  .m-3 {
    margin: .75rem
  }

  .m-5 {
    margin: 1.25rem
  }

  .m-auto {
    margin: auto
  }

  .-mx-4 {
    margin-left: -1rem;
    margin-right: -1rem
  }

  .mx-1 {
    margin-left: .25rem;
    margin-right: .25rem
  }

  .mx-2 {
    margin-left: .5rem;
    margin-right: .5rem
  }

  .mx-3 {
    margin-left: .75rem;
    margin-right: .75rem
  }

  .mx-4 {
    margin-left: 1rem;
    margin-right: 1rem
  }

  .mx-8 {
    margin-left: 2rem;
    margin-right: 2rem
  }

  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem
  }

  .my-5 {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem
  }

  .-mb-2 {
    margin-bottom: -.5rem
  }

  .-mt-3 {
    margin-top: -.75rem
  }

  .-mt-5 {
    margin-top: -1.25rem
  }

  .-mt-6 {
    margin-top: -1.5rem
  }

  .mb-0 {
    margin-bottom: 0
  }

  .mb-10 {
    margin-bottom: 2.5rem
  }

  .mb-11 {
    margin-bottom: 2.75rem
  }

  .mb-12 {
    margin-bottom: 3rem
  }

  .mb-16 {
    margin-bottom: 4rem
  }

  .mb-2 {
    margin-bottom: .5rem
  }

  .mb-20 {
    margin-bottom: 5rem
  }

  .mb-3 {
    margin-bottom: .75rem
  }

  .mb-4 {
    margin-bottom: 1rem
  }

  .mb-5 {
    margin-bottom: 1.25rem
  }

  .mb-6 {
    margin-bottom: 1.5rem
  }

  .mb-7 {
    margin-bottom: 1.75rem
  }

  .mb-8 {
    margin-bottom: 2rem
  }

  .ml-1 {
    margin-left: .25rem
  }

  .ml-4 {
    margin-left: 1rem
  }

  .ml-auto {
    margin-left: auto
  }

  .mr-1 {
    margin-right: .25rem
  }

  .mr-2 {
    margin-right: .5rem
  }

  .mr-4 {
    margin-right: 1rem
  }

  .mr-5 {
    margin-right: 1.25rem
  }

  .mt-1 {
    margin-top: .25rem
  }

  .mt-10 {
    margin-top: 2.5rem
  }

  .mt-12 {
    margin-top: 3rem
  }

  .mt-14 {
    margin-top: 3.5rem
  }

  .mt-2 {
    margin-top: .5rem
  }

  .mt-28 {
    margin-top: 7rem
  }

  .mt-3 {
    margin-top: .75rem
  }

  .mt-4 {
    margin-top: 1rem
  }

  .mt-40 {
    margin-top: 10rem
  }

  .mt-5 {
    margin-top: 1.25rem
  }

  .mt-6 {
    margin-top: 1.5rem
  }

  .mt-7 {
    margin-top: 1.75rem
  }

  .mt-8 {
    margin-top: 2rem
  }

  .mt-\[2px\] {
    margin-top: 2px
  }

  .mt-\[5px\] {
    margin-top: 5px
  }

  .mt-\[calc\(50vh-150px\)\] {
    margin-top: calc(50vh - 150px)
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3
  }

  .block {
    display: block
  }

  .flex {
    display: flex
  }

  .inline-flex {
    display: inline-flex
  }

  .table {
    display: table
  }

  .grid {
    display: grid
  }

  .hidden {
    display: none
  }

  .h-12 {
    height: 3rem
  }

  .h-4 {
    height: 1rem
  }

  .h-40 {
    height: 10rem
  }

  .h-5 {
    height: 1.25rem
  }

  .h-6 {
    height: 1.5rem
  }

  .h-7 {
    height: 1.75rem
  }

  .h-8 {
    height: 2rem
  }

  .h-9 {
    height: 2.25rem
  }

  .h-\[100px\] {
    height: 100px
  }

  .h-\[12px\] {
    height: 12px
  }

  .h-\[32px\] {
    height: 32px
  }

  .h-\[35px\] {
    height: 35px
  }

  .h-\[40px\] {
    height: 40px
  }

  .h-\[420px\] {
    height: 420px
  }

  .h-\[43px\] {
    height: 43px
  }

  .h-\[51px\] {
    height: 51px
  }

  .h-full {
    height: 100%
  }

  .h-min {
    height: -moz-min-content;
    height: min-content
  }

  .max-h-\[250px\] {
    max-height: 250px
  }

  .max-h-\[calc\(100vh-15rem\)\] {
    max-height: calc(100vh - 15rem)
  }

  .min-h-\[100\%\] {
    min-height: 100%
  }

  .min-h-\[32px\] {
    min-height: 32px
  }

  .w-2\/3 {
    width: 66.666667%
  }

  .w-3\/4 {
    width: 75%
  }

  .w-4 {
    width: 1rem
  }

  .w-5 {
    width: 1.25rem
  }

  .w-6 {
    width: 1.5rem
  }

  .w-7 {
    width: 1.75rem
  }

  .w-8 {
    width: 2rem
  }

  .w-9 {
    width: 2.25rem
  }

  .w-\[100px\] {
    width: 100px
  }

  .w-\[12px\] {
    width: 12px
  }

  .w-\[160px\] {
    width: 160px
  }

  .w-\[200px\] {
    width: 200px
  }

  .w-\[32px\] {
    width: 32px
  }

  .w-\[37px\] {
    width: 37px
  }

  .w-\[39px\] {
    width: 39px
  }

  .w-\[40px\] {
    width: 40px
  }

  .w-\[52px\] {
    width: 52px
  }

  .w-\[90px\] {
    width: 90px
  }

  .w-fit {
    width: -moz-fit-content;
    width: fit-content
  }

  .w-full {
    width: 100%
  }

  .min-w-\[120px\] {
    min-width: 120px
  }

  .min-w-\[32px\] {
    min-width: 32px
  }

  .min-w-\[60px\] {
    min-width: 60px
  }

  .min-w-\[95px\] {
    min-width: 95px
  }

  .max-w-4xl {
    max-width: 56rem
  }

  .max-w-\[1012px\] {
    max-width: 1012px
  }

  .max-w-\[80\%\] {
    max-width: 80%
  }

  .max-w-\[822px\] {
    max-width: 822px
  }

  .max-w-lg {
    max-width: 32rem
  }

  .max-w-md {
    max-width: 28rem
  }

  .max-w-sm {
    max-width: 24rem
  }

  .max-w-xl {
    max-width: 36rem
  }

  .flex-1 {
    flex: 1 1 0%
  }

  .grow {
    flex-grow: 1
  }

  .-translate-x-1 {
    --tw-translate-x: -0.25rem
  }

  .-translate-x-1,
  .-translate-x-16 {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
  }

  .-translate-x-16 {
    --tw-translate-x: -4rem
  }

  .-translate-y-7 {
    --tw-translate-y: -1.75rem
  }

  .-translate-y-7,
  .-translate-y-\[152px\] {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
  }

  .-translate-y-\[152px\] {
    --tw-translate-y: -152px
  }

  .translate-x-0 {
    --tw-translate-x: 0px
  }

  .translate-x-0,
  .translate-x-\[500px\] {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
  }

  .translate-x-\[500px\] {
    --tw-translate-x: 500px
  }

  .rotate-180 {
    --tw-rotate: 180deg
  }

  .rotate-180,
  .scale-90 {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
  }

  .scale-90 {
    --tw-scale-x: .9;
    --tw-scale-y: .9
  }

  .transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
  }

  @keyframes bounce {

    0%,
    to {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(.8, 0, 1, 1)
    }

    50% {
      transform: none;
      animation-timing-function: cubic-bezier(0, 0, .2, 1)
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite
  }

  .cursor-pointer {
    cursor: pointer
  }

  .grid-flow-row {
    grid-auto-flow: row
  }

  .grid-flow-col {
    grid-auto-flow: column
  }

  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr))
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr))
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr))
  }

  .grid-cols-\[minmax\(30px\2c auto\)_2fr_minmax\(100px\2c _1fr\)\] {
    grid-template-columns: minmax(30px, auto) 2fr minmax(100px, 1fr)
  }

  .flex-row {
    flex-direction: row
  }

  .flex-col {
    flex-direction: column
  }

  .flex-wrap {
    flex-wrap: wrap
  }

  .items-start {
    align-items: flex-start
  }

  .items-end {
    align-items: flex-end
  }

  .items-center {
    align-items: center
  }

  .items-baseline {
    align-items: baseline
  }

  .justify-end {
    justify-content: flex-end
  }

  .justify-center {
    justify-content: center
  }

  .justify-between {
    justify-content: space-between
  }

  .justify-around {
    justify-content: space-around
  }

  .justify-evenly {
    justify-content: space-evenly
  }

  .gap-10 {
    gap: 2.5rem
  }

  .gap-16 {
    gap: 4rem
  }

  .gap-2 {
    gap: .5rem
  }

  .gap-20 {
    gap: 5rem
  }

  .gap-3 {
    gap: .75rem
  }

  .gap-4 {
    gap: 1rem
  }

  .gap-5 {
    gap: 1.25rem
  }

  .gap-6 {
    gap: 1.5rem
  }

  .gap-\[4px\] {
    gap: 4px
  }

  .gap-\[5px\] {
    gap: 5px
  }

  .gap-x-2 {
    -moz-column-gap: .5rem;
    column-gap: .5rem
  }

  .gap-x-4 {
    -moz-column-gap: 1rem;
    column-gap: 1rem
  }

  .gap-x-8 {
    -moz-column-gap: 2rem;
    column-gap: 2rem
  }

  .gap-y-2 {
    row-gap: .5rem
  }

  .gap-y-6 {
    row-gap: 1.5rem
  }

  .self-center {
    align-self: center
  }

  .overflow-hidden {
    overflow: hidden
  }

  .overflow-visible {
    overflow: visible
  }

  .overflow-y-auto {
    overflow-y: auto
  }

  .overflow-x-hidden {
    overflow-x: hidden
  }

  .overflow-y-scroll {
    overflow-y: scroll
  }

  .scroll-smooth {
    scroll-behavior: smooth
  }

  .truncate {
    overflow: hidden;
    text-overflow: ellipsis
  }

  .truncate,
  .whitespace-nowrap {
    white-space: nowrap
  }

  .break-words {
    overflow-wrap: break-word
  }

  .rounded {
    border-radius: .25rem
  }

  .rounded-full {
    border-radius: 9999px
  }

  .rounded-md {
    border-radius: .375rem
  }

  .border {
    border-width: 1px
  }

  .border-2 {
    border-width: 2px
  }

  .border-4 {
    border-width: 4px
  }

  .border-b {
    border-bottom-width: 1px
  }

  .border-b-2 {
    border-bottom-width: 2px
  }

  .border-t {
    border-top-width: 1px
  }

  .border-black {
    --tw-border-opacity: 1;
    border-color: rgb(10 25 22/var(--tw-border-opacity))
  }

  .border-green-600 {
    --tw-border-opacity: 1;
    border-color: rgb(18 49 43/var(--tw-border-opacity))
  }

  .border-white {
    --tw-border-opacity: 1;
    border-color: rgb(246 240 170/var(--tw-border-opacity))
  }

  .border-yellow-100 {
    --tw-border-opacity: 1;
    border-color: rgb(254 249 195/var(--tw-border-opacity))
  }

  .bg-black {
    --tw-bg-opacity: 1;
    background-color: rgb(10 25 22/var(--tw-bg-opacity))
  }

  .bg-black\/10 {
    background-color: rgba(10, 25, 22, .1)
  }

  .bg-black\/20 {
    background-color: rgba(10, 25, 22, .2)
  }

  .bg-black\/25 {
    background-color: rgba(10, 25, 22, .25)
  }

  .bg-black\/30 {
    background-color: rgba(10, 25, 22, .3)
  }

  .bg-black\/40 {
    background-color: rgba(10, 25, 22, .4)
  }

  .bg-black\/50 {
    background-color: rgba(10, 25, 22, .5)
  }

  .bg-black\/60 {
    background-color: rgba(10, 25, 22, .6)
  }

  .bg-black\/70 {
    background-color: rgba(10, 25, 22, .7)
  }

  .bg-black\/80 {
    background-color: rgba(10, 25, 22, .8)
  }

  .bg-black\/90 {
    background-color: rgba(10, 25, 22, .9)
  }

  .bg-gold {
    --tw-bg-opacity: 1;
    background-color: rgb(192 183 5/var(--tw-bg-opacity))
  }

  .bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(243 244 246/var(--tw-bg-opacity))
  }

  .bg-gray-900 {
    --tw-bg-opacity: 1;
    background-color: rgb(17 24 39/var(--tw-bg-opacity))
  }

  .bg-green {
    --tw-bg-opacity: 1;
    background-color: rgb(0 123 97/var(--tw-bg-opacity))
  }

  .bg-green-600 {
    --tw-bg-opacity: 1;
    background-color: rgb(18 49 43/var(--tw-bg-opacity))
  }

  .bg-lime-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(140 196 64/var(--tw-bg-opacity))
  }

  .bg-lime-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(205 219 0/var(--tw-bg-opacity))
  }

  .bg-orange-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(235 119 0/var(--tw-bg-opacity))
  }

  .bg-pink-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(241 81 255/var(--tw-bg-opacity))
  }

  .bg-red-600 {
    --tw-bg-opacity: 1;
    background-color: rgb(86 39 31/var(--tw-bg-opacity))
  }

  .bg-teal-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(81 174 147/var(--tw-bg-opacity))
  }

  .bg-transparent {
    background-color: transparent
  }

  .bg-true-white\/40 {
    background-color: hsla(0, 0%, 100%, .4)
  }

  .bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(246 240 170/var(--tw-bg-opacity))
  }

  .bg-white\/40 {
    background-color: hsla(55, 81%, 82%, .4)
  }

  .bg-white\/60 {
    background-color: hsla(55, 81%, 82%, .6)
  }

  .bg-yellow-400 {
    --tw-bg-opacity: 1;
    background-color: rgb(251 255 74/var(--tw-bg-opacity))
  }

  .bg-yellow-500 {
    --tw-bg-opacity: 1;
    background-color: rgb(255 209 1/var(--tw-bg-opacity))
  }

  .bg-opacity-70 {
    --tw-bg-opacity: 0.7
  }

  .bg-gradient-to-b {
    background-image: linear-gradient(to bottom, var(--tw-gradient-stops))
  }

  .from-green-900 {
    --tw-gradient-from: #0f2621 var(--tw-gradient-from-position);
    --tw-gradient-to: rgba(15, 38, 33, 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)
  }

  .from-0\% {
    --tw-gradient-from-position: 0%
  }

  .via-green-500 {
    --tw-gradient-to: rgba(5, 118, 95, 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), #05765f var(--tw-gradient-via-position), var(--tw-gradient-to)
  }

  .via-25\% {
    --tw-gradient-via-position: 25%
  }

  .to-green-500 {
    --tw-gradient-to: #05765f var(--tw-gradient-to-position)
  }

  .to-100\% {
    --tw-gradient-to-position: 100%
  }

  .fill-green-300 {
    fill: #39a14d
  }

  .fill-lime-300 {
    fill: #8fff5a
  }

  .fill-red-500 {
    fill: #ef4444
  }

  .p-1 {
    padding: .25rem
  }

  .p-2 {
    padding: .5rem
  }

  .p-3 {
    padding: .75rem
  }

  .p-4 {
    padding: 1rem
  }

  .p-5 {
    padding: 1.25rem
  }

  .p-6 {
    padding: 1.5rem
  }

  .px-1 {
    padding-left: .25rem;
    padding-right: .25rem
  }

  .px-10 {
    padding-left: 2.5rem;
    padding-right: 2.5rem
  }

  .px-16 {
    padding-left: 4rem;
    padding-right: 4rem
  }

  .px-2 {
    padding-left: .5rem;
    padding-right: .5rem
  }

  .px-3 {
    padding-left: .75rem;
    padding-right: .75rem
  }

  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem
  }

  .px-5 {
    padding-left: 1.25rem;
    padding-right: 1.25rem
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem
  }

  .py-1 {
    padding-top: .25rem;
    padding-bottom: .25rem
  }

  .py-14 {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem
  }

  .py-2 {
    padding-top: .5rem;
    padding-bottom: .5rem
  }

  .py-3 {
    padding-top: .75rem;
    padding-bottom: .75rem
  }

  .py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem
  }

  .py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem
  }

  .pb-1 {
    padding-bottom: .25rem
  }

  .pb-10 {
    padding-bottom: 2.5rem
  }

  .pb-2 {
    padding-bottom: .5rem
  }

  .pb-3 {
    padding-bottom: .75rem
  }

  .pb-4 {
    padding-bottom: 1rem
  }

  .pb-6 {
    padding-bottom: 1.5rem
  }

  .pb-8 {
    padding-bottom: 2rem
  }

  .pb-\[3px\] {
    padding-bottom: 3px
  }

  .pl-2 {
    padding-left: .5rem
  }

  .pl-3 {
    padding-left: .75rem
  }

  .pl-6 {
    padding-left: 1.5rem
  }

  .pr-10 {
    padding-right: 2.5rem
  }

  .pr-14 {
    padding-right: 3.5rem
  }

  .pr-2 {
    padding-right: .5rem
  }

  .pr-3 {
    padding-right: .75rem
  }

  .pr-6 {
    padding-right: 1.5rem
  }

  .pt-0 {
    padding-top: 0
  }

  .pt-2 {
    padding-top: .5rem
  }

  .pt-4 {
    padding-top: 1rem
  }

  .pt-5 {
    padding-top: 1.25rem
  }

  .pt-8 {
    padding-top: 2rem
  }

  .text-left {
    text-align: left
  }

  .text-center {
    text-align: center
  }

  .text-right {
    text-align: right
  }

  .align-middle {
    vertical-align: middle
  }

  .font-mono {
    font-family: var(--font-vt323), ui-sans-serif, system-ui
  }

  .font-serif {
    font-family: var(--font-space-grotesk), ui-serif, Georgia
  }

  .text-2xl {
    font-size: 1.5rem
  }

  .text-3xl {
    font-size: 2rem
  }

  .text-4xl {
    font-size: 2.5rem
  }

  .text-5xl {
    font-size: 3.052rem
  }

  .text-6xl {
    font-size: 3.75rem;
    line-height: 1
  }

  .text-7xl {
    font-size: 4.5rem;
    line-height: 1
  }

  .text-8xl {
    font-size: 5rem
  }

  .text-\[29px\] {
    font-size: 29px
  }

  .text-base {
    font-size: 1rem
  }

  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem
  }

  .text-sm {
    font-size: .8rem
  }

  .text-xl {
    font-size: 1.25rem
  }

  .text-xs {
    font-size: .75rem
  }

  .font-bold {
    font-weight: 700
  }

  .font-medium {
    font-weight: 500
  }

  .font-semibold {
    font-weight: 600
  }

  .leading-10 {
    line-height: 2.5rem
  }

  .leading-13 {
    line-height: 3.5rem
  }

  .leading-4 {
    line-height: 1rem
  }

  .leading-5 {
    line-height: 1.25rem
  }

  .leading-6 {
    line-height: 1.5rem
  }

  .leading-7 {
    line-height: 1.75rem
  }

  .leading-8 {
    line-height: 2rem
  }

  .leading-\[27px\] {
    line-height: 27px
  }

  .leading-\[55px\] {
    line-height: 55px
  }

  .leading-none {
    line-height: 1
  }

  .text-\[\#6AFBFB\] {
    --tw-text-opacity: 1;
    color: rgb(106 251 251/var(--tw-text-opacity))
  }

  .text-\[\#8FFF5A\] {
    --tw-text-opacity: 1;
    color: rgb(143 255 90/var(--tw-text-opacity))
  }

  .text-\[\#9D8DFF\] {
    --tw-text-opacity: 1;
    color: rgb(157 141 255/var(--tw-text-opacity))
  }

  .text-\[\#A5FF9D\] {
    --tw-text-opacity: 1;
    color: rgb(165 255 157/var(--tw-text-opacity))
  }

  .text-\[\#FF49AB\] {
    --tw-text-opacity: 1;
    color: rgb(255 73 171/var(--tw-text-opacity))
  }

  .text-\[\#FF5E5E\] {
    --tw-text-opacity: 1;
    color: rgb(255 94 94/var(--tw-text-opacity))
  }

  .text-\[\#FF901E\] {
    --tw-text-opacity: 1;
    color: rgb(255 144 30/var(--tw-text-opacity))
  }

  .text-\[\#FFD930\] {
    --tw-text-opacity: 1;
    color: rgb(255 217 48/var(--tw-text-opacity))
  }

  .text-black {
    --tw-text-opacity: 1;
    color: rgb(10 25 22/var(--tw-text-opacity))
  }

  .text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128/var(--tw-text-opacity))
  }

  .text-green {
    --tw-text-opacity: 1;
    color: rgb(0 123 97/var(--tw-text-opacity))
  }

  .text-green-600 {
    --tw-text-opacity: 1;
    color: rgb(18 49 43/var(--tw-text-opacity))
  }

  .text-lime-300 {
    --tw-text-opacity: 1;
    color: rgb(143 255 90/var(--tw-text-opacity))
  }

  .text-lime-500 {
    --tw-text-opacity: 1;
    color: rgb(205 219 0/var(--tw-text-opacity))
  }

  .text-orange-500 {
    --tw-text-opacity: 1;
    color: rgb(235 119 0/var(--tw-text-opacity))
  }

  .text-pink-500 {
    --tw-text-opacity: 1;
    color: rgb(241 81 255/var(--tw-text-opacity))
  }

  .text-red-500 {
    --tw-text-opacity: 1;
    color: rgb(239 68 68/var(--tw-text-opacity))
  }

  .text-white {
    --tw-text-opacity: 1;
    color: rgb(246 240 170/var(--tw-text-opacity))
  }

  .text-yellow-400 {
    --tw-text-opacity: 1;
    color: rgb(251 255 74/var(--tw-text-opacity))
  }

  .text-yellow-500 {
    --tw-text-opacity: 1;
    color: rgb(255 209 1/var(--tw-text-opacity))
  }

  .opacity-0 {
    opacity: 0
  }

  .opacity-100 {
    opacity: 1
  }

  .opacity-60 {
    opacity: .6
  }

  .mix-blend-color-burn {
    mix-blend-mode: color-burn
  }

  .shadow {
    --tw-shadow: 4px 4px 0px var(--color-black);
    --tw-shadow-colored: 4px 4px 0px var(--tw-shadow-color)
  }

  .shadow,
  .shadow-lg {
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
  }

  .shadow-lg {
    --tw-shadow: 2px 2px 8px var(--color-black);
    --tw-shadow-colored: 2px 2px 8px var(--tw-shadow-color)
  }

  .shadow-sm {
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color)
  }

  .shadow-sm,
  .shadow-xl {
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)
  }

  .shadow-xl {
    --tw-shadow: 0 20px 25px -5px rgba(0, 0, 0, .1), 0 8px 10px -6px rgba(0, 0, 0, .1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)
  }

  .shadow-yellow-500 {
    --tw-shadow-color: #ffd101;
    --tw-shadow: var(--tw-shadow-colored)
  }

  .outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px
  }

  .filter {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
  }

  .backdrop-blur-lg {
    --tw-backdrop-blur: blur(16px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);
    backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s
  }

  .transition-transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s
  }

  .duration-200 {
    transition-duration: .2s
  }

  .duration-300 {
    transition-duration: .3s
  }

  .duration-500 {
    transition-duration: .5s
  }

  .ease-in {
    transition-timing-function: cubic-bezier(.4, 0, 1, 1)
  }

  .ease-out {
    transition-timing-function: cubic-bezier(0, 0, .2, 1)
  }

  .text-shadow-sm {
    text-shadow: 0 2px 0 var(--color-black)
  }

  .untappd {
    --tw-text-opacity: 1;
    color: rgb(246 240 170/var(--tw-text-opacity));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale background: linear-gradient(180deg, #0f2621 0, #0f2621 15%, #05765f 85%, #05765f)
  }

  .outline-stroke {
    text-shadow: -1px -1px 0 #f6f0aa, 1px -1px 0 #f6f0aa, -1px 1px 0 #f6f0aa, 1px 1px 0 #f6f0aa
  }

  .outline-stroke-gold {
    text-shadow: -1px -1px 0 #c0b705, 1px -1px 0 #c0b705, -1px 1px 0 #c0b705, 1px 1px 0 #c0b705
  }

  .bg-shadow {
    box-shadow: 0 0 50px 50px hsla(0, 0%, 100%, .05)
  }

  .text:before {
    content: "";
    margin-bottom: 0;
    display: table
  }

  .text:after {
    content: "";
    margin-top: -.2em;
    display: table
  }

  .black-scrollbar::-webkit-scrollbar,
  .white-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    overflow: hidden
  }

  .black-scrollbar::-webkit-scrollbar-track {
    --tw-bg-opacity: 1;
    background-color: rgb(246 240 170/var(--tw-bg-opacity));
    border-left: 1px solid #000;
    border-bottom-right-radius: 999px
  }

  .black-scrollbar::-webkit-scrollbar-thumb {
    border-width: 2px;
    --tw-border-opacity: 1;
    border-color: rgb(10 25 22/var(--tw-border-opacity));
    --tw-bg-opacity: 1;
    background-color: rgb(10 25 22/var(--tw-bg-opacity))
  }

  .black-scrollbar::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(31 41 55/var(--tw-bg-opacity))
  }

  .white-scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
    border-left: 1px solid transparent;
    border-bottom-right-radius: 999px
  }

  .white-scrollbar::-webkit-scrollbar-thumb {
    border-width: 2px;
    border-color: transparent
  }

  .white-scrollbar::-webkit-scrollbar-thumb,
  .white-scrollbar::-webkit-scrollbar-thumb:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(246 240 170/var(--tw-bg-opacity))
  }

  .container {
    position: absolute;
    transform: rotate(15deg);
    top: 70px
  }

  .loader {
    aspect-ratio: 1;
    border-radius: 50%;
    --_m: conic-gradient(#0000 20%, #000), linear-gradient(#6b6b6b 0 0) content-box;
    -webkit-mask: var(--_m);
    mask: var(--_m);
    -webkit-mask-composite: source-out;
    mask-composite: subtract;
    animation: spin 1s linear infinite
  }

  @keyframes spin {
    to {
      transform: rotate(1turn)
    }
  }

  .placeholder\:text-yellow-600::-moz-placeholder {
    --tw-text-opacity: 1;
    color: rgb(208 168 111/var(--tw-text-opacity))
  }

  .placeholder\:text-yellow-600::placeholder {
    --tw-text-opacity: 1;
    color: rgb(208 168 111/var(--tw-text-opacity))
  }

  .last\:border-0:last-child {
    border-width: 0
  }

  .last-of-type\:h-0:last-of-type {
    height: 0
  }

  .focus-within\:brightness-125:focus-within {
    --tw-brightness: brightness(1.25);
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
  }

  .hover\:cursor-pointer:hover {
    cursor: pointer
  }

  .hover\:bg-black:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(10 25 22/var(--tw-bg-opacity))
  }

  .hover\:bg-yellow-400:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(251 255 74/var(--tw-bg-opacity))
  }

  .hover\:text-gray-200:hover {
    --tw-text-opacity: 1;
    color: rgb(229 231 235/var(--tw-text-opacity))
  }

  .hover\:text-white:hover {
    --tw-text-opacity: 1;
    color: rgb(246 240 170/var(--tw-text-opacity))
  }

  .hover\:brightness-125:hover {
    --tw-brightness: brightness(1.25)
  }

  .hover\:brightness-125:hover,
  .hover\:brightness-90:hover {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
  }

  .hover\:brightness-90:hover {
    --tw-brightness: brightness(.9)
  }

  .focus\:border-transparent:focus {
    border-color: transparent
  }

  .focus\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px
  }

  .focus\:ring-2:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)
  }

  .focus\:ring-black:focus {
    --tw-ring-opacity: 1;
    --tw-ring-color: rgb(10 25 22/var(--tw-ring-opacity))
  }

  .active\:cursor-pointer:active {
    cursor: pointer
  }

  .disabled\:cursor-not-allowed:disabled {
    cursor: not-allowed
  }

  .disabled\:opacity-50:disabled {
    opacity: .5
  }

  @media (prefers-reduced-motion:no-preference) {
    @keyframes pulse {
      50% {
        opacity: .5
      }
    }

    .motion-safe\:animate-pulse {
      animation: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite
    }
  }

  @media (min-width:0px) {
    @media not all and (min-width:768px) {
      .min-\[0px\]\:max-md\:hidden {
        display: none
      }

      .min-\[0px\]\:max-md\:justify-center {
        justify-content: center
      }

      .min-\[0px\]\:max-md\:p-4 {
        padding: 1rem
      }
    }

    @media not all and (min-width:640px) {
      .min-\[0px\]\:max-sm\:hidden {
        display: none
      }
    }
  }

  @media (min-width:640px) {
    .sm\:mx-auto {
      margin-left: auto;
      margin-right: auto
    }

    .sm\:mb-8 {
      margin-bottom: 2rem
    }

    .sm\:mt-6 {
      margin-top: 1.5rem
    }

    .sm\:hidden {
      display: none
    }

    .sm\:scale-100 {
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
    }
  }

  @media (min-width:768px) {
    .md\:col-span-1 {
      grid-column: span 1/span 1
    }

    .md\:m-auto {
      margin: auto
    }

    .md\:mb-0 {
      margin-bottom: 0
    }

    .md\:mr-14 {
      margin-right: 3.5rem
    }

    .md\:mr-5 {
      margin-right: 1.25rem
    }

    .md\:flex {
      display: flex
    }

    .md\:hidden {
      display: none
    }

    .md\:w-2\/3 {
      width: 66.666667%
    }

    .md\:w-3\/4 {
      width: 75%
    }

    .md\:w-80 {
      width: 20rem
    }

    .md\:w-\[24px\] {
      width: 24px
    }

    .md\:w-\[2800px\] {
      width: 2800px
    }

    .md\:w-\[600px\] {
      width: 600px
    }

    .md\:w-max {
      width: -moz-max-content;
      width: max-content
    }

    .md\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr))
    }

    .md\:flex-row {
      flex-direction: row
    }

    .md\:items-center {
      align-items: center
    }

    .md\:justify-end {
      justify-content: flex-end
    }

    .md\:justify-between {
      justify-content: space-between
    }

    .md\:gap-4 {
      gap: 1rem
    }

    .md\:scroll-auto {
      scroll-behavior: auto
    }

    .md\:p-14 {
      padding: 3.5rem
    }

    .md\:p-16 {
      padding: 4rem
    }

    .md\:p-8 {
      padding: 2rem
    }

    .md\:px-10 {
      padding-left: 2.5rem;
      padding-right: 2.5rem
    }

    .md\:px-14 {
      padding-left: 3.5rem;
      padding-right: 3.5rem
    }

    .md\:px-16 {
      padding-left: 4rem;
      padding-right: 4rem
    }

    .md\:px-5 {
      padding-left: 1.25rem;
      padding-right: 1.25rem
    }

    .md\:py-2 {
      padding-top: .5rem
    }

    .md\:pb-2,
    .md\:py-2 {
      padding-bottom: .5rem
    }

    .md\:pt-10 {
      padding-top: 2.5rem
    }

    .md\:pt-\[2px\] {
      padding-top: 2px
    }
  }

  @media (min-width:1024px) {
    .lg\:w-\[400px\] {
      width: 400px
    }

    .lg\:flex-none {
      flex: none
    }

    .lg\:p-4 {
      padding: 1rem
    }

    .lg\:pt-\[150px\] {
      padding-top: 150px
    }
  }
</style>

<div class="mt-xl">
  <div
    class="untappd max-w-4xl grid grid-cols-1 bg-gradient-to-b from-green-900 from-0% via-green-500 via-25% to-green-500 to-100% m-auto bg-shadow shadow-yellow-500 rounded -z-10">
    <div class="w-full col-start-1 row-start-1 row-span-2 pt-5">
      <img src="/assets/images/experiments/untappd/Pixels375WCrushed.png" alt="">
    </div>
    <div class="text-center flex flex-col items-center col-start-1 row-start-1"><img alt="logo" loading="lazy"
        width="327" height="238" decoding="async" data-nimg="1" class="mt-10 mb-2" style="color:transparent"
        srcset="/assets/images/experiments/untappd/yibLogo2023.6317e419-1.png 1x, /assets/images/experiments/untappd/yibLogo2023.6317e419.png 2x"
        src="/assets/images/experiments/untappd/yibLogo2023.6317e419.png"></div>
    <div class="col-start-1 row-start-2">
      <div id="BEER" class="m-3 mb-8 scroll-margin bg-yellow-500 text-green">
        <div class="px-5 font-medium flex gap-2 items-center">
          <h2 class="flex-1 text-7xl text-green font-bold">Beer</h2>
        </div>
        <div>
          <div class="flex flex-col px-5 items-center justify-between gap-4 md:flex-row mb-4">
            <p class="text-3xl font-medium text-green-600">My top rated beer was <span class="font-bold">Descent to the
                Dungeon of Dankness</span>
              by <span class="font-bold">Garage Project</span></p>
            <div>
              <div class="relative" style="width: 300px; height: 300px;"><img alt="beer image" loading="lazy"
                  decoding="async" data-nimg="fill" class="absolute top-0 left-0 rounded-full"
                  style="position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; color: transparent;"
                  sizes="100vw"
                  srcset="/assets/images/experiments/untappd/beer-5488496_57bcd_hd-1.jpeg 640w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-2.jpeg 750w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-3.jpeg 828w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-4.jpeg 1080w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-5.jpeg 1200w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-6.jpeg 1920w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd-7.jpeg 2048w, /assets/images/experiments/untappd/beer-5488496_57bcd_hd.jpeg 3840w"
                  src="/assets/images/experiments/untappd/beer-5488496_57bcd_hd.jpeg"><img alt="" loading="lazy"
                  width="300" height="300" decoding="async" data-nimg="1" class="absolute top-0 left-0"
                  style="color: transparent;"
                  srcset="/assets/images/experiments/untappd/yellow_mask.9444234b-1.png 1x, /assets/images/experiments/untappd/yellow_mask.9444234b.png 2x"
                  src="/assets/images/experiments/untappd/yellow_mask.9444234b.png"></div>
            </div>
          </div>

          <div class="mt-5 mx-1 bg-green-600 text-white">
            <div class="p-4 pr-6">
              <p class="font-bold text-2xl text-white">My top rated beers</p>
              <p class="font-medium mt-1 mb-3 text-2xl leading-7">These are the top 5 beers I rated. If I had a beer
                more than once, the rating is averaged.</p>
              <div class="flex items-center gap-4 text-white">
                <div class="flex flex-1 gap-3 border-b border-white py-2 items-center">
                  <div class="flex-1">
                    <div class="font-bold text-xl">Descent to the Dungeon of Dankness</div>
                    <div class="mt-1 text-large">Garage Project</div>
                  </div>
                  <div class="flex gap-3 items-center overflow-hidden">
                    <div class="flex text-3xl font-medium text">5</div><svg viewBox="0 0 58 58" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                      <path
                        d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                        fill="transparent" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4 text-white">
                <div class="flex flex-1 gap-3 border-b border-white py-2 items-center">
                  <div class="flex-1">
                    <div class="font-bold text-xl">Hop Zombie</div>
                    <div class="mt-1 text-large">Epic Brewing Company</div>
                  </div>
                  <div class="flex gap-3 items-center overflow-hidden">
                    <div class="flex text-3xl font-medium text">5</div><svg viewBox="0 0 58 58" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                      <path
                        d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                        fill="transparent" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4 text-white">
                <div class="flex flex-1 gap-3 border-b border-white py-2 items-center">
                  <div class="flex-1">
                    <div class="font-bold text-xl">Knife Party Party</div>
                    <div class="mt-1 text-large">Liberty Brewing</div>
                  </div>
                  <div class="flex gap-3 items-center overflow-hidden">
                    <div class="flex text-3xl font-medium text">5</div><svg viewBox="0 0 58 58" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                      <path
                        d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                        fill="transparent" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4 text-white">
                <div class="flex flex-1 gap-3 border-b border-white py-2 items-center">
                  <div class="flex-1">
                    <div class="font-bold text-xl">Springwood</div>
                    <div class="mt-1 text-large">Pacific Coast Brewery </div>
                  </div>
                  <div class="flex gap-3 items-center overflow-hidden">
                    <div class="flex text-3xl font-medium text">5</div><svg viewBox="0 0 58 58" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                      <path
                        d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                        fill="transparent" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-4 text-white">
                <div class="flex flex-1 gap-3  border-white py-2 items-center">
                  <div class="flex-1">
                    <div class="font-bold text-xl">Fresh Hop Bitterbitch IPA</div>
                    <div class="mt-1 text-large">Parrotdog</div>
                  </div>
                  <div class="flex gap-3 items-center overflow-hidden">
                    <div class="flex text-3xl font-medium text">4.5</div><svg viewBox="0 0 58 58" fill="none"
                      xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                      <path
                        d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                        fill="transparent" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div class="px-6 pb-6">
            <div class="mt-6"></div>
          </div>
        </div>
      </div>
      <div id="CHECK-INS" class="m-3 mb-8 scroll-margin bg-white text-green">
        <div class="px-5 font-medium flex gap-2 items-center">
          <h2 class="flex-1 text-7xl text-green font-bold">Check-ins</h2><span class="flex"></span>
        </div>
        <div>
          <div class="bg-green-600 p-4 md:p-8 md:px-16 mx-1 mb-4">
            <div class="grid grid-cols-3 grid-flow-row text-white text-2xl items-center gap-3">
              <div class="">Year</div>
              <div class="text-right">Check-ins</div>
              <div class="min-[0px]:max-sm:hidden text-right">Change to LY</div>
              <div class="sm:hidden text-right">Change</div>
            </div>
            <div class="grid grid-cols-3 grid-flow-row text-lime-300 text-3xl gap-3">
              <div class="">2023</div>
              <div class="text-right">148</div>
              <div class="text-right">
                <div class="flex items-center justify-end gap-2"><svg viewBox="0 0 26 26" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 fill-lime-300">
                    <path d="m4 15-3-3L13 1l12 11-3 3-7-6.5V25h-4V8.5L4 15Z" stroke="#000"></path>
                  </svg><span>27</span></div>
              </div>
            </div>
            <div class="grid grid-cols-3 grid-flow-row text-pink-500 text-3xl gap-3">
              <div class="">2022</div>
              <div class="text-right">121</div>
              <div></div>
            </div>
          </div>
          <div class="mx-2 mt-7 mb-11">
            <p class="font-bold text-2xl mb-7 text-green-600">Check-ins by day</p>
            <div class="m-auto flex flex-row gap-3 justify-around mx-3">
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-green-600" style="height: 42.0488%;">
                    <div class="flex font-bold -mt-6 justify-center">27</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Sun</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-green-600" style="height: 5.82927%;">
                    <div class="flex font-bold -mt-6 justify-center">3</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Mon</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-green-600" style="height: 13.0732%;">
                    <div class="flex font-bold -mt-6 justify-center">5</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Tues</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-green-600" style="height: 5.82927%;">
                    <div class="flex font-bold -mt-6 justify-center">6</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Wed</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-green-600" style="height: 34.8049%;">
                    <div class="flex font-bold -mt-6 justify-center">19</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Thur</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-lime-500" style="height: 100%;">
                    <div class="flex font-bold -mt-6 justify-center">44</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Fri</div>
                </div>
              </div>
              <div class="w-full text-green-600">
                <div class="h-[100px] items-end flex">
                  <div class="w-full bg-lime-500" style="height: 100%;">
                    <div class="flex font-bold -mt-6 justify-center">44</div>
                  </div>
                </div>
                <div class="mt-1">
                  <div class="flex text-center justify-center font-bold">Sat</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-green-600 p-4 md:p-16 mx-1 mb-4 gap-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <p class="text-white font-bold text-2xl leading-10">My Average Rating:</p>
            <div class="flex items-center text-white gap-4">
              <p class="flex font-bold text-8xl leading-none">3.49</p><svg viewBox="0 0 58 58" fill="none"
                xmlns="http://www.w3.org/2000/svg" style="width: 60px; height: 60px;">
                <path
                  d="M26.173 2.722a3.55 3.55 0 0 1 5.654 0 3.55 3.55 0 0 0 4.617.918 3.55 3.55 0 0 1 5.224 2.164 3.55 3.55 0 0 0 3.914 2.616 3.55 3.55 0 0 1 3.998 3.998 3.55 3.55 0 0 0 2.616 3.914 3.55 3.55 0 0 1 2.164 5.224 3.55 3.55 0 0 0 .918 4.617 3.55 3.55 0 0 1 0 5.654 3.55 3.55 0 0 0-.918 4.617 3.55 3.55 0 0 1-2.164 5.224 3.55 3.55 0 0 0-2.615 3.914 3.55 3.55 0 0 1-3.999 3.998 3.55 3.55 0 0 0-3.914 2.616 3.55 3.55 0 0 1-5.224 2.164 3.55 3.55 0 0 0-4.617.918 3.55 3.55 0 0 1-5.654 0 3.55 3.55 0 0 0-4.617-.918 3.55 3.55 0 0 1-5.224-2.164 3.55 3.55 0 0 0-3.914-2.615 3.55 3.55 0 0 1-3.998-3.999 3.55 3.55 0 0 0-2.616-3.914 3.55 3.55 0 0 1-2.164-5.224 3.55 3.55 0 0 0-.918-4.617 3.55 3.55 0 0 1 0-5.654 3.55 3.55 0 0 0 .918-4.617 3.55 3.55 0 0 1 2.164-5.224 3.55 3.55 0 0 0 2.616-3.914 3.55 3.55 0 0 1 3.998-3.998 3.55 3.55 0 0 0 3.914-2.616 3.55 3.55 0 0 1 5.224-2.164 3.55 3.55 0 0 0 4.617-.918Z"
                  fill="transparent" stroke="currentColor" stroke-width="2"></path>
              </svg>
            </div>
          </div>
          <div class="flex flex-col px-5 items-center justify-between gap-4 md:flex-row undefined">
            <p class="text-3xl font-medium text-green-600">My first checkin was <span class="font-bold">San Chico</span>
              on New Years day</p>
            <div>
              <div class="relative" style="width: 300px; height: 300px;"><img alt="beer image" loading="lazy"
                  decoding="async" data-nimg="fill" class="absolute top-0 left-0 rounded-full"
                  style="position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; color: transparent;"
                  sizes="100vw"
                  srcset="/assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-1.jpg 640w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-2.jpg 750w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-3.jpg 828w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-4.jpg 1080w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-5.jpg 1200w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-6.jpg 1920w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280-7.jpg 2048w, /assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280.jpg 3840w"
                  src="/assets/images/experiments/untappd/8d7a8f02286b6629cda1ea4b9c5a7264_1280x1280.jpg"><img alt=""
                  loading="lazy" width="300" height="300" decoding="async" data-nimg="1" class="absolute top-0 left-0"
                  style="color: transparent;"
                  srcset="/assets/images/experiments/untappd/white_mask.14c5ea5e-1.png 1x, /assets/images/experiments/untappd/white_mask.14c5ea5e.png 2x"
                  src="/assets/images/experiments/untappd/white_mask.14c5ea5e.png"></div>
            </div>
          </div>
        </div>
      </div>
      <div id="BADGES" class="m-3 mb-8 scroll-margin bg-orange-500 text-white">
        <div class="px-5 font-medium flex gap-2 items-center">
          <h2 class="flex-1 text-7xl text-white font-bold">Badges</h2>
        </div>
        <div>
          <div class="bg-green-600 p-4 mx-1 flex-column items-center text-white">
            <p class="text-3xl leading-10 md:px-16">My top badges</p>
            <div class="bg-green-600 md:pb-2 md:px-16 mx-1">
              <div class="grid grid-cols-3 text-2xl items-center mt-1">
                <div>Badge</div>
                <div class="col-span-2 text-right">Level</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-300">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_VerifiedVenue_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_VerifiedVenue_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_VerifiedVenue_sm.jpg">Verified Adventure</div>
                <div class="text-right motion-safe:animate-pulse">100</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-pink-500">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_GloryCan_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_GloryCan_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_GloryCan_sm.jpg">For the Can</div>
                <div class="text-right motion-safe:animate-pulse">85</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-orange-500">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_brewery_prioneer_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_brewery_prioneer_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_brewery_prioneer_sm.jpg">Brewery Pioneer</div>
                <div class="text-right motion-safe:animate-pulse">63</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-500">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_RidingSteady_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_RidingSteady_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_RidingSteady_sm.jpg">Riding Steady</div>
                <div class="text-right motion-safe:animate-pulse">62</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-red-500">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_PaleMoon_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_PaleMoon_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_PaleMoon_sm.jpg">Pale as the Moon</div>
                <div class="text-right motion-safe:animate-pulse">58</div>
              </div>
            </div>
          </div>
          <div class="my-5 mx-4 font-bold text-2xl text-green-600 leading-8">I earned 111 badges in 2023! <span
              class="font-medium">1 less than
              last year.</span></div>
          <div class="bg-green-600 p-4 mx-1 flex-column items-center text-white">
            <p class="text-3xl leading-10 md:px-16">My top local badges</p>
            <div class="bg-green-600 md:pb-2 md:px-16 mx-1">
              <div class="grid grid-cols-3 text-2xl items-center mt-1">
                <div>Badge</div>
                <div class="col-span-2 text-right">LVL</div>
              </div>
              <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-300">
                <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                    decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                    srcset="/assets/images/experiments/untappd/bdg_untappdAtHome_sm-1.jpg 1x, /assets/images/experiments/untappd/bdg_untappdAtHome_sm.jpg 2x"
                    src="/assets/images/experiments/untappd/bdg_untappdAtHome_sm.jpg">Untappd at Home</div>
                <div class="text-right motion-safe:animate-pulse">59</div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6"></div>
        </div>
      </div>
      <div></div>
      <div id="BREWERIES" class="m-3 mb-8 scroll-margin bg-red-600 text-white">
        <div class="px-5 font-medium flex gap-2 items-center">
          <h2 class="flex-1 text-7xl text-white font-bold">Breweries</h2>
        </div>
        <div>
          <div class="mx-1 bg-green-600 text-white mb-4">
            <div class="p-4 pr-6">
              <p class="font-bold text-3xl text-white">I drank from 39 unique breweries.</p>
            </div>
          </div>
          <div class="mb-4">
            <div class="bg-green-600 p-4 mx-1 flex-column items-center text-white">
              <p class="text-3xl leading-10 md:px-16">My top breweries</p>
              <div class="bg-green-600 md:pb-2 md:px-16 mx-1">
                <div class="grid grid-cols-3 text-2xl items-center mt-1">
                  <div>Brewery</div>
                  <div class="col-span-2 text-right">Beers drunk</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-300">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/brewery-14539_db827-1.jpeg 1x, /assets/images/experiments/untappd/brewery-14539_db827.jpeg 2x"
                      src="/assets/images/experiments/untappd/brewery-14539_db827.jpeg">Garage Project</div>
                  <div class="text-right motion-safe:animate-pulse">42</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-pink-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/brewery-22046_6ef12-1.jpeg 1x, /assets/images/experiments/untappd/brewery-22046_6ef12.jpeg 2x"
                      src="/assets/images/experiments/untappd/brewery-22046_6ef12.jpeg">Baylands Brewery</div>
                  <div class="text-right motion-safe:animate-pulse">25</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-orange-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/brewery-73616_cc140-1.jpeg 1x, /assets/images/experiments/untappd/brewery-73616_cc140.jpeg 2x"
                      src="/assets/images/experiments/untappd/brewery-73616_cc140.jpeg">Behemoth Brewing Company</div>
                  <div class="text-right motion-safe:animate-pulse">8</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/brewery-14582_25978-1.jpeg 1x, /assets/images/experiments/untappd/brewery-14582_25978.jpeg 2x"
                      src="/assets/images/experiments/untappd/brewery-14582_25978.jpeg">Parrotdog</div>
                  <div class="text-right motion-safe:animate-pulse">5</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-red-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/brewery-3555_c5bdb-1.jpeg 1x, /assets/images/experiments/untappd/brewery-3555_c5bdb.jpeg 2x"
                      src="/assets/images/experiments/untappd/brewery-3555_c5bdb.jpeg">Epic Brewing Company </div>
                  <div class="text-right motion-safe:animate-pulse">5</div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6"></div>
        </div>
      </div>
      <div id="LOCATIONS" class="m-3 mb-8 scroll-margin bg-lime-400 text-green">
        <div class="px-5 font-medium flex gap-2 items-center">
          <h2 class="flex-1 text-7xl text-green font-bold">Locations</h2>
        </div>
        <div>
          <div class="mx-1 bg-green-600 text-white mb-4">
            <div class="p-4 pr-6">
              <p class="font-bold text-3xl text-white">I visited 15 unique venues. <span class="font-medium">6 more than
                  last year!</span></p>
            </div>
          </div>
          <div class="mb-4">
            <div class="bg-green-600 p-4 mx-1 flex-column items-center text-white">
              <p class="text-3xl leading-10 md:px-16">My Favourite Venues
              <p>
              <div class="bg-green-600 md:pb-2 md:px-16 mx-1">
                <div class="grid grid-cols-3 text-2xl items-center mt-1">
                  <div>Venue</div>
                  <div class="col-span-2 text-right">Total Visits</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-300">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/venue_302410_77f91fdc_bg_64-1.png 1x, /assets/images/experiments/untappd/venue_302410_77f91fdc_bg_64.png 2x"
                      src="/assets/images/experiments/untappd/venue_302410_77f91fdc_bg_64.png">Baylands Brewery
                    Taproom</div>
                  <div class="text-right motion-safe:animate-pulse">21</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-pink-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/stadium_bg_64-1.png 1x, /assets/images/experiments/untappd/stadium_bg_64.png 2x"
                      src="/assets/images/experiments/untappd/stadium_bg_64.png">Beervana</div>
                  <div class="text-right motion-safe:animate-pulse">14</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-orange-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/pub_bg_64-1.png 1x, /assets/images/experiments/untappd/pub_bg_64.png 2x"
                      src="/assets/images/experiments/untappd/pub_bg_64.png">Onetangi Beach</div>
                  <div class="text-right motion-safe:animate-pulse">8</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-lime-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/pub_bg_64.png">Alibi Brewers Lounge</div>
                  <div class="text-right motion-safe:animate-pulse">3</div>
                </div>
                <div class="grid grid-flow-col text-3xl mb-3 leading-none text-red-500">
                  <div class="flex flex-row gap-3 items-center "><img alt="friend" loading="lazy" width="32" height="32"
                      decoding="async" data-nimg="1" class="rounded-full" style="color: transparent; object-fit: cover;"
                      srcset="/assets/images/experiments/untappd/pub_bg_64.png">Club Tropicana</div>
                  <div class="text-right motion-safe:animate-pulse">3</div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 pb-6"></div>
        </div>
      </div>
    </div>
  </div>
</div>