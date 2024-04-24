// Global Variables
let screen = 0
let grassBg, gameOverBg, WASDImage, mouseImg
let PlayerIdle, PlayerWalk, PlayerShoot, ZombieMove
let fireSound, bgMusic
let zombieSpawnTime = 300
let totalZombies = 50
let frame = 0
let score = 0
let hearts = {
	welcomeImg:null,
	imgs:[],
	contain:[],
	x:500,
	y:50
}

let backgrounds = []
let zombies = []
let bullets = []
let health = 3
let player, bg
let backsplash

let playButton = {
	img: null,
	x:200,
	y:200,
  w:240,
  h:85,
}
function preload(){
	soundFormats('mp3','ogg')
	//fireSound = loadSound('assets/sounds/pixelShots.mp3')
	//bgMusic = loadSound('assets/sounds/MonkeysSpinningMonkeys.mp3')
  	grassBg = loadImage('assets/backgrounds/backgroundsgrass.png')
  	gameOverBg = loadImage('assets/misc/gamesOver.jpg')
	playButton.img = loadImage('assets/buttons/startbuttons.png')
	PlayerIdle = loadImage('assets/playeranimations/PlayersIdle.png')
	PlayerShoot = loadImage('assets/playeranimations/PlayersShooting.png')
	PlayerWalk = loadImage('assets/playeranimations/PlayersWalking.png')
	ZombieMove = loadImage('assets/enemy/zombies.png')
	WASDImage = loadImage('assets/misc/wasdKeys.png')
	mouseImg = loadImage('assets/misc/mouseImgs.png')
	backsplash = loadImage('assets/backgrounds/backsplashes.png')
	hearts.welcomeImg = loadImage('assets/misc/heart.webp')
	for (i=0;i<3;i++){
		hearts.imgs[i] = loadImage('assets/misc/heart.webp')
	}
	for (i=0;i<9;i++){
		let back = loadImage(`assets/backgrounds/playing/bgs0${i+1}.png`)
		backgrounds.push(back)
	}
}

let playerAnimations = {
	Idle: [],
	Walk: [],
	Shoot: []
}

let zombieAnimations = {
	Zombie: [],
}

function playerFrames(spritesheet){
	let animation = []
	for(y=0;y<spritesheet.height;y+=16){
		let img = spritesheet.get(0,y,24,16)
		animation.push(img)
	}
	return animation
}

function zombieFrames(spritesheet){
	let animation = []
	for(y=0;y<spritesheet.height;y += (48)){
		for(x=0;x<spritesheet.width;x += (48)) {
			let img = spritesheet.get(x,y,48,48)
			animation.push(img)
		}
	}
	if (animation.length > 8){
		animation.pop()
		return animation
	} else {
		return animation
	}
}
function setup() {
  createCanvas(640, 480);
	frameRate(30);
	playerAnimations.Idle = playerFrames(PlayerIdle)
	playerAnimations.Walk = playerFrames(PlayerWalk)
	playerAnimations.Shoot = playerFrames(PlayerShoot)
	zombieAnimations.Zombie = zombieFrames(ZombieMove)
	player = new Player(playerAnimations)
	bg = new Pantalla(backgrounds)
}

function draw() {
	textAlign(CENTER)
	if (screen == 0) {
		welcome()
	}
	else if (screen == 1){
    playGame()
  }
  else if (screen = 2){
    gameOver()
  }
}

// WELCOME SCREEN

function welcome(){
  background(grassBg)
  push()
	imageMode(CENTER)
	textFont('Crang',50);
	text('Zombie Rush',width/2,100)
	image(playButton.img,320,240)
	image(WASDImage,width/6,(height*(3/4)+20),(256/2),(167.5/2))
	image(mouseImg,width/2,(height*(3/4)+5),(256/3),(256/3))
	image(hearts.welcomeImg,width*(5/6),(height*(3/4)+5),(256/4),(256/4))
	textFont('RetroGaming',22)
	text('WASD to move!',width/6,(height*0.75)+80)
	textFont('RetroGaming',18)
	text('Hold click to aim, \nRelease to fire!',width/2,(height*0.75)+70)
	textFont('RetroGaming',18)
	text('You have 3 lives, \nSurvive!',width*(5/6),(height*0.75)+50)
  pop()
	if (play(playButton)) {
		screen += 1
		//bgMusic.play()
	}
}

// Game Screen
function playGame(){
	push()
	background(backsplash);
	imageMode(CENTER)
	// background(225)
	bg.display()
	bg.move(player)
	for (let j = 0; j < 3; j++) {
			let x = hearts.x;
			for (let i = hearts.imgs.length - 1; i >= 0; i--) {
				if (hearts.imgs.length >= 0){
					image(hearts.imgs[i], x, 20, 32, 32);
				}
					x += 40;
			}
	}
	textFont('Upheaval',36)
	fill(255)
	text(`Score: ${score}`,width/2,20)
	
	player.render()
	player.update()

	for (let i = zombies.length - 1; i >= 0; i--) {
			zombies[i].render();
			zombies[i].update();

		if (zombies[i].attack()) {
				health = health - 1;
				zombies.splice(i, 1);

				if (hearts.imgs.length > 0) {
					hearts.contain.push(hearts.imgs.pop());
				}
		} else if (player.bulletCollided(zombies[i])) {
				zombies.splice(i, 1);
				score++
		}
	}

	if(health == 0){
		screen++
	}
	
	if (frame >= zombieSpawnTime && zombies.length <= totalZombies) {
			zombies.push(new Zombie(zombieAnimations, 2));
			zombieSpawnTime *= 0.95;
			frame = 0;
	}
	frame++;
	pop()
}

function mouseClicked(){
	if(screen == 1){
		player.fire()	
	//	fireSound.play()
	}
}

// GAME OVER SCREEN

function gameOver(){
  push()
	background(0);
	translate(width/2,height/2)
	imageMode(CENTER)
  image(gameOverBg,0,0)
	textFont('Crang',20)
  fill(255)
	text('Press the screen to retry',0,200)
  pop()
	if (mouseIsPressed){
    screen = 1
	health = 3
	for (i = hearts.contain.length - 1;i>=0; i--){
	hearts.imgs.push(hearts.contain.pop())
	}
	frame = 0
	zombieSpawnTime = 300
  }
}

function play(btn) {
	if (mouseX > btn.x && mouseX < btn.x + btn.w && mouseY > btn.y && mouseY < btn.y + btn.h && mouseIsPressed == true) {
		return true
	}
}

// classes

class Player{
	constructor(animations){
		this.x = 0
		this.y = 0
		this.animations = animations
		this.currentAnimation = 'Idle'
		this.currentFrame = 0
		this.pos = createVector(width/2, height/2)
		this.angle = 0
		this.bullets=[]
	}
	render(){
		push()
		imageMode(CENTER)
		translate(this.pos.x,this.pos.y)
		rotate(this.angle)
		image(this.animations[this.currentAnimation][this.currentFrame],this.x,this.y,48,32)
		pop()
		for (let bullet of this.bullets) {
			bullet.render()
			bullet.update()
		}
	}
	update(){
		this.currentFrame = (this.currentFrame+1) % this.animations[this.currentAnimation].length
		if (keyIsDown(65)) {
			this.currentAnimation = 'Walk';
		} else if (keyIsDown(68)) {
			this.currentAnimation = 'Walk';
		} else if (keyIsDown(87)) {
			this.currentAnimation = 'Walk';
		} else if (keyIsDown(83)) {
			this.currentAnimation = 'Walk';
		} else if (mouseIsPressed === true) {
			this.currentAnimation = 'Shoot';

		} else {
			this.currentAnimation = "Idle"
		}

		this.angle = Math.atan2(mouseY-this.pos.y, mouseX-this.pos.x);
	}
	fire(){
			this.bullets.push(new Bullet(this.pos.x,this.pos.y,this.angle))
		} 
	bulletCollided(enemy) {
			for (let i = this.bullets.length - 1; i >= 0; i--) {
					if (dist(this.bullets[i].x, this.bullets[i].y, enemy.pos.x, enemy.pos.y) < 15) {
							this.bullets.splice(i, 1);
							return true;
					}
			}
			return false;
	}

}

class Zombie {
	constructor(animation, speed){

		let y;
		if(random(1) < 0.5) {
			// spawns above
			y = random(-300,-20)
		} else {
			// spawns below
			y = random(500,800)
		}
		let x = random(-300,940)
		this.speed = speed
		this.animation = animation
		this.currentAnimation = 'Zombie'
		this.currentFrame = 0
		this.pos = createVector(x,y)
		this.width = 20
		this.height = 20
	}
	render(){
		push()
		let angle = atan2(player.pos.y-this.pos.y, player.pos.x-this.pos.x);
		translate(this.pos.x,this.pos.y)
		rotate(angle)
		imageMode(CENTER)
		image(this.animation[this.currentAnimation][this.currentFrame],0,0,48,48)
		pop()
	}
	update(){
		this.currentFrame = (this.currentFrame+1) % this.animation[this.currentAnimation].length
		let difference = p5.Vector.sub(player.pos,this.pos)
		difference.limit(this.speed)
		this.pos.add(difference)
	}
	attack(){
		return dist(this.pos.x,this.pos.y,player.pos.x,player.pos.y) < 20;
	}
}

class Bullet {
	constructor(x, y, angle) {
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = 16;
	}
	render() {
		push()
		fill(0)
		circle(this.x, this.y, 5)
		pop()
	}
	update() {
		this.x += this.speed * cos(this.angle)
		this.y += this.speed * sin(this.angle)
	}
	bulletOutOfBounds() {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			if (this.x > 640 || this.x < 0 || this.y > 480 || this.y < 0) {
				bullets.splice(i, 1);
			}
		}
	}
}

class Pantalla {
    constructor(textures){
      this.x = [0, -width, width]
      this.y = [0, -height, height]
      this.textures = textures
    }
    display(){
      push()
      image(this.textures[0],this.x[1],this.y[1],640,480)
      image(this.textures[1],this.x[0],this.y[1],640,480)
      image(this.textures[2],this.x[2],this.y[1],640,480)
  
  
      image(this.textures[3],this.x[1],this.y[0],640,480)
      image(this.textures[4],this.x[0],this.y[0],640,480)
      image(this.textures[5],this.x[2],this.y[0],640,480)
  
      image(this.textures[6],this.x[1],this.y[2],640,480)
      image(this.textures[7],this.x[0],this.y[2],640,480)
      image(this.textures[8],this.x[2],this.y[2],640,480)
      pop()
  
    }
    move(hitbox) {
      // Top
    if (hitbox.y <= this.y[1]){
      hitbox.y = this.y[1]
    }
    else if (keyIsDown(87)) {
      for (let i = 0; i < this.y.length;i++){
        this.y[i] += 15
      }
    }

    // Bottom
    if (hitbox.y+hitbox.radius >= this.y[2]+480){
      hitbox.y = this.y[2]+480 - hitbox.radius
    }
    else if (keyIsDown(83)) {
      for (let i = 0; i < this.y.length;i++){
        this.y[i] -= 15
      }
    }

   // Left DONE
    if (hitbox.x <= this.x[1]){
      hitbox.x = this.x[1]
    }
    else if (keyIsDown(65)) {
      for (let i = 0; i < this.x.length;i++){
        this.x[i] += 15
      }
    }

    // Right
    if (hitbox.x+hitbox.radius >= this.x[2]+640){
      hitbox.x = this.x[2]+640 - hitbox.radius
    }
    else if (keyIsDown(68)) {
      for (let i = 0; i < this.x.length;i++){
        this.x[i] -= 15
      }
    }
    }
  }