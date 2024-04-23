class Pipe2{
  constructor(){
    this.x=250
    this.len=random(70,125)
    this.len1=random(50,125)
    this.y=(height-this.len)
    
    this.img=pipe2
  }
  display(){
    push()
      imageMode(CORNER)
      image(this.img, this.x, this.y,50,this.len)
      scale(1,-1)
      image(this.img, this.x, 0,50,-this.len1)
    pop()
  }
  move(x){
    this.x-=x
  }
}