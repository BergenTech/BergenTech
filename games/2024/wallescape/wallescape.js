let screens = 0

let startButton = {
  color: 'red',
  x: 288,
  y: 324,
  radius: 120

}

let infoButton = {
  color: 'blue',
  x: 576,
  y: 324,
  radius: 120
}

let backButton = {
  color: 'purple'
}

let animations = {
  Death : [],
  Idle : [],
  Jump : [],
  Run : []
}


function movement(character){
  let animation = []
  for (let x = 0; x < character.width; x+=48){
    let img = character.get(x, 0, 48, 48)
    animation.push(img)
  }
  return animation
}

let player

function setup() {
  createCanvas(864, 486);
  
  background1_w_e = new Background(thebackground1, 1)
  background2_w_e = new Background(thebackground2, 2)
  background3_w_e = new Background(thebackground3, 3)
  overlay_w_e = new Background(theoverlay, 4)

  ground_w_e = new Ground(theground, 4)
  animations.Death = movement(Death)
  animations.Idle = movement(Idle)
  animations.Jump = movement(Jump)
  animations.Run = movement(Run)
  player = new Player(animations)
  battery_w_e = new Battery(8)
  wall_w_e = new Wall(thewall_img, 1/2)
}

function draw() {
  if (screens == 0) {
    welcome()
  }
  if (screens == 1) {
    wallEscape()
  }
  if (screens == 2) {
    gameOver()
  }
  if (screens == 3) {
    info()
  }
}

function welcome() {
  push()
  background(0)
  imageMode(CENTER)
  image(wel_background, width / 2, height / 2, 864, 486)
  image(logo, width / 2, height / 3, logo.width / 1.5, logo.height / 1.5)
  rectMode(CENTER)
  fill(startButton.color)
  circle(startButton.x, startButton.y, startButton.radius)
  fill(infoButton.color)
  circle(infoButton.x, infoButton.y, infoButton.radius)
  textSize(30)
  textAlign(CENTER)
  fill(255)
  text("START", startButton.x, startButton.y + 5)
  fill(255)
  text("INFO", infoButton.x, infoButton.y + 5)
  if (dist(startButton.x, startButton.y, mouseX, mouseY) < startButton.radius / 2) {
    startButton.color = 'green'
    if (buttonPress()) {
      screens = 1
    }
  } else {
    startButton.color = 'red'
  }
  if (dist(infoButton.x, infoButton.y, mouseX, mouseY) < infoButton.radius / 2) {
    infoButton.color = 'green'
    if (buttonPress()) {
      screens = 3
    }
  } else {
    infoButton.color = 'blue'
  }
  pop()
}

function info() {
  push()
  imageMode(CENTER)
  image(wel_background, width / 2, height / 2, 864, 486)
  rectMode(CENTER)
  fill('gray')
  rect(width / 2, height / 2, 600, 400, 20)
  textSize(20)
  textAlign(CENTER)
  fill(255)
  text("- Your goal: Survive as long as you can before the wall gets you!", width / 2, 75)
  text("- The wall is always increasing in speed, so this won't be easy ", width / 2, 115)
  text("- You can find power-ups in the form of batteries to aid or ruin you! \n The green battery moves the wall back to give you more space, \n while the red moves it closer", width / 2, 155)
  text("- The power-ups are on platforms, so you gotta reach them!", width / 2, 235)
  text("- Use the arrow keys to move left and right with 1 - 4 to move \n between platforms!", width / 2, 270)
  text("- That's all you need to know, so get out there and \n escape that wall, cause if you touch it, it's game over!", width / 2, 325)
  rectMode(CENTER)
  fill(backButton.color)
  rect(width / 2, 395, 150, 50)
  textSize(30)
  textAlign(CENTER)
  fill(255)
  text('BACK', width / 2, 405)
  if (mouseX > 357 && mouseX < 507 && mouseY > 370 && mouseY < 420) {
    backButton.color = 'green'
    if (buttonPress()) {
      screens = 0
    }
  } else {
    backButton.color = 'purple'
  }
  pop()
}

function gameOver(){
  push()
  background(0)
  imageMode(CENTER)
  image(wel_background, width / 2, height / 2, 864, 486)
  image(gameOver_img, width / 2, height / 3, gameOver_img.width / 10, gameOver_img.height / 10)
  textSize(60)
  textAlign(CENTER)
  fill(255)
  text("Final Score: "+timer, width/2, 400)
  pop()
}

function buttonPress(){
  if (mouseIsPressed){
    return true
  }
}

let background1_w_e
let background2_w_e
let background3_w_e
let overlay_w_e
let ground_w_e
let Death, Idle, Jump, Run
let wall_w_e
let plat_w_e
let timer = 0
let change = false
let battery_w_e

function preload() {
  wel_background = loadImage('games/2024/wallescape/images/backgrounds/wel_background.png')
  thebackground1 = loadImage('games/2024/wallescape/images/backgrounds/backpart1.png')
  thebackground2 = loadImage('games/2024/wallescape/images/backgrounds/backpart2.png')
  thebackground3 = loadImage('games/2024/wallescape/images/backgrounds/backpart3.png')
  theoverlay = loadImage('games/2024/wallescape/images/backgrounds/frontpart.png')
  theground = loadImage('games/2024/wallescape/images/others/ground.jpg')
  logo = loadImage('games/2024/wallescape/images/others/logo.png')
  Death = loadImage("games/2024/wallescape/images/character/death.png")
  Idle = loadImage("games/2024/wallescape/images/character/idle.png")
  Jump = loadImage("games/2024/wallescape/images/character/jump.png")
  Run = loadImage("games/2024/wallescape/images/character/run.png")
  thewall_img = loadImage("games/2024/wallescape/images/others/wall.jpg")
  theplat = loadImage("games/2024/wallescape/images/others/platform.jpg")
  theplat_black = loadImage("games/2024/wallescape/images/others/black_plat.jpg")
  gameOver_img = loadImage("games/2024/wallescape/images/others/game_over.png")
  greenBattery = loadImage("games/2024/wallescape/images/powerups/fullbattery.png")
  redBattery = loadImage("games/2024/wallescape/images/powerups/emptybattery.png")
}

function wallEscape() {
  background1_w_e.move()
  background1_w_e.draw()
  background2_w_e.move()
  background2_w_e.draw()
  background3_w_e.move()
  background3_w_e.draw()
  overlay_w_e.move()
  overlay_w_e.draw()
  ground_w_e.move()
  ground_w_e.draw()
  platform(platform_det)
  battery_w_e.move()
  battery_w_e.draw()
  wall_w_e.move()
  wall_w_e.draw()

  if (frameCount % 60 == 0) {
    if (change) {
      if (screens !== 2) {
        timer++
      }
    }
  }

  textSize(20)
  textAlign(CENTER)
  fill(255)
  text("Score: " + timer, 815, 30)
  player.render()
  player.update()
}

function mouseClicked() {
  if (dist(startButton.x, startButton.y, mouseX, mouseY) < startButton.radius / 2) {
    change = !change
  }
}


let platform_det = {}

function platform(plat) {
  plat.x = []
  plat.img = []
  for (let i = 0; i < 21; i++) {
    plat.x[i] = i * 46.85;
    if (i % 2 === 0) {
      plat.img[i] = theplat;
    } else {
      plat.img[i] = theplat_black;
    }
  }

  for (let i = 0; i < 21; i++) {
    image(plat.img[i], plat.x[i] - 5, 314, 46.85, 20.25);
    image(plat.img[i], plat.x[i] - 5, 214, 46.85, 20.25);
    image(plat.img[i], plat.x[i] - 5, 114, 46.85, 20.25);
  }

}

class Background {
    constructor(img, speed) {
      this.x1 = 0
      this.x2 = width
      this.img = img
      this.speed = speed
    }
    draw(){
      image(this.img, this.x1, 0, 864, 486)
      image(this.img, this.x2, 0, 864, 486)
    }
    move(){
      this.x1 -= this.speed
      this.x2 -= this.speed
      if (this.x1 + 864 < 0){
        this.x1 = width
      }
      if (this.x2 + 864 < 0){
        this.x2 = width
      }
    }
  }

  class Battery {
    constructor(speed){
        this.x = [1000, 900, 1500, 2700]
        this.y = [350, 250, 150, 50]
        this.x1 = random(this.x)
        this.x2 = random(this.x)
        this.y1 = random(this.y)
        this.y2 = random(this.y)
        this.img_green = greenBattery
        this.img_red = redBattery
        this.speed = speed
    }
    draw(){
        image(this.img_green, this.x1, this.y1, 64, 64)
        image(this.img_red, this.x2, this.y2, 64, 64)
    }
    move(){
        this.x1 -= this.speed
        this.x2 -= this.speed
        if (this.x1 + 64 <= 0){
            this.x1 = random(this.x)
            this.y1 = random(this.y)
        }
        if (this.x2 + 64 <= 0){
            this.x2 = random(this.x)
            this.y2 = random(this.y)
        }
        
    }
} 

class Ground {
    constructor(img, speed){
      this.x1 = 0
      this.x2 = 72
      this.x3 = 144
      this.x4 = 216
      this.x5 = 288
      this.x6 = 360
      this.x7 = 432
      this.x8 = 504
      this.x9 = 576
      this.x10 = 648
      this.x11 = 720
      this.x12 = 792
      this.x13 = 864
      this.img = img
      this.speed = speed
    }
    draw(){
      image(this.img, this.x1, 414, 72, 72)
      image(this.img, this.x2, 414, 72, 72)
      image(this.img, this.x3, 414, 72, 72)
      image(this.img, this.x4, 414, 72, 72)
      image(this.img, this.x5, 414, 72, 72)
      image(this.img, this.x6, 414, 72, 72)
      image(this.img, this.x7, 414, 72, 72)
      image(this.img, this.x8, 414, 72, 72)
      image(this.img, this.x9, 414, 72, 72)
      image(this.img, this.x10, 414, 72, 72)
      image(this.img, this.x11, 414, 72, 72)
      image(this.img, this.x12, 414, 72, 72)
      image(this.img, this.x13, 414, 72, 72)
    }
    move(){
      this.x1 -= this.speed
      this.x2 -= this.speed
      this.x3 -= this.speed
      this.x4 -= this.speed
      this.x5 -= this.speed
      this.x6 -= this.speed
      this.x7 -= this.speed
      this.x8 -= this.speed
      this.x9 -= this.speed
      this.x10 -= this.speed
      this.x11 -= this.speed
      this.x12 -= this.speed
      this.x13 -= this.speed
      
      if (this.x1 + 72 < 0){
        this.x1 = 862
      }
      if (this.x2 + 72 < 0){
        this.x2 = 862
      }
      if (this.x3 + 72 < 0){
        this.x3 = 862
      }
      if (this.x4 + 72 < 0){
        this.x4 = 862
      }
      if (this.x5 + 72 < 0){
        this.x5 = 862
      }
      if (this.x6 + 72 < 0){
        this.x6 = 862
      }
      if (this.x7 + 72 < 0){
        this.x7 = 862
      }
      if (this.x8 + 72 < 0){
        this.x8 = 862
      }
      if (this.x9 + 72 < 0){
        this.x9 = 862
      }
      if (this.x10 + 72 < 0){
        this.x10 = 862
      }
      if (this.x11 + 72 < 0){
        this.x11 = 862
      }
      if (this.x12 + 72 < 0){
        this.x12 = 862
      }
      if (this.x13 + 72 < 0){
        this.x13 = 862
      }
    }
  }

  class Player {
    constructor(animations) {
      this.stage = [320, 226, 126, 26]
      this.x = 600
      this.y = this.stage[0]
      this.animations = animations
      this.currentAnimation = "Idle"
      this.currentFrame = 0
    }
    render() {
      image(this.animations[this.currentAnimation][this.currentFrame], this.x, this.y, 94, 94)
    }
    update() {
      if (this.currentAnimation === 'Death' 
      && this.currentFrame === this.animations['Death'].length - 1) {
        console.log('dead')
        noLoop()
      } else {
        if (keyIsDown(39)) {
          this.currentAnimation = 'Run'
          if (this.x <= 819) {
            this.x = this.x + 10
          }
          else {
            this.x += 0
          }
        }
        else if (keyIsDown(37)) {
          this.currentAnimation = 'Run'
          this.x -= 10
        }
        else if (keyIsDown(49)) {
          this.currentAnimation = 'Jump'
          this.y = this.stage[0]
          this.x -= 5
        }
        else if (keyIsDown(50)) {
          this.currentAnimation = 'Jump'
          this.y = this.stage[1]
          this.x -= 5
        }
        else if (keyIsDown(51)) {
          this.currentAnimation = 'Jump'
          this.y = this.stage[2]
          this.x -= 5
        }
        else if (keyIsDown(52)) {
          this.currentAnimation = 'Jump'
          this.y = this.stage[3]
          this.x -= 5
        }
        else {
          this.currentAnimation = 'Idle'
          this.x -= 5
        }
        if (this.x + 96 >= wall_w_e.x && this.x <= wall_w_e.x + wall_w_e.w) {
          this.currentAnimation = 'Death'
          screens = 2
        }
        if (battery_w_e.y1 === 350 && this.y == 320 && this.x > battery_w_e.x1 && this.x < battery_w_e.x1 + 64) {
          battery_w_e.x1 = random(battery_w_e.x)
          battery_w_e.y1 = random(battery_w_e.y)
          wall_w_e.x -= 30
        }      
        if (battery_w_e.y2 === 350 && this.y >= 315 && this.y <= 325 && this.x > battery_w_e.x2 && this.x < battery_w_e.x2 + 64) {
          battery_w_e.x2 = random(battery_w_e.x)
          battery_w_e.y2 = random(battery_w_e.y)
          wall_w_e.x += 40
        }
        if (battery_w_e.y1 == 250 && this.y == 226 && this.x > battery_w_e.x1 && this.x < battery_w_e.x1 + 64) {
          battery_w_e.x1 = random(battery_w_e.x)
          battery_w_e.y1 = random(battery_w_e.y)
          wall_w_e.x -= 30
        }
        if (battery_w_e.y2 == 250 && this.y == 226 && this.x > battery_w_e.x2 && this.x < battery_w_e.x2 + 64) {
          battery_w_e.x2 = random(battery_w_e.x)
          battery_w_e.y2 = random(battery_w_e.y)
          wall_w_e.x += 40
        }
        if (battery_w_e.y1 == 150 && this.y == 126 && this.x > battery_w_e.x1 && this.x < battery_w_e.x1 + 64) {
          battery_w_e.x1 = random(battery_w_e.x)
          battery_w_e.y1 = random(battery_w_e.y)
          wall_w_e.x -= 30
        }
        if (battery_w_e.y2 == 150 && this.y == 126 && this.x > battery_w_e.x2 && this.x < battery_w_e.x2 + 64) {
          battery_w_e.x2 = random(battery_w_e.x)
          battery_w_e.y2 = random(battery_w_e.y)
          wall_w_e.x += 40
        }
        if (battery_w_e.y1 == 50 && this.y == 26 && this.x > battery_w_e.x1 && this.x < battery_w_e.x1 + 64) {
          battery_w_e.x1 = random(battery_w_e.x)
          battery_w_e.y1 = random(battery_w_e.y)
          wall_w_e.x -= 30
        }
        if (battery_w_e.y2 == 50 && this.y == 26 && this.x > battery_w_e.x2 && this.x < battery_w_e.x2 + 64) {
          battery_w_e.x2 = random(battery_w_e.x)
          battery_w_e.y2 = random(battery_w_e.y)
          wall_w_e.x += 40
        }
      }
  
      this.currentFrame = (this.currentFrame + 1) % this.animations[this.currentAnimation].length
    }
  }
  
  class Wall {
    constructor(img, speed){
        this.x = -1400
        this.w = 1599
        this.h = 600
        this.img = img
        this.speed = speed
    }
    draw(){
        image(this.img, this.x, 0, this.w, this.h)
    }
    move(){
        this.w += this.speed
    }
}