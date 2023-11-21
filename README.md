# koda(hash) template

Template for testing generative art that can be minted [KodaDot](https://kodadot.xyz/)

## Preface

This template is a good starter for testing generative art that can be minted on [KodaDot](https://kodadot.xyz/). It uses [Nitro](https://nitro.unjs.io/) as a framework and [p5.js](https://p5js.org/) for drawing.

Structure of the template:
- `public/index.html` - main HTML file
- `public/script.js` - script that generates the generative art, ideally just pasted from [p5.js editor](https://editor.p5js.org/) 
- `public/style.css` - style for the HTML file

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 18.0.0

### Development Server

Start the development server on <http://localhost:3000>

```bash
npx nitropack dev
```

In case you want to see it on your mobile phone

```bash
npx nitropack dev --host
```

### Good to know

**KodaDot uses url param called hash to generate the image.**

`http://localhost:3000/?hash=0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c` 

*the length of the hash is 66 characters (0x + 64 characters).*

To get the hash from url to your script use:

```js
const DEFAULT_HASH = '0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c'
const params = getURLParams();

hash = params.hash || DEFAULT_HASH;
console.log(hash);
```

> Note: If you want do not supply hash in url, it will use default hash.

**To ensure correct view of the art on KodaDot**

Try to use canvas size that is automatically set to 1:1 ratio. 

This will ensure that the art will be displayed correctly on KodaDot.

On the snippet below you can see how to set canvas size to 1:1 ratio.
It will use smaller dimension of the screen (either width or height) as a canvas size.

```js
canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

createCanvas(canvasSize, canvasSize);
```

**Testing variability of the art**

To ensure that the art is not always the same, you can use the hashes from `hash.txt` file.

> Make sure that same hash will always generate the same art.

