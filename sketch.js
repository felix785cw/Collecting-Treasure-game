var PLAY = 1;
var END = 0;
var gameState = 1;

var alien, fruit1, fruit2, fruit3, fruit4, sword, GameOver;
var alienI, swordI, GameOverI;
var fruitGroup, alienGroup;

function preload() {
alienI = loadAnimation("alien1.png", "alien2.png");
fruit1 = loadImage("fruit1.png");
fruit2 = loadImage("fruit2.png");
fruit3 = loadImage("fruit3.png");
fruit4 = loadImage("fruit4.png");
swordI = loadImage("sword.png");
GameOverI = loadImage("gameover.png");

sound = loadSound("knifeSwooshSound.mp3");
 sound1 = loadSound("gameover.mp3");

}



function setup() {
  createCanvas(600, 600);
  fruitGroup = new Group();
  alienGroup = new Group();

  sword = createSprite(300, 10, 10);
  sword.addImage(swordI)
  sword.scale = 0.7



  score = 0
}

function draw() {
  background("lightblue");



  if (gameState === PLAY) {
    spawnfruit();
    spawnalien();

    if (fruitGroup.isTouching(sword)) {
      sound.play();
      fruitGroup.destroyEach();
      score = score + 1;
    }

    sword.y = World.mouseY
    sword.x = World.mouseX

    if (alienGroup.isTouching(sword)) {
      gameState = END;
      sound1.play();

      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      alienGroup.setVelocityXEach(0);


      sword.addImage(GameOverI);
      sword.x = 300;
      sword.y = 300;
    }
    
    }
  

  drawSprites();

  text("Score:" + score, 300, 30)
}

function spawnfruit() {
  

   if(World.frameCount%80===0){
     position = Math.round(random(1,2)); fruit=createSprite(400,200,20,20);
     console.log(position);
     if(position==1) {
       fruit.x=400;
       fruit.velocityX=-(7+(score/4));
     } 
     else { 
       if(position==2){ 
         fruit.x=0; 
          velocityX= (7+(score/4));
       } } 
     fruit.scale=0.2; fruit.debug=true; 
     r=Math.round(random(1,4));
     if (r == 1) { fruit.addImage(fruit1); 
                 } else if (r == 2) { fruit.addImage(fruit2);
                                    } else if (r == 3)
                                    { fruit.addImage(fruit3);
                                    } else { fruit.addImage(fruit4);
                                           } fruit.y=Math.round(random(50,340)); 
     fruit.setLifetime=100; 
     fruitGroup.add(fruit); 
   }


    //fruit.scale = 0.2;
    //fruit.lifetime = 100;


    //fruitGroup.add(fruit);
  //}
}




function spawnalien() {
  if (World.frameCount % 200 === 0) {
    alien = createSprite(600, 200, 20, 20);
    alien.addAnimation("moving", alienI);
    alien.y = Math.round(random(100, 300));
    alien.velocityX = -(6 + (score / 10));
    alien.setLifetime = 50;

    alienGroup.add(alien);

  }
}