let Idle,Walk_villain,Idle_villain,Run,Dead

function preload(){ 
  BasketballGame.gameOverImage = loadImage("assets/images/game_over_screen.jpg")
  BasketballGame.preview = loadImage("assets/images/welcome_screen.jpg")
  Idle_villain = loadImage("assets/images/villains/Swordsman/Idle.png")
  Walk_villain = loadImage("assets/images/villains/Swordsman/Pick_Up.png")
  Idle = loadImage("assets/images/player/Biker_idle.png")
  Run = loadImage("assets/images/player/Biker_run_attack.png")
  Dead = loadImage("assets/images/player/Biker_death.png")
}
let animations = {
  Idle: [],
  Run: [],
  Dead: [],
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
  animations.Dead = createFramess(Dead)
  animationss.Idle_villain = createFrames(Idle_villain)
  animationss.Walk_villain = createFrames(Walk_villain)
}

function draw() {
  background(220);
  Basketball_Game.draw()
}