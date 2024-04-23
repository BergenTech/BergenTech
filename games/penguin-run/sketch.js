var screen = 0
var back1 = { x: 0, y: 0, s: -4, l: 1560, h: 430 }
var back2 = { x: 1560, x2: 2752, y: 0, s: -4, l: 1192, h: 430 }
var player = { x: -60, y: 300, l: 60, h: 78, f: 0, a:0.3 }
var coins = []
var missiles = []
var coinspeed = -5
var distance = 0
var coinCount = 0
var totalscore = 0
var delay = 0
var arrow = 600, arrowWood = 400,arrowtext = 450
let music, font
var muted = 0
var flying = 0
var smokes = []
var powers = []
var pId

/********* SETUP BLOCK ********/
function setup() {
  createCanvas(700, 400)
  //music
  music = createAudio('Elektronomia - Sky High [NCS Release].mp3')    
  music.volume(0.1)
  music.play()
}

/********* DRAW BLOCK *********/
function preload() {
  bg = loadImage('images/background.jpg')
  bg2 = loadImage('images/background2.jpeg')
  jetpack = loadImage('images/jetpack.png')
  coinimg = loadImage('images/coin.png')
  missileimg = loadImage('images/missile.png')
  deathimg = loadImage('images/death.gif')
  avoid = loadImage('images/avoid.png')
  wood = loadImage('images/wood.png')
  collect = loadImage('images/wordart.png')
  startimg = loadImage('images/start.png')
  over = loadImage('images/gameover.png')
  restart = loadImage('images/restart.png')
  uparrow = loadImage('images/up.png')
  font = loadFont('Bangers.ttf')
  unmute = loadImage('images/unmute.png')
  mute = loadImage('images/mute.png')
  smokeimg = loadImage('images/smoke.png')
}

function draw() {
  //loop keypressed to move up
  keyPressed()
  //set font file
  textFont(font)
  //screens
  if (screen == 0) {
    start()
  }
  else if(screen==1){
    enterscreen()
  }
  else if (screen == 2) {
    playscreen()
  }
  else if (screen==3){
    deathscreen()
  }
  else if (screen==4){
    endscreen()
  }
  //display mute button over all screens
  muteButton()
}

/******* SCREEN CONTENTS *****/
function start() {
  createCanvas(800, 410)
  //background
  image(bg, back1.x, back1.y, back1.l, back1.h)
  push()
  imageMode(CENTER)
  //starting page and button
  image(wood,400,205,600,330)
  image(startimg,400,260,230,85)
  textSize(80)
  textAlign(CENTER)
  text('Penguin Run',400,140)
  pop()
  image(missileimg,150,250,90,90)
  image(avoid,150,160,100,100)
  image(coinimg,575,250,80,80)
  image(collect,550,160,120,80)
}

function enterscreen(){
  //background
  image(bg, back1.x, back1.y, back1.l, back1.h)
  //player moves onto screen
  image(jetpack, player.x,player.y, player.l, player.h)
  //instruction
  image(wood,400,60,300,140)
  textSize(40)
  text('Move\nUsing',arrowtext,115)
  image(uparrow,arrow,80,80,100)
  //stop player at point and start playscreen
  if(player.x<50){
    player.x+=2
  }
  else if(player.x=50){
    screen=2
    //start intervals for coins, points, and missiles
    coininterval = setInterval(createCoins, random(2000, 3000))
    obstacleinterval = setInterval(createObstables,2000)
    pointinterval = setInterval(points,50)
    power = setInterval(powerbox,15000)
  }

}

function playscreen() {
  createCanvas(800, 410)
  moveBackground()
  //scroll away instructions
  image(wood,arrowWood,60,300,140)
  arrowWood-=3
  textSize(40)
  text('Move\nUsing',arrowtext,115)
  arrowtext-=3
  image(uparrow,arrow,80,80,100)
  arrow-=3
  //make smoke and player
  makeSmoke()
  playerFunction()
  //display coins
  for (var j = 0; j < coins.length; j++) {
    coins[j].display()
  }
  //display missiles
  for (var i = 0; i < missiles.length;i++){
    missiles[i].display()
  }
  //display smoke
  for(var h=0;h<smokes.length;h++){
    smokes[h].display()
  }
  //display power
  for(var k=0;k<powers.length;k++){
    powers[k].display()
  }

  //call collision to start traversing
  collisions(coins)
  collisions(missiles)
  collisions(powers)
  //score in corners
  scoreDisplay()
  powerText()
}

function deathscreen(){
  //stop all intervals
  image(bg,back1.x,back1.y,back1.l,back1.h)
  image(bg2, back2.x, back2.y, back2.l, back2.h)
  image(bg2, back2.x2, back2.y, back2.l, back2.h)
  clearScreen(coins)
  clearScreen(missiles)
  clearScreen(smokes)
  clearScreen(powers)
  //play death gif and play ending screen
  image(deathimg,player.x+=4,player.y+=player.f,100,80)
  player.f +=player.a
  if(player.y>=450){
    screen=4
  }
}

function endscreen(){
  //stop backgrounds
  image(bg,back1.x,back1.y,back1.l,back1.h)
  image(bg2, back2.x, back2.y, back2.l, back2.h)
  image(bg2, back2.x2, back2.y, back2.l, back2.h)
  push()
  //display wood for end screen
  imageMode(CENTER)
  image(wood,400,205,600,300)
  clearScreen(coins)
  //wait 1 second then put game over
  if(delay>=60){
    textAlign(CENTER)
    textSize(90)
    text('Game Over',400,150)
    textSize(40)
    fill(0)
    text('Score : '+totalscore,400,220) 
    //wait another second then start counting score
    if(delay==120){
      if(distance>100){
        countTotal()
        distance -=10
        totalscore +=10
      }
      if(distance>0){
        countTotal()
        distance -=1
        totalscore +=1
      }
      else if(coinCount>0){
        countTotal()
        coinCount-=1
        totalscore+=5
      }
      else{
        //after score counted put restart button
        image(restart,400,290,100,100)
      }
    } 
    else if(delay<120){
      delay+=1
    }
  }
  else if(delay<60){
    delay+=1
  }
  pop()
}

/********* INPUTS *********/
function mousePressed() {
  if (screen == 0 && mouseX>300 && mouseX<500 && mouseY>225 && mouseY<295) {
    screen = 1
  }
  if (screen==4 && mouseX>350 && mouseX<450 && mouseY>240 && mouseY<340 && coinCount==0){
    screen = 0
    player = { x: -60, y: 300, l: 60, h: 78, f: 0, a:0.3 }
    back1 = { x: 0, y: 0, s: -4, l: 1560, h: 430 }
    back2 = { x: 1560, x2: 2752, y: 0, s: -4, l: 1192, h: 430 }
    totalscore = 0
    distance = 0
    coinCount = 0
    arrow = 600
    arrowWood=400
    arrowtext = 450
    delay = 0
  }
  if(mouseX>10 && mouseX<50 && mouseY>360 && mouseY<400 && muted == 0){
    muted = 1
    music.pause()
  }
  else if(mouseX>10 && mouseX<50 && mouseY>360 && mouseY<400 && muted == 1){
    muted = 0
    music.play()
  }
}

function keyPressed() {
  if (screen == 2) {
    //stop top bound
    if (keyIsDown(38) && player.y <= 0 || player.y<0) {
      player.f = 0
      player.y = 0
      flying = 1
      
    }
    //move up
    else if (keyIsDown(38)) {
      player.f = -5
      flying = 1
    }
    //gravity
    else if (player.y < 300) {
      player.f += player.a
      flying = 0
    }
    //stop bottom bound
    else {
      player.f = 0
      player.y=300
      flying = 0
    }
  }
}

/******* OTHER FUNCTIONS *******/

function moveBackground() {
  if (back1.x > -back1.l) {
    image(bg, back1.x, back1.y, back1.l, back1.h)
    back1.x += back1.s
  }
  //display images
  image(bg2, back2.x, back2.y, back2.l, back2.h)
  image(bg2, back2.x2, back2.y, back2.l, back2.h)
  //move background images
  back2.x += back2.s
  back2.x2 += back2.s
  //loop background images
  if (back2.x <= -back2.l) {
    back2.x = back2.l
  }
  if (back2.x2 <= -back2.l) {
    back2.x2 = back2.l
  }
}

function playerFunction() {
  
  //display player
  image(jetpack, player.x, player.y, player.l, player.h)
  //change player height based on speed in keypressed
  player.y += player.f
}

function createCoins() {
  x = 800
  y = random(15, 315)
  id='coin'
  for (var i = 0; i < random(3, 10); i++) {
    coins.push(new coinClass(x, y, coinspeed,id))
    x += 50
  }
}

function createObstables(){
  x = 760
  id='missile'
  for(var i =0; i<random(0,3);i++){
    y = random(0,320)
    missiles.push(new obstacleClass(x,y,id))

  }
}

function collisions(object){
  //traverse the given list
  for(var i = 0;i<object.length;i++){
    //coin collision
    if(object[i].id =='coin'){
      
      if(object[i].x<=0){
        object.splice(i,1)
      }
      
      closestx = object[i].x
      closesty = object[i].y
      
      if(object[i].x<player.x){
        closestx = player.x
      }else if(object[i].x>=player.x+player.l){
        closestx = player.x+player.l
      }

      if(object[i].y<player.y){
        closesty = player.y
      }else if(object[i].y>player.y+player.h){
        closesty = player.y+player.h
      }
        
      if(dist(object[i].x,object[i].y,closestx,closesty)<12){
        object.splice(i,1)
        coinCount+=1
      }
    }
    //missile collision
    else if(object[i].id == 'missile'){
      if(object[i].x<=0){
        object.splice(i,1)
        break
      }
      if(object[i].x<player.x+player.l){
        if(object[i].x+object[i].l>player.x){
          if(object[i].y<player.y+player.h-5){
            if(object[i].y+object[i].h>player.y+5){
              screen=3
              //stop all intervals
              clearInterval(coininterval)
              clearInterval(obstacleinterval)
              clearInterval(pointinterval)
              clearInterval(power)
              object.splice(i,1)
            }
          }
        }
      }
    }
    //powerup collision
    else if(object[i].id=='power'){
      if(object[i].x1<=-40){
        object.splice(i,1)
        break
      }
      if(object[i].x1<player.x+player.l){
        if(object[i].x1+40>player.x){
          if(object[i].y1<player.y+player.h){
            if(object[i].y1+40>player.y){
              object.splice(i,1)
              coinBomb()
            }
          }
        }
      }
    }
  }
}

function clearScreen(object){
  object.splice(0,1)
}

function points(){
  distance+=1
}

function scoreDisplay(){
  //display coins and distance on playscreen
  push()
  textSize(25)
  textAlign(RIGHT)
  fill(255)
  text('Distance : '+distance+' Feet', 775,40)
  imageMode(CORNER)
  textAlign(LEFT)
  image(coinimg,20,20,25,25)
  text(': '+coinCount,50,40)
  pop()
}

function countTotal(){
  //display total score counter on end screen
  textSize(20)
  textAlign(RIGHT)
  text('Distance : '+distance+' Feet', 690,212)
  image(coinimg, 150,205,25,25)
  textAlign(LEFT)
  text(': '+coinCount+' Coins',170,212)
}

function muteButton(){
  if(muted == 0){
    image(unmute,10,360,40,40)
  }
  else{
    image(mute,10,360,40,40)
  }
}

function makeSmoke(){
  if(frameCount%2==0 && flying==1){
    smokes.push(new smokeClass(player.x,player.y+45))
  }
  for(var i =0;i<smokes.length;i++){
    if (smokes[i].s<=1){
      smokes.splice(i,1)
    }
  }
  // image(smoke,,,30,30)
}

function powerbox(){
  powers.push(new powerClass(random(800,1200),random(150,200)))
}

function coinBomb(){
  //push a bunch of coins for coin bomb power
  x = 800
  y = random(30,290)
  id='coin'
  pId=0
  for(var j=0;j<4;j++){
    for (var i = 0; i < 10; i++) {
      coins.push(new coinClass(x, y, coinspeed,id))
      x += 50
    }    
    x=800
    y+=30
  }
  x=1300
  y=y-60
  
  if(y<205){
    for(var j=0;j<4;j++){
      for (var i = 0; i < 10; i++) {
        coins.push(new coinClass(x, y, coinspeed,id))
        x += 50
      }    
      x=1300
      y+=30
    }
  }
  
  else if(y>=205){
    for(var j=0;j<4;j++){
      for (var i = 0; i < 10; i++) {
        coins.push(new coinClass(x, y, coinspeed,id))
        x += 50
      }    
      x=1300
      y-=30
    }
  }

}

function powerText(){
  //display which power was gotten
  if(pId==0){
    if(delay<=60 && frameCount%30<=15){
      push()
      textSize(60)
      fill('yellow')
      stroke(2)
      textAlign(CENTER)
      text('Coin Bomb',400,80)
      pop()
      delay+=1
    }else if(delay>60){
      delay=0
      pId=100
    }
  }
}

/******* CLASSES *******/

class coinClass {
  constructor(x, y, speed,id) {
    this.x = x
    this.y = y
    this.s = speed
    this.img = coinimg
    this.r = 30
    this.id =id
  }
  display() {
    push()
    imageMode(CENTER)
    image(this.img, this.x += this.s, this.y, this.r,this.r)
    pop()
  }
}

class obstacleClass {
  constructor(x, y,id) {
    this.x = x
    this.y = y
    this.s = 0
    this.img = missileimg
    this.l = 42
    this.h = 40
    this.a = -0.2
    this.id = id
  }
  display() {
    image(this.img, this.x += this.s, this.y, this.l, this.h)
    this.s += this.a
  }
}

class smokeClass{
  constructor(x,y){
    this.x = x+random(-5,5)
    this.y = y+random(1,10)
    this.size = random(10,15)
    this.l = 1*this.size
    this.h = 1*this.size
    this.s = 4
    
  }
  display(){
    image(smokeimg,this.x,this.y,this.l,this.h)
    this.x-=2
    this.y+=this.s
    this.s-=0.1
    this.l+=1
    this.h+=1
  }
}

class powerClass{
  constructor(x,y){
    this.x = x
    this.x1=this.x
    this.y1 = y
    this.y = this.y1
    this.id = 'power'
  }
  display(){
    image(coinimg,this.x1,this.y1,50,50)
    this.x1-=6
    this.y1 = this.y+120*sin(0.01*this.x1)
  }
}

/******* IMAGES *******/

//background image : https://www.artstation.com/artwork/ZGyDbR
//player image : https://cprewritten.wordpress.com/2021/03/29/dot-jet-pack-guy-tracker/
//coin image : https://creazilla.com/nodes/60815-golden-dollar-coin-clipart
//missile image :  https://www.google.com/url?sa=i&url=https%3A%2F%2Fbloons.fandom.com%2Fwiki%2FFirst_Strike_Capability_%2528BTD6%2529&psig=AOvVaw0xCahdQ8oJH-_C9QU7TSOQ&ust=1673132955325000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKClzo2ItPwCFQAAAAAdAAAAABAE
//death gif : https://knowyourmeme.com/photos/626933-club-penguin
//avoid sign : https://www.dreamstime.com/stock-illustration-avoid-rubber-stamp-grunge-design-dust-scratches-effects-can-be-easily-removed-clean-crisp-look-color-easily-changed-image82592946
//wood : https://www.pinterest.com/pin/686939749385818303/
//start button : https://pngtree.com/freepng/play-button-candy-blue_5306396.html
//text image makers : https://cooltext.com/Render-Image?RenderID=426968566119372&LogoId=4269685661
//restart button : https://www.istockphoto.com/vector/update-icon-premium-blue-round-button-vector-illustration-gm1292135416-387037968?irgwc=1&cid=IS&utm_medium=affiliate_SP&utm_source=Vector.me&clickid=ykyXBRU40xyNWPH2wK3ZOVh-UkAw0-UONzBsxw0&utm_term=Reload%20Icon%20Blue%20Symbol%20Circle%20Arrows%20Refresh%20Update&utm_campaign=&utm_content=332115&irpid=340404
//up : https://www.clipartmax.com/middle/m2i8K9d3i8Z5G6i8_arrow-up-clip-art-at-clker-com-vector-online-royalty-arrow-up/
//font family : https://fonts.google.com/specimen/Bangers
//mute button : https://www.seekpng.com/ipng/u2e6a9y3e6w7q8i1_mute-unmute-button-png/
//music : https://www.youtube.com/watch?v=TW9d8vYrVFQ