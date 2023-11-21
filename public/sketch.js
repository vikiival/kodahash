const DEFAULT_HASH = '0x175adf5fc058830a6319b8238ecc911db6e1b8dd40965629b5f0c5bee655598c'

function setup() {
  canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

  createCanvas(canvasSize, canvasSize);

  const params = getURLParams();

  hash = params.hash || DEFAULT_HASH;
  console.log(hash);
}

function draw() {
  background(220);
}

function windowResized() {
  canvasSize = windowWidth < windowHeight ? windowWidth : windowHeight

  resizeCanvas(canvasSize, canvasSize);
}