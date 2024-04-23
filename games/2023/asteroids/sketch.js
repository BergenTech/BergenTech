//variables
screen = 0
canvW = 500
canvH = 750
score = 0
fuelCounter = 0

//lists
asteroids = []
enemies = []
powerups = []
powerupImages = []
bullets = []
enemyBullets = []

function preload(){
  bg = loadImage('images/bg.png')
  playerImage = loadImage('images/playerImage.gif')
  meteorImage = loadImage('images/meteor.png')
  for(i=1;i<4;i++){
    powerupImages.push(loadImage('images/powerup' + [i] + '.png'))
  }
  bulletImage = loadImage('images/bullet.png')
  enemyImage = loadImage('images/enemyImage.gif')
  enemyBulletImage = loadImage('images/enemybullet.png')
}

/********* SETUP BLOCK ********/
function setup() {
  createCanvas(canvW, canvH)
  backDrop1 = {img:bg,y:0,w:width,h:height}
  backDrop2 = {img:bg,y:-height,w:width,h:height}
  player = new Player(canvW/2,canvH - 200, playerImage)
  controlPanel = new Panel()
}

/********* DRAW BLOCK *********/
function draw() {
  if (screen == 0) {
    screen0()
  }else if(screen == 1){
    screen1()
  }
  else if(screen == 2){
    screen2()
  }
}

/******* SCREEN CONTENTS *****/
function screen0() {
  background(0);
  fill(255, 255, 255)
  textSize(40);
  textAlign(CENTER);
  text('Click to Play', width / 2, height / 2)
  textSize(20)
  text('Arrow Keys to Move',width/2,height/2 + 100)
  text('Space to shoot',width/2,height/2 + 200)
  text('Avoid asteroids and collect powerups',width/2,height/2 + 300)
}

function screen1(){
  push()
  imageMode(CORNER)
  image(backDrop1.img,0,backDrop1.y,backDrop1.w,backDrop1.h)
  image(backDrop2.img,0,backDrop2.y + 100,backDrop2.w,backDrop2.h)
  backDrop1.y ++
  backDrop2.y ++
  if(backDrop1.y >= height - 150){
    backDrop1.y = - height
  }
  if(backDrop2.y >= height - 150){
    backDrop2.y = - height
  }
  pop()
  bulletFunction()
  playerFunction()
  spliceFunction(asteroids)
  spliceFunction(powerups)
  spliceFunction(bullets)
  spliceFunction(enemyBullets)
  collide(powerups)
  collide(asteroids)
  collide(enemyBullets)
  collideList(powerups,bullets)
  collideList(asteroids,bullets)
  collideList(enemyBullets,bullets)
  collideList(enemies,bullets)
  checkDeath()
  enemyFunction()
  enemyBulletFunction()
  panelFunction()
  ceilingFunction()
}

function screen2(){
  push()
  background(0)
  textAlign(CENTER)
  fill(255)
  textSize(40)
  text('Game Over',width/2,height/2)
  textSize(20)
  text('Score: '+score,width/2,3*height/5)
  text('Click to Play Again',width/2,4*height/5)
  pop()
  removeFunction(asteroids)
  removeFunction(bullets)
  removeFunction(enemies)
  removeFunction(powerups)
  removeFunction(enemyBullets)
  player.x = width/2
  player.y = height - 200
}

//non main functions

function ceilingFunction(thing){
  if(player.amo > player.amoM){
    player.amo = player.amoM
  }
  if(player.health > player.healthM){
    player.health = player.healthM
  }
  if(player.fuel > player.fuelM){
    player.fuel = player.fuelM
  }
}

function removeFunction(thing){
  for(i=0;i<thing.length;i++){
    thing.splice(i,1)
  }
}

function scoreIncrease(){
  score ++
  player.fuel -= .5
}

function checkDeath(){
  if(player.health < 1 || player.fuel < 1){
    clearInterval(increaseScore)
    clearTimeout(meteorSpawn)
    clearTimeout(powerupSpawn)
    clearTimeout(enemySpawn)
    player.health = player.healthM
    player.amo = player.amoM
    player.fuel = player.fuelM
    screen ++
  }
}

function collideList(thing,thing2){
  for(i=0;i<thing.length;i++){
    for(j=0;j<thing2.length;j++){
      if(thing[i].y + thing[i].h/2 > thing2[j].y - thing2[j].h/2 &&
      thing[i].y - thing[i].h/2 < thing2[j].y + thing2[j].h/2 &&
      thing[i].x + thing[i].w/2 > thing2[j].x - thing2[j].h/2 &&
      thing[i].x - thing[i].w/2 < thing2[j].x + thing2[j].w/2){
        thing.splice(i,1)
        thing2.splice(j,1)
        break
      }
    }
  }
}

function collide(thing){
  for(i=0;i<thing.length;i++){
    if(thing[i].y + thing[i].h/2 - 12> player.y - player.h/2 &&
      thing[i].y - thing[i].h/2  + 12< player.y + player.h/2 &&
      thing[i].x + thing[i].w/2 - 5> player.x - player.h/2 &&
      thing[i].x - thing[i].w/2 + 5< player.x + player.w/2){
      if(thing == asteroids || thing == enemyBullets){
        player.health --
        score -= 5
      }
      else{
        if(thing[i].id == 2){
          player.health ++
        }
        else if(thing[i].id == 1){
          player.fuel = player.fuelM
        }
        else{
          player.amo = player.amoM
        }
      }
      thing.splice(i,1)
    }
  }
}

function spawnPowerup(){
  fuelCounter ++
  powerups.push(new Powerup(random(canvW),random(-80,0),random(powerupImages)))
  if(fuelCounter >= 2){
    fuelCounter = 0
    powerups.push(new Powerup(random(width),random(-80,0),powerupImages[0]))
  }
  powerupSpawn = setTimeout(spawnPowerup,random(7000,10000))
}

function spawnEnemy(){
  spawnNum = 2
  timer = 8000
  if(Math.floor(score / 60) > spawnNum ){
    spawnNum = Math.floor(score / 60)
  }
  if(spawnNum >= 4){
    spawnNum = 12
  }
  if(timer >= 4000){
    timer -= score*2
  }
  for(i=0;i<spawnNum;i++){
    enemies.push(new Enemy(random(canvW),random(60,100),60))
  }
  enemySpawn = setTimeout(spawnEnemy,timer)
}

function spawnMeteor(){
  spawnNum = 5
  timer = 2000
  if(Math.floor(score / 20) > spawnNum ){
    spawnNum = Math.floor(score / 10)
  }
  if(spawnNum >= 12){
    spawnNum = 12
  }
  if(timer >= 1000){
    timer -= score*2
  }
  for(i=0;i<spawnNum;i++){
    asteroids.push(new Meteor(random(canvW),random(-180,0),random(40,60),random(3,6),meteorImage))
  }
  meteorSpawn = setTimeout(spawnMeteor,timer)
}

function spliceFunction(thing){
  for(i=0;i<thing.length;i++){
    thing[i].display()
    if(thing != bullets){
      if(thing[i].y >= canvH){
        thing.splice(i,1)
      }
    }else{
      if(thing[i].y <= -100){
        thing.splice(i,1)
      }
    }
  }
}

function enemyFunction(){
  for(i=0;i<enemies.length;i++){
    enemies[i].display()
    enemies[i].move()
    enemies[i].shoot()
  }
}

function enemyBulletFunction(){
  for(i=0;i<enemyBullets.length;i++){
    enemyBullets[i].display()
  }
}

function bulletFunction(){
  for(i=0;i<bullets.length;i++){
    bullets[i].display()
  }
}

function playerFunction(){
  player.display()
  player.move()
}

function panelFunction(){
  controlPanel.display()
}

/********* INPUTS *********/
function mousePressed() {
  if(screen == 0){
    meteorSpawn = setTimeout(spawnMeteor,3000)
    powerupSpawn = setTimeout(spawnPowerup,10000)
    enemySpawn = setTimeout(spawnEnemy,3000)
    increaseScore = setInterval(scoreIncrease,500)
    screen ++
  }
  else if(screen == 2){
    screen = 0
    score = 0
  }
}

function keyPressed() {
  if(keyIsDown(32) && player.amo > 0){
    bullets.push(new Bullet(player.x,player.y))
    player.amo --
  }
}

/******* OTHER FUNCTIONS *******/


/******* CLASSES *******/
class Player {
  constructor(x,y,img){
    this.x = x
    this.y = y
    this.w = 55
    this.h = 40
    this.speed = 5
    this.fuelM = 100
    this.healthM = 5
    this.amoM = 20
    this.fuel = 100
    this.health = 5
    this.amo = 20
    this.img = img
    this.fallspeed = 1
  }
  display(){
    push()
    imageMode(CENTER)
    image(this.img,this.x,this.y,this.w,this.h)
    pop()
  }
  move(){
    if(keyIsDown(37) && this.x >= this.w/2){
      this.x -= this.speed
      this.fuel -= .05
    }
    else if(keyIsDown(39) && this.x <= canvW - this.w/2){
      this.x += this.speed
      this.fuel -= .05
    }
    if(keyIsDown(38)){
      this.y -= this.speed
      this.fuel -= .05
    }
    else if(keyIsDown(40) && this.y <= canvH - this.h/2 - controlPanel.h){
      this.y += this.speed
      this.fuel -= .1
    }
    if(this.y <= canvH - this.h/2 - controlPanel.h){
      this.y += this.fallspeed
    }
    if(this.y <= this.h/2){
      this.y = canvH - this.h/2 - controlPanel.h
    }
  }
}

class Meteor {
  constructor(x,y,size,speed,img){
    this.x = x
    this.y = y
    this.size = size
    this.w = this.size
    this.h = this.size
    this.speed = speed
    this.img = img
  }
  display(){
    push()
    imageMode(CENTER)
    image(this.img,this.x,this.y,this.size,this.size)
    pop()
    this.y += this.speed
  }
}

class Panel{
  constructor(){
    this.x = 0
    this.y = canvH - 150
    this.w = canvW
    this.h = 150
  }
  display(){
    push()
    fill(125)
    rect(this.x,this.y,this.w,this.h)

    textAlign(CENTER)
    textSize(20)
    fill(0)
    text('Health', this.x + 40,this.y+50)
    text('Amo', this.x + 310,this.y+50)
    text('Fuel', this.x + 40,this.y+120)
    text('Score: '+score,this.x+310,this.y+120)

    fill(0)
    rect(this.x + 100,this.y + 30,100,30)
    rect(this.x + 350,this.y + 30,100,30)
    rect(this.x + 100,this.y + 100,100,30)
    
    fill(0,255,0)
    rect(this.x + 100,this.y + 30,player.health/player.healthM * 100,30)
    rect(this.x + 350,this.y + 30,player.amo/player.amoM * 100,30)
    rect(this.x + 100,this.y + 100,player.fuel/player.fuelM * 100,30)
    pop()
  }
}


class Powerup {
  constructor(x,y,img){
    this.x = x
    this.y = y
    this.w = 50
    this.h = 50
    this.img = img
    this.speed = 1
    for(i=0;i<powerupImages.length;i++){
      if(this.img == powerupImages[i]){
        this.id = i + 1
        break
      }
    }
  }
  display(){
    push()
    imageMode(CENTER)
    image(this.img,this.x,this.y,this.w,this.h)
    pop()
    this.y += this.speed
  }
}

class Bullet {
  constructor(x,y){
    this.x = x
    this.y = y
    this.w = 40
    this.h = 25
    this.speed = 5
    this.img = bulletImage
  }
  display(){
    push()
    imageMode(CENTER)
    image(this.img,this.x,this.y,this.w,this.h)
    pop()
    this.y -= this.speed
  }
}

class Enemy {
  constructor(x,y,size){
    this.img = enemyImage
    this.x = x
    this.y = y
    this.size = size
    this.w = this.size
    this.h = this.size
    this.speed = 2
    this.timer = 0
    this.times = 0
    this.direction = random(1,4)
    this.vec
    this.shootT = 0
    this.shotT = 0
  }
  display(){
    push()
    angleMode(DEGREES)
    imageMode(CENTER)
    this.vec = createVector(player.x - this.x,player.y - this.y)
    translate(this.x,this.y)
    rotate(this.vec.heading() + 90)
    image(this.img,0,0,this.size,this.size)
    pop()
  }
  move(){
    this.timer ++
    if(this.timer >= 100){
      if(Math.round(this.direction) == 4){
        if(this.y < height/4 - this.size){
          this.y += this.speed
        }
      }else if(Math.round(this.direction) == 3){
        if(this.x < width - this.size){
          this.x += this.speed
        }
      }else if(Math.round(this.direction) == 2){
        if(this.x > this.size){
          this.x -= this.speed
        }
      }
      else{
        if(this.y > this.size){
          this.y -= this.speed
        }
      }
      this.times += random(.5,2)
    }
    if(this.times >= 100){
      this.direction = random(1,4)
      this.timer = 0
      this.times = 0
    }
  }
  shoot(){
    push()
    translate(this.x,this.y)
    this.shotT ++
    if(this.shotT > 100){
      this.shootT += random(1,3)
      fill(this.shootT,0,0)
      circle(cos(this.vec.heading()) * 30,sin(this.vec.heading()) * 30,10)
      if(this.shootT >= 255){
        enemyBullets.push(new Ebullet(this.x + cos(this.vec.heading()) * 40,this.y + sin(this.vec.heading()) * 40,this.vec.heading()))
        this.shotT = 0
        this.shootT = 0
      }
    }
    pop()
  }
}

class Ebullet {
  constructor(x,y,ang){
    this.ang = ang
    this.x = x
    this.y = y
    this.speed = 3.5
    this.speedX = cos(this.ang) * this.speed
    this.speedY = sin(this.ang) * this.speed
    this.img = enemyBulletImage
    this.size = 40
    this.w = this.size
    this.h = this.size
  }
  display(){
    push()
    imageMode(CENTER)
    image(this.img,this.x,this.y,this.size,this.size)
    pop()
    this.x += this.speedX
    this.y += this.speedY
  }
}

//credits for images
// playerImage.gif: https://hotcore.info/act/kareff-010627.html
//bg.png: https://opengameart.org/content/space-parallax-background
//bullet.png: https://en.wikipedia.org/wiki/14.5%C3%97114mm
//enemybullet.png: https://www.deviantart.com/venjix5/art/Red-Energy-Ball-10-764313587
//enemyImage.gif: https://stellarskele.tumblr.com/post/658744539591393280/a-spaceship
//meteor.png: https://commons.wikimedia.org/wiki/File:Meteorit.png
//powerup1.png: https://gfuel.com/products/pewdiepie-lingonberry-cans
//powerup2.png: https://www.walgreens.com/store/c/band-aid-brand-flexible-fabric-adhesive-bandages-assorted-sizes/ID=prod6177001-product
//powerup3.png: http://www.actiongunshop.com/product/9mm-125gr-match-bullets-50-count/