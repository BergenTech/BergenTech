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
