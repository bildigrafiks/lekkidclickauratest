// Añadir siempre un poco de color a la aura
// 1a aura é só brilho
// 2a aura brilho + partículas
// 3a aura campo magnético borbulja
// 4a cuerpo y partículas brilhan blanco
// final de nível: explosão de luz
// Partículas em órbita ? 

const particles = [];
let posX, posY; 
let img;
let mouseOn;
let interval = 8;
let radius = 70, dissipation = 6;

function preload() {
  img = loadImage('img/fondo-negro.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  rectMode(CENTER);
  posX = width/2, posY = height/2;
}

function draw() {
  background(60);
  image(img, 0, 0);
  if(frameCount % interval == 0){
    let p = new Particle();
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
  detectMouse();
  fill(250, 110, 110, 1);
  for(i = 0; i < radius; i++){
    ellipse(posX, posY, i*dissipation);
  }
  fill(255, 55, 60);
  rect(posX, posY, 80, 200);

  if (mouseOn){
    interval = 1;
    if (radius < 100){
      radius += 1;
    }
  } else {
    interval = 4;
    if (radius >= 70){
      radius -= 1;
    }
  }
}

class Particle {

  constructor() {
    this.x = posX;
    this.y = posY;
    this.r = 18;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 2;
    this.r -= 0.05;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    rect(this.x, this.y, this.r, this.r);
  }
}

function detectMouse(){
  if(mouseX > 10 && mouseY > 10 && mouseX < width-10 && mouseY < height-10){
  posX = mouseX;
  posY = mouseY;
  } else{
    posX = width/2;
    posY = height/2;
  }
}

function mousePressed() {
  mouseOn = true;
}

function mouseReleased() {
  mouseOn = false;
}