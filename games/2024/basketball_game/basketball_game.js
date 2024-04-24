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