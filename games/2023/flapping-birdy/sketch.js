var screen = 1
var pipes = []
var coins = [] 
var bird
var offset = 150
var distance = 0
var score = 0
var titleCard
var multiplier = 1
var finalScore
/********* SETUP BLOCK ********/
function setup() {
  createCanvas(800, 600)
    
    bird = {color: 'yellow', x: width/2, y: height/2,d: 45 , ySpeed: 0, acceleration: 0.2}
   
}
function preload(){
  titleCard =  loadImage('images/gold_metal_sign.png')
}

/********* DRAW BLOCK *********/
function draw() {
    // changes the displayed screen based on the screen variable
  if (screen == 1) {
    screen1()
  }
else if (screen == 2){
    screen2()
}
else if(screen == 3){
    screen3()
}
}

/******* SCREEN CONTENTS *****/
function screen1() {
    // title screen
  background(50,168,164)
  push()
  fill(214, 210, 197)
  rect(50,50,700,500)
  fill(0)
  textSize(50);
  textAlign(CENTER);
  imageMode(CENTER)
  image(titleCard, width/2 ,200, 400,125)
  image(titleCard,width/2 - 30,475,200,62.5)
  text("Flapping Birdy", width / 2, 215)
  textSize(35)
  text("Play", width/2 -30,485)
  textAlign(LEFT)
  imageMode(CORNER)
  fill(0)
  textSize(30)
  text('Collect:',75, 375)
  text('To Score Points', 75, 430)
  fill(105, 83, 6)
  circle(215, 365, 65)
  fill(0)
  text('Avoid:',450, 375)
  text('To Avoid Death', 450, 430)
  textSize(20)
  text('Press Space to Flap', 250 , 300)
  fill('green')
  rect(545,325,25,65)
  pop()
}


function screen2(){
    // game screen
    background(50,168,164)
    displayBird()
    
    displayScore()
    birdGravity()
    checkBounds()
    for(var i = 0; i < pipes.length; i ++){
        pipes[i].display()
    }
    for(var i = 0; i <coins.length;i++){
        coins[i].display()
    }
    checkCollision(coins) // main function call 1
    checkCollision(pipes) // main function call 2
    displayScore()
    changeScoreModifier()
}
function screen3(){
    // game over screen
  background(50,168,164)
  push()
  fill(214, 210, 197)
  rect(50,50,700,500)
  fill(0)
  textSize(50);
  textAlign(CENTER);
  imageMode(CENTER)
  image(titleCard, width/2 ,200, 400,125)
  text("Game Over", width / 2, 215)
  pop()
  displayFinalScore()
}
/********* INPUTS *********/
function mousePressed() {
    if(screen == 1){
        if((mouseX > 270) && (mouseX < 470) && (mouseY > 445) && (mouseY < 445+62.5)){
            // starts the game by starting the interval of creating coins and pipes and changes the screen to the game screen
            pipeAndCoinInterval = setInterval(createPipesAndCoin,1500)
            screen = 2
        }
    }
}

function keyPressed() {
   if(screen ==2){
       if(keyCode == 32){
        bird.ySpeed = -5
        } 
   }
}


/******* OTHER FUNCTIONS *******/

function displayBird(){
    push()
    noStroke()
    fill(bird.color)
    circle(bird.x,bird.y, bird.d)
    pop()
}

function birdGravity(){
    bird.y += bird.ySpeed
    bird.ySpeed += bird.acceleration
    
}

function checkBounds(){
        if (keyCode == 32 && bird.y <= 0+ bird.d/2){
           bird.ySpeed = 0
           bird.y = bird.d/2
        }
        if(bird.y <= 0+ bird.d/2 ){
            bird.ySpeed += bird.acceleration
        }
       if(bird.y + bird.d/2 >= height){
           clearInterval(pipeAndCoinInterval)
           screen = 3
        }
}

function checkCollision(list){
    for(var i = 0; i < list.length; i ++){
        // checks if the object is a rectangle which would mean it's a pipe
        if(list[i].id == 'rectangle'){
            // deletes pipe if off screen
            if(list[i].x + list[i].w <= 0){
                list.splice(i,1)
            }
            closex = bird.x
            closey = bird.y
            // checks left of pipe
            if(bird.x <list[i].x) closex = list[i].x 
            // checks the right of the pipe
            else if (bird.x > (list[i].x + list[i].w)) closex = (list[i].x + list[i].w) 
            // checks the top of the pipe (only applies to the bottom pipe)
            if (bird.y < list[i].y) closey = list[i].y 
            // checks the bottom of the pipe (only applies to the top pipe)
            else if (bird.y > (list[i].y + list[i].h)) closey = (list[i].y + list[i].h) 
            distance = dist(bird.x,bird.y,closex,closey)
            if(distance <= bird.d/2){
                clearInterval(pipeAndCoinInterval)
                screen = 3
                
            }
            
        }
            // checks if the object in the list is a circle which would mean it's a coin
        else if(list[i].id == 'circle'){
            // deletes coin if off screen
            if((list[i].x - list[i].d/2) <= 0){
                list.splice(i,1)
                break
            }
            // checks if the distance between x and y coordinates of the bird and coin are less than the sum of their radii, if so it means they are colliding
            if(dist(bird.x,bird.y,list[i].x,list[i].y)< ((bird.d+list[i].d)/2)){
                score++
                list.splice(i,1)
                break
            }
        }
    }
} 

function changeScoreModifier(){
            if (score >= 5){
                multiplier = 1.5
            } else if(score >= 10){
                multiplier = 2.0
            }
            else if(score >= 15){
                multiplier = 2.5
            }
             else if(score >= 20){
                multiplier = 2.75
            }
              else if(score >= 25){
                multiplier = 3
            }
              else if(score >= 30){
                multiplier = 3.25
            }
              else if(score >= 35){
                multiplier = 3.45
            }
              else if(score >= 40){
                multiplier = 3.5
            }
              else if(score >= 45){
                multiplier = 3.6
            }
              else if(score >= 50){
                multiplier = 3.65
            }
              else if(score >= 55){
                multiplier = 3.7
            }
              else if(score >= 60){
                multiplier = 3.9
            }
              else if(score >= 65){
                multiplier = 4.0
            }
    
}



function createPipesAndCoin(){
    x = width
    y = random(-570,-200)
    coins.push(new Coin (x+25,y+600+offset/2,'circle'))
    for(var i =0 ; i <2; i++){
        pipes.push(new Pipe(x,y,'rectangle'))
        y = y + 600 + offset
    }
}



function displayScore(){
    push()
    textSize(30)
    fill(105, 83, 6)
    circle(50,60,65)
    fill(0)
    text(": " + score, 90, 65)
    pop()
}

function displayFinalScore(){
    finalScore = round(score * multiplier)
    push()
    textSize(45)
    textAlign(CENTER)
    text("Final Score: " + finalScore, width/2, height/2+100)
    pop()
}
/******* CLASSES *******/
class Pipe {
    constructor(x,y,id){
        this.x = x 
        this.y = y
        this.id = id
        this.h = 600
        this.w = 50
        this.s = 3
        
    }
    display(){
        push()
        fill('green')
        rect(this.x,this.y, this.w, this.h)
        this.x -= this.s
        pop()
    }
    
}
class Coin {
    constructor(x,y,id){
        this.x = x
        this.y = y
        this.id = id
        this.d = 65
        this.s = 3
    }
    display(){
        push()
        noStroke()
        fill(105, 83, 6)
        circle(this.x,this.y,this.d)
        this.x -= this.s
        pop()
    }
}

// Used Assets

// Gold plate from https://www.1001freedownloads.com/free-clipart/gold-metal-sign