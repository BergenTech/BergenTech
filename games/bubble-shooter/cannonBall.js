class cannonBall {
  constructor() {
    this.x = cannon1.x
    this.y = cannon1.y - 37.5
    this.d = 35
    this.speedY = 5
    this.speedX = 0
    this.img = ballImg
    this.angle = cannon1.angle
  }
  create() {
    push()
    imageMode(CENTER)

    translate(this.x + sin(this.angle) * 60, this.y + cos(this.angle) * 60)

    fill(0)
    image(this.img, 0, -50, this.d, this.d)
    pop()
  }
  shoot() {
    if (this.angle == 0) {
      this.y = this.y - this.speedY
      this.x = this.x + this.speedX
    }
    else if (this.angle > 0 || this.angle < 0) {
      this.y = this.y - cos(this.angle) * this.speedY
      this.x = this.x + sin(this.angle) * this.speedY
    }
  }
  hit(bubbles,j) {
    for (var i = 0; i < bubbles.length; i++) {
      if (dist(this.x, this.y, bubbles[i].x, bubbles[i].y) <= this.d/2+bubbles[i].d/2) {
        bubbles.splice(i, 1)
        balls.splice(j,1)
        points++
        total++
      }
    }
  }
}


