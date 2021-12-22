
var path,boy,coin,diamond,nail;
var pathImg,boyImg,coinImg,diamondImg,nailImg;
var treasureCollection = 0;
var coinGroup,diamondGroup,nailGroup;

//Game States:
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
  pathImg = loadImage("images1/path.jpg");
  boyImg = loadAnimation("images1/Runner1.png","images1/Runner2.png");
  coinImg = loadImage("images1/coin.jpg");
  diamondImg = loadImage("images1/diamond.jpeg");
  nailImg = loadImage("images1/nail.jpeg");
  endImg =loadAnimation("images1/gameOver.png");
}


function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning","images1/Runner1.png","images1/Runner2.png",boyImg);
boy.addAnimation("SahilStop",endImg);
boy.scale=0.08;
console.log(boy.x)

coinGroup=new Group();
diamondGroup=new Group();
nailGroup=new Group();

}


function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCoin();
    createDiamond();
    createNail();

    if (coinGroup.isTouching(boy)) {
      coinGroup.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondGroup.isTouching(boy)) {
      diamondGroup.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
    else{
      if(nailGroup.isTouching(boy)) {
        gameState=END;
        
         boy.changeAnimation("SahilStop",endImg);

        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
         coinGroup.destroyEach;
         diamondGroup.destroyEach;
         nailGroup.destroyEach;
        
        coinGroup.setVelocityYEach(0);
        diamondGroup.setVelocityYEach(0);
        nailGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,10,30);
  }

}


function createCoin() {
  if (World.frameCount % 200 == 0) {
  var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.05;
  coin.velocityY = 3;
  coin.lifetime = 300;
  coinGroup.add(coin);
  }
}

function createDiamond() {
  if (World.frameCount % 320 == 0) {
  var diamond = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamond.addImage(diamondImg);
  diamond.scale=0.15;
  diamond.velocityY = 3;
  diamond.lifetime = 300;
  diamondGroup.add(diamond);
  }
}

function createNail(){
  if (World.frameCount % 530 == 0) {
  var nail = createSprite(Math.round(random(50, 350),40, 10, 10));
  nail.addImage(nailImg);
  nail.scale=0.2;
  nail.velocityY = 3;
  nail.lifetime = 300;
  nailGroup.add(nail);
  }
}  