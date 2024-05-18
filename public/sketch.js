const DEFAULT_HASH =
  '0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c'

let hash
let seed = 0
let bg = [] // background color

function setup() {
  canvasSize = min(windowWidth, windowHeight)

  createCanvas(canvasSize, canvasSize)

  const params = getURLParams()

  hash = params.hash || DEFAULT_HASH

  seed = hashToSeed(hash)
  randomSeed(seed) // ART is deterministic now
  noiseSeed(seed) // Perlin noise too  
  console.log(hash, seed)

  // using random to generate a random color
  bg = [random(255), random(255), random(255)]

  noLoop() // In case you need to draw only once
}

function draw() {
  background(bg)
  // Once the drawing is done, we can send the image to the parent window
  postMessageKoda()
}

function windowResized() {
  canvasSize = min(windowWidth, windowHeight)

  resizeCanvas(canvasSize, canvasSize)
}

// KODA(HASH) UTILITY FUNCTIONS
// ----------------------------

// You can use your own function to convert the hash to a seed
function hashToSeed(hash) {
  let _seed = 0
  for (let hl = 0; hl < 60; hl = hl + 12) {
    _seed += parseInt(hash.substring(hl, hl + 12), 16)
  }
  return _seed
}

function extractCanvasDetails(canvas) {
  const ctx = canvas.getContext("2d");

  const details = {
    width: canvas.width,        
    height: canvas.height,      
    pixelDensity: window.devicePixelRatio, 
    fillStyle: ctx.fillStyle,   
    strokeStyle: ctx.strokeStyle, 
    lineWidth: ctx.lineWidth,   
    globalAlpha: ctx.globalAlpha, 
    globalCompositeOperation: ctx.globalCompositeOperation, 
    transform: ctx.getTransform(), 
  };


  // Compute base64 representation of the details
  const base64Details = btoa(JSON.stringify(details));

  return { details, base64Details };
}

function postMessageKoda() {
  console.log('Talking')
  const canvas = document.querySelector('canvas')
const { details, base64Details } = extractCanvasDetails(canvas);
  const message = {
    id: seed,
    type: 'kodahash/render/completed',
    payload: {
      version: "1.0",
      hash: hash,
      type: 'image/png',
      image: canvas ? canvas.toDataURL('image/png') : null,
      search: location.search,
      attributes: details,
      base64Details,
    },
  }
  console.log('Sending', message)

  window.parent.postMessage(message, '*')
}
