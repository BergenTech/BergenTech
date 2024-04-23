class Cannon {
    constructor(x) {
        this.x = x
        this.y = height - 40
        this.img = cannonImage
        this.speed = 8
        this.angle = 0
    }
    display() {
        push()
        imageMode(CENTER)
        translate(this.x,this.y)
        rotate(this.angle)
        image(this.img, 0, 0, 75, 100)
        pop()
    }
    control() {
        if (keyIsDown(39) && this.x + 37.5 < width) {
            this.x += this.speed
        } else if (keyIsDown(37) && this.x - 37.5 > 0) {
            this.x -= this.speed
        }
    }
    rotateCannon() {
          // down key rotate left
          if(this.angle>=-45 && keyIsDown(40)){
              this.angle -= 5
          }
          // up key rotate right
          if(this.angle<=45 && keyIsDown(38)){
              this.angle += 5
          }
      }
}
