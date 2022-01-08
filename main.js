// iconsBtn
const iconsBtn =document.getElementById('iconsBtn');
const iconsUl =document.getElementById('iconsUl');
function iconsPopup (){
  iconsUl.classList.toggle('on');
  iconsBtn.classList.toggle('on')
};
iconsBtn.addEventListener('click', iconsPopup);

// canvas
const canvas1= document.getElementById("canvas1");
const canvas2= document.getElementById("canvas2");
const ctx1 = canvas1.getContext('2d');
const ctx2 =canvas2.getContext(`2d`);
const canvas =document.getElementById('canvas');
const htmlPoint = document.getElementById('points');
const htmlLevel = document.getElementById('level');
const gameState =document.getElementById('state');
const popup =document.querySelector('.popup');
const gameExplain =document.getElementById('explain');
const startBtn = document.querySelector('.start');

let level=1 ; 
let timer  ;
let pointArray = [];
let obstacleArray = [];
let jump = false;
let jumpTimer =0 ;
let getPoints =0 ;
let losePoints=0;
let point ;

// 창크기에 따른 canvas 크기 조절  
function CheckWindowSize(){
  canvas1.width =window.innerWidth * 0.59;
  canvas2.width =window.innerWidth * 0.59;
  canvas1.height = window.innerHeight * 0.6 ;
  canvas2.height = window.innerHeight * 0.6 ;
  if(window.innerWidth < 768){
    gameExplain.textContent = "게임을 진행하기에 창 크기가 작습니다.창의 크기가 768px 이상으로 변경 후 새로고침해주세요.";
    gameExplain.style.fontSize =10; 
    gameState.style.display='none';
    startBtn.style.display='none';
  }
}
CheckWindowSize();

window.onresize = CheckWindowSize;  


const rabbit_img =new Image();
const filed_img = new Image();
const plant_img = new Image();
const carrot_img =new Image(); 
const tiger_img = new Image();

rabbit_img.src='rabbit.png';
filed_img.src = 'filed.png';
plant_img.src = 'plant.png';
carrot_img.src='carrot.png';
tiger_img.src ='tiger.png';

const rabbit = {
  x: window.innerWidth>900? 150 : 50,
  y: window.innerHeight * 0.5,
  width:55,
  height:55,
  draw(){
    ctx1.drawImage(rabbit_img, this.x ,this.y , this.width ,this.height);
  }
}
class Filed {
  constructor(){
    this.x = window.innerWidth*0.6;
    this.y= window.innerHeight * 0.56 ;
    this.width =100;
    this.height =50;
    this.value="deco"
  } 
  draw(){
    ctx2.drawImage(filed_img,this.x, this.y )
  }
}
class Plant {
  constructor(){
    this.x = window.innerWidth*0.6;
    this.y= window.innerHeight * 0.5;
    this.width =50;
    this.height =100;
    this.value="obstacle1"
  } 
  draw(){
    ctx2.drawImage(plant_img,this.x, this.y )
  }
}
class Tiger {
  constructor(){
    this.x= window.innerWidth*0.6;
    this.y=200;
    this.width=50;
    this.height=50;
    this.value="obstacle2"
  }
  draw(){
    ctx2.drawImage(tiger_img , this.x ,this.y );
  }
}
class Tiger2 {
  constructor(){
    this.x= window.innerWidth*0.6;
    this.y=100;
    this.width=50;
    this.height=50;
    this.value="obstacle2"
  }
  draw(){
    ctx2.drawImage(tiger_img , this.x ,this.y );
  }
}

class Carrot1 {
  constructor(){
    this.x =  window.innerWidth*0.6;
    this.y=30;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx2.drawImage(carrot_img , this.x ,this.y  )
  }
}
class Carrot2 {
  constructor(){
    this.x= window.innerWidth*0.6;
    this.y= window.innerHeight * 0.45;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx2.drawImage(carrot_img , this.x ,this.y  )
  }
}
class Carrot3 {
  constructor(){
    this.x=  window.innerWidth*0.6;
    this.y= 160;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx2.drawImage(carrot_img , this.x ,this.y  )
  }
}


function StartGame (){
  popup.classList.remove('on');
  canvas.style.display="block";
}
startBtn.addEventListener('click', StartGame); 

function ClearGame (){
  cancelAnimationFrame(AniObject);
  obstacleArray =[];
  pointArray =[] ;
  jumpTimer =0 
  timer = 0; 
  popup.classList.add('on');
  gameExplain.textContent="게임을 다시 하시겠습니까?"
  
  function restartGame(){
    losePoints = 0; 
    getPoints = 0;
    point = 0; 
    level= 1 ; 
    ChangeLevel();
    StartGame();
  }
  startBtn.addEventListener('click',restartGame ); 
}

function ChangeLevel (){

  if (point < 0 ){
    gameState.textContent = "Game over...";
    ClearGame();
    htmlPoint.textContent = 'POINT: 0';
  }else {
    htmlPoint.textContent=`POINT : ${point}`;
  }
  
  if(level==1 && point >  8 ){
    level =2 ;
  }
  if (level == 2 && point> 16 ){
    level =3 ;
  }
  if (level ===3 && point > 20){
    ClearGame();
    gameState.textContent = "Mission Clear🐰💛" ;
  }
  let levels =[
    '🥕' , '🥕🥕' ,'🥕🥕🥕'
  ];
  htmlLevel.textContent =`LEVEL : ${level} ${levels[level-1]}`;
}

// 점프 
document.addEventListener('keydown', function(e){
  if(e.code ==='Space'){
    jump = true ; 
  }
});


//충돌 감지, 충돌에 따른 점수 변화
let xIsTrue = false;
let yIsTrue = false ;

function DetectConflict (r, o){
  let x = r.x <= o.x ;
  let x1 = o.x <= (r.x+r.width) ;
  let x2 = r.x<=(o.x+o.width);
  let x3 = (o.x + o.width) <= (r.x +r.width);
  let y = r.y <= o.y ; 
  let y1 = o.y <=(r.y+r.height);
  let y2 = r.y <= (o.y+ o.height) ;
  let y3 = (o.y+ o.height) <= (r.y + r.height) ; 

  (x && x1)||(x2 && x3) ? xIsTrue =true : xIsTrue=false ;
  (y && y1)||(y2 && y3) ? yIsTrue =true : yIsTrue=false ;
  
}

function LosePoint(n){
  if(xIsTrue && yIsTrue){losePoints = losePoints+n;};
  ChangeLevel()
}
function GetPoint(n){
  if(  xIsTrue&& yIsTrue ){ getPoints = getPoints+n;} ;
  ChangeLevel()
}

function AniObject(){
  requestAnimationFrame(AniObject);
  ctx1.clearRect(0,0, canvas1.width ,canvas1.height);
  ctx2.clearRect(0,0, canvas2.width ,canvas2.height);

  popup.classList.contains('on') ? timer =100 : timer++ ;
  point= Math.round(getPoints/30)-Math.round(losePoints/30); 
  //객체 생산 
  rabbit.draw() ;
  const filed = new Filed();
  const plant = new Plant();
  const tiger =new Tiger();
  const tiger2 =new Tiger2();
  const carrot1 = new Carrot1();
  const carrot2 = new Carrot2();
  const carrot3 = new Carrot3();

  if(timer >0){
    MakeObject()
  }
  function MakeObject(){
  timer % 55 == 0 && obstacleArray.push(filed);
  timer % 170==0 && obstacleArray.push(plant);
  timer == 180 && pointArray.push(carrot1);
  timer == 300 && pointArray.push(carrot2);
  timer == 450 && obstacleArray.push(tiger);
  
  if(level ==1 ){
    timer % 497==0 && pointArray.push(carrot1);
    timer % 650 ==0 && pointArray.push(carrot3);
    timer % 903 == 0 && pointArray.push(carrot2);
  }
  if( level ==2  ){
    timer % 500 == 0 && pointArray.push(carrot1);
    timer % 918 == 0 && pointArray.push(carrot2);
  }
  if(level >1){
    timer % 800 == 0 && obstacleArray.push(tiger);
    timer % 1015 ==0 && obstacleArray.push(tiger2);
  }
  if(level ==3){
    timer % 900 == 0 && pointArray.push(carrot1);
    timer % 415 == 0 && pointArray.push(carrot2);
    timer % 610 == 0 && pointArray.push(carrot3)
  }
  obstacleArray.forEach( (obstacle ,i ,o)=>{
    if(obstacle.x<-100){
      o.splice(i,1)
    };
    obstacle.x-- ;
    obstacle.draw();
    DetectConflict(rabbit,obstacle);
    obstacle.value === "obstacle1" ? LosePoint(1) : LosePoint(6);
    
  })
  
  pointArray.forEach( (pointObject,i,o)=>{
    if(pointObject.x<-50){
      o.splice(i,1)
    };
    pointObject.x--;
    pointObject.draw();
    DetectConflict(rabbit,pointObject);
    GetPoint(1);
  })
}

  //점프 기능 설정 
  if(rabbit.y<5){
    jump =false;
  }
  if(jump == true){
    switch(level){
      case 1:
        rabbit.y-=3;
        break;
      case 2:
        rabbit.y -=4;
        break;
      case 3:
        rabbit.y -=6;
        break;
    }
    jumpTimer++;
    
  } 
  if (jump ==false){
    if(rabbit.y <= window.innerHeight * 0.5){
      rabbit.y+=3 ;  
    } 
  }
  if( jumpTimer > 50){
    jump =  false ; 
    jumpTimer =0;  }

  };
  AniObject()


