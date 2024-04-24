class BasketballBackground {
  constructor(img){
    this.img = img;
    this.x1 = 0
    this.x2 = -1200
    this.speed = 1
  }
  render(playersXSpeed){
    image(this.img, this.x1, 0)
    this.x1 += this.speed + playersXSpeed
    image(this.img, this.x2, 0)
  }
  move(playerXSpeed){
    this.x2 += this.speed + playerXSpeed
    if(this.x1>1200){
      this.x1 = -1200
    }
    if(this.x2>1200){
      this.x2 = -1200
    }
  }
}





class BasketballGame {
  static startButton = {
    color: 'orange',
    x: 400,
    y: 400,
    radius: 60,
  }
  static homeButton = {
    color: 'orange',
    x: 500,
    y: 500,
    radius: 60,
  } 
  static preview
  static gameOverImage

  constructor(numM, numS){
    this.numM = numM
    this.numS = numS
    this.basketballs = []
    this.villains = []
    this.score = 0
    this.lives = 5
    this.screen = 0
    this.createVillains(animationss)
    this.createPlayer()
    this.createBasketballs()
    this.createBackground()
  }

  draw(){
    if(this.screen==0){
      this.welcome()
    }
    
    else if(this.screen == 1){
      this.play(this.basketballs,this.villains)
    }
    else if(this.screen == 2){
      this.gameOver()
    }
  }

  play(ball,vill){
     this.bg.render(this.mainPlayer.xSpeed)
     this.bg.move(this.mainPlayer.xSpeed)
    
     for(let i=0; i<ball.length; i++){
     ball[i].render()
     ball[i].move()
     }
     this.mainPlayer.render();
     this.mainPlayer.update();
     for(let i=0; i<vill.length; i++){
     vill[i].render()
     vill[i].update()
     if(vill[i].x<=0){
     vill[i].x = 400
     vill[i].y = random(1,400)
     }
     }
    this.checkCollision(this.mainPlayer,this.basketballs,this.villains)
    this.drawStats()
  }
  checkCollision(character,b,v){
    for(let i=0; i<b.length; i++){
      
    if(b[i].isColliding(character)){
      this.score+=1
      b[i].x = 800
      b[i].y = random(1,800)
    } 
  }
  for(let j=0; j<v.length; j++){
    if(v[j].issColliding(character)){
      this.lives -=1
      v[j].x = random(1,400); 
      v[j].y = 400
      if(this.lives<=0){
        this.gameOver()
      }
    }
  }
  }
drawStats() {
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text('life',450,20)
  fill('red')
  rect(400,25,100,15);
  fill('lime');
  rect(400,25, this.lives * 20, 15);
  fill(255);
  text('Score: ' + this.score, 60, 30);
}

createPlayer(){
  this.mainPlayer = new Player(animations)
}
createBackground(){
  let bgImg = loadImage('assets/images/main_screen.jpg')
  this.bg = new BasketballBackground(bgImg)
}
createBasketballs(){
  for(let i=0; i<this.numM; i++){
    let BasketballsObj = new Basketball(loadImage("assets/images/basketball.png"))
    this.basketballs.push(BasketballsObj)
  }
}
createVillains(villain_an){
  for(let i=0; i<this.numS; i++){
    let villainObj = new Villain(villain_an)
      this.villains.push(villainObj)
  }
}

welcome(){
  let startButton = BasketballGame.startButton
  let preview = BasketballGame.preview
  push()
  background(0);
  imageMode(CENTER)
  image(preview, width/2, 180)
  fill(startButton.color)
  rectMode(CENTER)
  circle(startButton.x, startButton.y, startButton.radius * 2)
  textSize(50);
  textAlign(CENTER)
  fill('orange')
  text('BASKETBALL BONANZA', width/2, height/3 + 12.5)
  textSize(30);
  fill('black')
  text('START', width/2, height/2 + 55)
  textSize(10)
  fill('yellow')
  text('Avoid hitting the villain while at the same time attempting to collect Basketballs!', width/2, height/1.5 + 100)
  text('When you collect a Basketball, your score increases by one. If you accidentally collide with a Villain, your lives will decrease! Have fun!',450,600)
  if(dist(startButton.x, startButton.y, mouseX, mouseY) < startButton.radius && mouseIsPressed) {
    startButton.color = "green"
    if(mouseIsPressed){
      this.screen = 1
    }
    else {
      startButton.color = "orange"
    }
  }
    pop()
  }

gameOver(){
  push()
  background(0)
  imageMode(CENTER)
  image(BasketballGame.gameOverImage, width/2, height/2, 800,800)
  textSize(50)
  textAlign(CENTER)
  fill(255)
  text("Score: " + this.score, width/2, height/3 + 75)
  pop()
  noLoop()
}
}





class Basketball {
  constructor(img) {
    this.img = img
    this.x = random(300)
    this.y = random(400)
    this.w = 25
    this.h = 25
    this.r = 12.5
  }
  render() {
    image(this.img, this.x, this.y, this.w, this.h)
  }
  move() {
    if (this.x > 0 && this.y > 0) {
      this.x -= 4
      this.y -= 4
    }
    else{
      this.x = random(1,675)
      this.y = 700
    }
  }
  isColliding(object) {
    let distX = Math.abs(this.x + this.w / 2 - (object.x + object.w / 2));
    let distY = Math.abs(this.y + this.h / 2 - (object.y + object.h / 2));
    return (
     distX <=object.w / 2 + this.r &&
     distY <= object.h / 2 + this.r

    );
  }
}





class Player{
  constructor(animations){
    this.x = random(1,675)
    this.y = 100
    this.animations = animations
    this.currentAnimation = "Run"
    this.currentFrame = 0
    this.w = 64
    this.h = 64
    this.xSpeed = 0
    this.ySpeed = 0
  }
  render(){
    image(this.animations[this.currentAnimation][this.currentFrame],this.x,this.y,this.w,this.h)
  }
  update(){
    if(this.currentAnimation!='Dead'){
      if(keyIsDown(RIGHT_ARROW) && this.x<675){
        this.currentAnimation = "Run"
        this.xSpeed = 4
        this.x+=this.xSpeed
      }
      else if(keyIsDown(LEFT_ARROW) && this.x>10){
        this.currentAnimation = "Run"
        this.xSpeed = -4
        this.x+=this.xSpeed
      }
      else if(keyIsDown(UP_ARROW) && this.y>0){
        this.currentAnimation = "Run"
        this.ySpeed = -4
        this.y+=this.ySpeed
      }
      else if(keyIsDown(DOWN_ARROW)&& this.y<650){
        this.currentAnimation = "Run"
        this.ySpeed = 4
        this.y+=this.ySpeed
      }
      else{
        this.currentAnimation = "Idle"
        this.xSpeed = 0
        this.ySpeed = 0
      }
    }
    
  }
  }





  let Idle,Walk_villain,Idle_villain,Run,Dead
  function preload(){ 
    BasketballGame.gameOverImage = loadImage("assets/images/game_over_screen.jpg")
    BasketballGame.preview = loadImage("assets/images/welcome_screen.jpg")
    Idle_villain = loadImage("assets/images/villains/Swordsman/Idle.png")
    Walk_villain = loadImage("assets/images/villains/Swordsman/Pick_Up.png")
    Idle = loadImage("assets/images/player/Biker_idle.png")
    Run = loadImage("assets/images/player/Biker_run_attack.png")
  }
  let animations = {
    Idle: [],
    Run: [],
  }
  let animationss = {
    Idle_villain: [],
    Walk_villain: [],
  }
  function createFrames(spritesheet){
    let animation = []
    for(let x=0;x<spritesheet.width;x+=128){
      let img = spritesheet.get(x,0,128,128)
      animation.push(img)
    }
    return animation
    }
  function createFramess(spritesheet){
    let a_nimation = []
    for(let x=0;x<spritesheet.width;x+=42){
      let new_img = spritesheet.get(x,0,42,42)
      a_nimation.push(new_img)
  }
    return a_nimation
  }
  function setup() {
    createCanvas(800, 700);
    FrameRate = 15;
    Basketball_Game = new BasketballGame(3,6)
    animations.Idle = createFramess(Idle)
    animations.Run = createFramess(Run)
    animationss.Idle_villain = createFrames(Idle_villain)
    animationss.Walk_villain = createFrames(Walk_villain)
  }
  
  function draw() {
    background(220);
    Basketball_Game.draw()
  }
  
  



  class Villain{
    constructor(animationss){
      this.x = random(1,700)
      this.y = 800
      this.w = 128
      this.h = 128
      this.animationss = animationss
      this.currentAnimation = "Walk_villain";
      this.currentFrame = 0
    }
   render(){
     image(this.animationss[this.currentAnimation][this.currentFrame],this.x,this.y,this.w,this.h)
   }
  update(){
    if(this.y>0){
      this.y-=4
    }
    else{
      this.y = 800
      this.x = random(1,700)
    }
   
  }
    issColliding(object) {
      const L1 = this.x;
      const R1 = this.x + this.w;
      const L2 = object.x;
      const R2 = object.x + object.w;
    
      const T1 = this.y;
      const B1 = this.y + this.h;
      const T2 = object.y;
      const B2 = object.y + object.h;
    
      
      const collisionX = L2 < R1 && L1 < R2;
     
      const collisionY = B1 > T2 && T1 < B2;
    
      return collisionX && collisionY;
    }
  
  }