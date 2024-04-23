/********* GLOBAL VARIABLES ********/
var screen = 1
var bg, bbshooter, cannonImage, ballImg
var cannon1
var balls = []
var bubbles = [], images = []
var points = 0, level = 1
var interval
var time = 0
var total = 0
var bubbleSpeed = 1
/********* SETUP BLOCK ********/
function preload() {
  bbshooter = loadImage('images/bubbleshooter.png')
  cannonImage = loadImage('images/cannon.png')
  playbutton = loadImage('images/playbutton.png')
  bg = loadImage('images/background.png')
  ballImg = loadImage('images/ball.png')
  for (var i = 0; i < 11; i++) {
    images.push(loadImage('images/bb' + i + '.png'));
  }
}
function setup() {
  createCanvas(470, 500)
  noStroke()
  cannon1 = new Cannon(width / 2)
  angleMode(DEGREES)
  setInterval(createBubbles,random(2000,4000),2)
}
/********* DRAW BLOCK *********/
function draw() {
  if (screen == 1) {
    welcomeScreen()
  } else if (screen == 2) {
    playScreen()
  }
}

/********* INPUTS *********/
function mousePressed() {
  if (mouseX < width / 2 + 75 && mouseX > width / 2 - 75 && mouseY < 490 && mouseY > 430) {
    if (screen == 1) {
      screen = 2
      interval = setInterval(timer,1000)
    }
  }
}

function keyPressed() {
  if (screen == 2) {
    if (keyIsDown(32) && keyCode == 32) {
      balls.push(new cannonBall())
    }
  }
}

/******* OTHER FUNCTIONS *******/
function welcomeScreen() {
  push()
  background(bg)
  imageMode(CENTER)
  image(bbshooter, width / 2, height / 2 - 30, 350, 350)
  image(playbutton, width / 2, height - 40)
  pop()
}
function playScreen() {
  background(bg)
  score()
  for (var i = 0; i < bubbles.length; i++) {
  
    bubbles[i].display()
  }
  for (var i = 0; i < bubbles.length; i++) {
    if(bubbles[i].y>500){
      bubbles.splice(i,1)
    }
  }
  for (var j = 0; j < balls.length; j++) {
    balls[j].create()
    balls[j].shoot()
    balls[j].hit(bubbles,j)    
  }
  cannon1.display()
  cannon1.control()
  cannon1.rotateCannon()
  levels()
}

function createBubbles(row) {
  for (var j = 0; j < row; j++) {
    for (var i = 0; i < 9; i++) {
      bubbles.push(new Bubble(random(0,470),random(-500,0),bubbleSpeed))
    }
  }
}

function score(){
  textSize(20)
  textAlign(CENTER)
  text('Score : '+str(points),50,30)
  text('Timer : '+str(time),470/2,30)
  text('Level : '+str(level),420,30)
}

function timer(){
  time++
}

function levels(){
  if(points==level*50){
    level++
    bubbleSpeed++
  }
}