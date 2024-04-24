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
