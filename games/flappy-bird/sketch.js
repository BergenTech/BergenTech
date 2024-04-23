//variables
var screen = 0
var flappy
var pipes=[]
var pipes2=[]
var pipes3=[]
var word='Press space to move'
var score=0
var topscore=[]
var highscore
var speed=0


/********* SETUP BLOCK ********/
function preload(){
  //load images
  birdimg=loadImage('images/bird.png')
  bg=loadImage('images/flappy-background.png')
  pipe=loadImage('images/pipe.png')
  pipe2=loadImage('images/pipe2.png')
  pipe3=loadImage('images/pipe3.png')
  play=loadImage('images/play.png')
}

function setup() {
  createCanvas(600, 311)
  //make flappy a Bird
  flappy=new Bird(height/2)
}

/********* DRAW BLOCK *********/
function draw() {
  background(bg)
  //switch through screens
  if (screen == 0) {
    welcome()
  } 
  else if(screen == 1){
    createPipe()
    //1:easy 2:medium 3:hard
    playscreen(2)
    
  }
  else{
    end()
  }
}

/******* SCREEN CONTENTS *****/
function welcome() {
  //make flappy bird text
  textAlign(CENTER);
  textFont('fantasy')
  fill('white')
  textSize(72)
  text('Flappy Bird',width/2,height/2)
  fill('black')
  textSize(71);
  text('Flappy Bird',width/2,height/2)
  fill('lime')
  textSize(69);
  text("Flappy Bird", width / 2, height / 2)
  
  //add the play button
  play.resize(80,40)
  image(play, 260, 211)
  
}

function playscreen(lst){
  //determine which list is used and the speed
  if(lst==1){
    for (var i = 0; i<99; i++) {
    pipes[i].display()
    pipes[i+1].x=pipes[i].x+150
    speed=2
    if(pipes[i].x==flappy.x){
      score++
    }
  }
  }
  else if(lst==2){
    for (var i = 0; i<99; i++) {
    pipes2[i].display()
    pipes2[i+1].x=pipes2[i].x+150
    speed=3
    if(pipes2[i].x==flappy.x){
      score++
    }
  }
  }
  else if(lst==3){
    for (var i = 0; i<99; i++) {
    pipes3[i].display()
    pipes3[i+1].x=pipes3[i].x+150
    speed=4
    if(pipes3[i].x==flappy.x){
      score++
    }
  }
  }
  
  //display bird
  flappy.display()
  //if the bird hits the ground, go to end screen
  if(flappy.y>height-25){
    screen=2
  }
  //text for score
  fill('black')
  textSize(30);
  text('Score: '+score, 80, 50)
  fill('black')
  textSize(30);
  //text to click space to start
  text(word, width / 2, height / 2)
  //after clicking space, the word is ' ', when the word is ' ' all the aspects start moving
  if(word==' '){
    //move bird
    flappy.move()
    //move pipes based on which list is chosen
    for (var i = 0; i < 90; i++) {
      if(lst==1){
        pipes[i].move(speed)
      }
      else if(lst==2){
        pipes2[i].move(speed)
      }
      else if(lst==3){
        pipes3[i].move(speed)
      }
  } 
  }
}

function end(){
  flappy.display()
  //game over text
  textAlign(CENTER);
  textFont('fantasy')
  fill('white')
  textSize(72)
  text('Game Over',width/2,height/2)
  fill('black')
  textSize(71);
  text('Game Over',width/2,height/2)
  fill('Yellow')
  textSize(69);
  text("Game Over", width / 2, height / 2)
  //reset text
  fill('black')
  textSize(20);
  text("Press R to reset", width / 2, height / 2+130)
  //score text
  fill('yellow')
  textSize(30)
  text("Score: "+str(score),width/2,height/2+50)
  text("High Score: "+str(highscore),width/2,height/2+80)
  fill('black')
  textSize(29)
  //adds score to topscore list, then highscore is the greatest topscore
  topscore.push(score)
  highscore=max(topscore)
  text("Score: "+str(score),width/2,height/2+50)
  text("High Score: "+str(highscore),width/2,height/2+80)
}

function createPipe(){
  //create pipes for each list
  for(var i=0; i<100;i++){
    pipes.push(new Pipe())
    pipes2.push(new Pipe2())
    pipes3.push(new Pipe3())
  }
}

/********* INPUTS *********/
function mousePressed() {
  //go to play scree when play button is pressed
  if (mouseX < 340 && mouseX > 260 && mouseY > 211 && mouseY < 251) {
    screen=1
}
}
function keyPressed() {
  //on the playscreen, clicking space makes the word ' ' and calls flap function for the bird
  if (screen == 1) {
    if (keyIsDown(32) && keyCode == 32) {
      word=' '
      flappy.flap()
      
    }
  }
  //click R (reset) to go back to welcome screen and reset variables
 if(screen==2){
   if (keyIsDown(82) && keyCode == 82) {
     screen=0
     flappy.y=height/2
     score=0
     word='Press space to move'
   }
 }
}