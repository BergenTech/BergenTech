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




