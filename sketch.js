
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground, food, rock;
var survival_time = 0;

var Play = 1;
var END = 0;
var gameState = Play;

var score;

function preload(){
  
  monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png",  "sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadAnimation("sprite_2.png");
  
}

function setup() {
   createCanvas(600, 400);
  
  ground = createSprite(300, 350, 600, 10);
  ground.shapeColor = "black";
  
  monkey = createSprite(120, 200);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  score = 0;
  
  obstacleGroup = new Group();
  foodGroup = new Group();
}

function draw() {
  background(rgb(158, 195, 255));
  
  ground.velocityX = -8;
  
  if(ground.x >= 0) {
    ground.x = ground.width/2;
  }
  
  if(gameState === Play) {
    
  if(frameCount % 4 === 0) {
    survival_time = survival_time + 1;
  }
     
  if(keyDown('space') && monkey.y >= 250) {
    monkey.velocityY = -17;  
  }  
  
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
    
  spawn_rock();
  spawn_food();
    
  }
  
  if(monkey.isTouching(obstacleGroup)) {
    gameState = END;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
  }
  
  if(monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score = score + 3;
  }
  
  if(gameState === END) {
    monkey.addAnimation("collided", monkey_collided);
    
    ground.velocityX = 0;
    
    stroke("black");
    textSize(30);
    fill("red");
    text("Game over", 230, 150);
    
    stroke("black");
    textSize(30);
    fill("black");
    text("Monkey died", 220, 185);
    
    stroke("black");
    textSize(18);
    fill("red");
    text("Press'R' to restart the game", 195, 215);
    
    if(keyDown('r')) {
      gameState = Play;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      survival_time = 0;
      score = 0;
    }
  }
  
  drawSprites();
  text("Survival Time : " + survival_time, 100, 50, textSize(20), stroke("black"), fill("black"));
  
  text("Score : " + score, 440, 50, textSize(20), stroke("black"), fill("black"));
}

function spawn_rock() {
  if(frameCount % 240 === 0) {
    rock = createSprite(650, 326);
    rock.scale = 0.2;
    rock.addImage(obstacleImage);
    rock.velocityX = -8;
    rock.debug = true;
    rock.setCollider("rectangle", 0, 0, 500, 400);
    obstacleGroup.add(rock);
  } 
}

function spawn_food() {
  if(frameCount % 80 === 0) {
    food = createSprite(630, Math.round(random(120, 200)));
    food.scale = 0.1;
    food.addImage(bananaImage);
    food.velocityX = -9;
    foodGroup.add(food);
  }
}