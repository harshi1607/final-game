var sanitizer,sanitizerImg,coronaImg1,coronaImg2,coronaImg3,coronaImg4,bgimg;
var boyImg,boyImg_,sanitizerImg_,coronaImg1_,coronaImg2_,coronaImg3_,coronaImg4_,heartImg,gameoverimg;
var boy,coronaGroup;
var imageArray=[];
var score=0
var chance1,chance2,chance3,chance=3,lifelost=false;
var gameOver
var gameState="play"
var isTouching = false;
function preload(){
boyImg=loadImage("images/boy.png")
boyImg_=loadImage("images/deadboy.png")  
sanitizerImg=loadImage("images/sanitizer.png")
sanitizerImg_=loadImage("images/sanitizerhit.png")
coronaImg1=loadImage("images/corona_alive.png")
coronaImg1_=loadImage("images/coronadead.png")
coronaImg2=loadImage("images/corona2alive.png")
coronaImg2_=loadImage("images/corona2dead.png")
coronaImg3=loadImage("images/corona3alive.png")
coronaImg3_=loadImage("images/corona3dead.png")
coronaImg4=loadImage("images/corona4alive.png")
coronaImg4_=loadImage("images/corona4dead.png")
heartImg=loadImage("images/heart.png")
gameoverimg=loadImage("images/GAMEOVER.png")
bgimg=loadImage("images/bgimg.png")

}

function setup() {
  createCanvas(1200,600);
   boy=createSprite(width/2,height/2+10, 50, 50);
   boy.addImage("alive",boyImg)
   boy.addImage("dead",boyImg_)
   boy.scale=0.3
   boy.setCollider("rectangle",0,-50,300,900)
   boy.debug = true;
   sanitizer=createSprite(200,200,20,20)
   sanitizer.addImage("sanitizer",sanitizerImg)
   sanitizer.addImage("sanitizerHit",sanitizerImg_)
   sanitizer.scale=0.7
   sanitizer.debug=true
   coronaGroup=new Group()
   chance1=createSprite(50,50,20,20)
   chance1.addImage(heartImg)
   chance1.scale=0.2
   chance2=createSprite(100,50,20,20)
   chance2.addImage(heartImg)
   chance2.scale=0.2
   chance3=createSprite(150,50,20,20)
   chance3.addImage(heartImg)
   chance3.scale=0.2
   gameOver=createSprite(width/2,450,20,20)
   gameOver.addImage(gameoverimg)
   gameOver.visible=false

}

function draw() {
  background(bgimg);  
  textSize(20)
  fill("white")
  text("SCORE:"+score,1000,50)
  

sanitizer.changeImage("sanitizer",sanitizerImg)

if(chance===2){
  chance3.visible=false
}
else if(chance===1){
  chance2.visible=false
}
else if(chance===0){
  chance1.visible=false
  gameState="gameOver"
}
if(gameState==="gameOver"){
  boy.changeImage("dead",boyImg_)
  coronaGroup.destroyEach()
  gameOver.visible=true
}
if(gameState==="play"){
  spawnCorona()
  sanitizer.x=mouseX
  sanitizer.y=mouseY
}

for(var i = 0;i<coronaGroup.length;i++){


  
  if(coronaGroup.get(i).isTouching(boy)&&!lifelost){
  chance--;
  lifelost=true
console.log(chance)}
  


  if(coronaGroup.get(i).isTouching(sanitizer)){
   //console.log("isTouching "+imageArray);
   //isTouching = true;
    sanitizer.changeImage("sanitizerHit",sanitizerImg_)

    if(imageArray[i]==="img1"){
      coronaGroup.get(i).changeImage("c1",coronaImg1_)
      imageArray.splice(imageArray.indexOf("img1"),1)
      score++;
     dropCorona(coronaGroup.get(i))
    }
    else if(imageArray[i]==="img2"){
      coronaGroup.get(i).changeImage("c2",coronaImg2_)
      imageArray.splice(imageArray.indexOf("img2"),1)
      score++;
      dropCorona(coronaGroup.get(i))
    }
    else if(imageArray[i]==="img3"){
      coronaGroup.get(i).changeImage("c3",coronaImg3_)
      imageArray.splice(imageArray.indexOf("img3"),1)
      score++;
      dropCorona(coronaGroup.get(i))
    }
    else if(imageArray[i]==="img4"){
      coronaGroup.get(i).changeImage("c4",coronaImg4_)
      imageArray.splice(imageArray.indexOf("img4"),1)
      score++;
      dropCorona(coronaGroup.get(i))
    }
   coronaGroup.get(i).lifetime=10
   //console.log(imageArray)
  }
 // setInterval(killcorona(coronaGroup.get(i)),10000)
}

  drawSprites();
}
function spawnCorona(){
  if(frameCount===30||frameCount%(100-score)===0){
   // imageArray=[]
   lifelost=false
    var randDirection=Math.round(random(1,4))
    var corona=createSprite(300,30,20,20)
    corona.scale=0.3
    corona.debug=true
    switch(randDirection){
      case 1: corona.x=10
      corona.y=height/2
      corona.velocityX=4+Math.round(score/10)
      corona.lifetime=width/4
      break;
      case 2: corona.x=width
      corona.y=height/2
      corona.velocityX=-(4+Math.round(score/10))
      corona.lifetime=width/4
      break;
      case 3: corona.x=width/2
      corona.y=10
      //corona.velocityX=4
      corona.velocityY=4+Math.round(score/10)
      corona.lifetime=height/4
      break;
      case 4: corona.x=width/2
      corona.y=height
     // corona.velocityX=4
      corona.velocityY=-(4+Math.round(score/10))
      corona.lifetime=height/4
      break;
    }
    
    
    var rand=Math.round(random(1,4))

    switch(rand){
      case 1: corona.addImage("11",coronaImg1)
      corona.addImage("c1",coronaImg1_);
      imageArray.push("img1")
      break;
      case 2:corona.addImage("22",coronaImg2)
         corona.addImage("c2",coronaImg2_);
      imageArray.push("img2")
      break;
      case 3:corona.addImage("33",coronaImg3)
         corona.addImage("c3",coronaImg3_);
      imageArray.push("img3")
      break;
      case 4:  corona.addImage("44",coronaImg4)
      corona.addImage("c4",coronaImg4_);
     
      imageArray.push("img4")
      break;
    }
    coronaGroup.add(corona)
  }
}
function dropCorona(corona){
  if(corona.velocityY>0){
    corona.velocityY=-3
  }
  else{
    corona.velocityY=3
  corona.velocityX=0
  }
}