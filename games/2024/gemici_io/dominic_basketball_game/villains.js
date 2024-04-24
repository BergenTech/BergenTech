class Villain{
  constructor(animationss){
    this.x = random(1,700)
    this.y = 800
    this.w = 128
    this.h = 128
    this.animationss = animationss
    this.currentAnimation = "Walk_villain";
    this.currentFrame = 0
  }
 render(){
   image(this.animationss[this.currentAnimation][this.currentFrame],this.x,this.y,this.w,this.h)
 }
update(){
  if(this.y>0){
    this.y-=4
  }
  else{
    this.y = 800
    this.x = random(1,700)
  }
 
}
  issColliding(object) {
    const L1 = this.x;
    const R1 = this.x + this.w;
    const L2 = object.x;
    const R2 = object.x + object.w;
  
    const T1 = this.y;
    const B1 = this.y + this.h;
    const T2 = object.y;
    const B2 = object.y + object.h;
  
    
    const collisionX = L2 < R1 && L1 < R2;
   
    const collisionY = B1 > T2 && T1 < B2;
  
    return collisionX && collisionY;
  }

}