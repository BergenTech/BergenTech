class Bubble {
   constructor(x, y, speed) {
       this.x = x
       this.y = y
       this.d = 40
       this.speed = speed
       this.img = random(images)
   }
   display() {
       push()
       imageMode(CENTER)
       image(this.img, this.x, this.y, this.d, this.d)
       this.y += this.speed;
       pop()

   }
}
