var dog , happyDog,dogimg;
var database ;
var foodS=20,foodStock;
function preload()
{
  //load images here
  dogimg = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
  dog = createSprite(250,300,100,100);
  dog.scale =0.25
  dog.addImage(dogimg)
}

function readStock(data){
 foodS = data.val();

}
function writeStocks(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}
var pasttime,delay = 15,state = "idle";
function draw() {  
  if(frameCount -pasttime ==delay){
    dog.addImage(dogimg)
  state = "idle"}
  
  background(46, 139, 87)
  drawSprites();
  textSize(15)
  fill(212)
  textAlign(CENTER);

  text("Note: Press UP_ARROW Key To Feed Dog ",250, 50)
  textSize(25)
  text("Food remaining :"+foodS,250,200)
  
  if(keyWentDown(UP_ARROW) &&state =="idle"){
    writeStocks(foodS);
    dog.addImage(happyDog)
    pasttime =frameCount
    state = "drink"
  }
  if(keyWentDown("R")){
    writeStocks(21);
    
  }
  //add styles here

}



