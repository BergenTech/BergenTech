class Bird {
  constructor(y){
    this.x=100
    this.y=y
    this.speed=0
    this.gravity=0.3
    this.up=false
    this.lift=-10
    this.img=birdimg
  }
  display(){
    push()
      imageMode(CENTER)
      image(this.img, this.x, this.y,50,50)
    pop()
  }
  move(){
    this.speed += this.gravity
    this.speed = constrain(this.speed, -25, 25);
    this.y += this.speed;
    if (this.y > height) {
      this.speed = 0;
      this.y = height;
    } else if (this.y < 0) {
      this.speed = 0;
      this.y = 0;
    }
    this.up = false;
  }
  flap(){
    this.speed+=this.lift
    this.up=true
  }
}