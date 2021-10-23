const canvas= document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width =window.innerWidth * 0.6;
canvas.height = window.innerHeight * 0.6  ;
const img1 =new Image();
const img2 = new Image();
const img3 =new Image(); 
const img4 = new Image();

img1.src='rabitt.png';
img2.src = 'plant.png';
img3.src='carrot.png';
img4.src ='tiger.png';

// 등장 캐릭터의 속성부터 object 자료 정리
const rabbit = {
  x:150,
  y:300,
  width:50,
  height:50,
  draw(){
    ctx.drawImage(img1, this.x ,this.y );
  }
}

//장애물 -여러 장애물을 사용할 것이기 때문에 class로 정의
class Plant {
  constructor(){
    this.x =700;
    this.y=400;
    this.width =50;
    this.height =50;
    this.value="obstacle1"
  }
  draw(){
    ctx.drawImage(img2,this.x, this.y )
  }
}

class Tiger {
  constructor(){
    this.x= 700;
    this.y=280;
    this.width=50;
    this.height=50;
    this.value="obstacle2"
  }
  draw(){
    ctx.drawImage(img4 , this.x ,this.y );
  }
}
// 점수
class Carrot1 {
  constructor(){
    this.x =700;
    this.y=130;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx.drawImage(img3 , this.x ,this.y  )
  }
}
class Carrot2 {
  constructor(){
    this.x= 500;
    this.y= 350;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx.drawImage(img3 , this.x ,this.y  )
  }
}
// 애니메이션
let level=1 ; 
let timer = 0 ;
let pointArray = [];
let obstacleArray = [];
let jump = false;
let jumpTimer =0 ;
let getPoints =0 ;
let losePoints=0;
let point=15 ;

// 상황에 따른 텍스트 변화

const htmlPoint = document.getElementById('points');
const htmlLevel = document.getElementById('level');
const gameState =document.getElementById('state');
const popup =document.querySelector('.popup');
const gameExplain =document.getElementById('explain');
const startBtn = document.querySelector('.start');

function StartGmae (){
  popup.classList.remove('on');
  canvas.style.display='block';
}
startBtn.addEventListener('click', StartGmae) ; 
function ClearGame (){
  cancelAnimationFrame(AniObject);
  obstacleArray =[];
  pointArray =[] ;
  popup.classList.add('on');
  gameExplain.textContent="게임을 다시 하시겠습니까?"
  
  function restartGame(){
    losePoints = 0; 
    getPoints = 0;
    point = 0; 
    level= 1 ; 
    jumpTimer =0 
    timer = 0; 
    StartGmae();
  }
  startBtn.addEventListener('click',restartGame ); 
}
function ChangeLevel (){
  if (point < 0 ){
    gameState.textContent = "Game over...";
    ClearGame();
    htmlPoint.textContent = '점수:0';
  }else {
    htmlPoint.textContent=`점수: ${point}`;
  }
  if(level==1 && point >  4 ){
    level =2 ;
    htmlLevel.textContent ='LEVEL 2🥕🥕';
  }
  if (level == 2 && point> 8 ){
    level =3 ;
    htmlLevel.textContent ='LEVEL 3🥕🥕🥕' ;
  }
  if (level ===3 && point > 12){
    ClearGame();
    gameState.textContent = "Mission Clear🐰💛" ;
  }
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
  ctx.clearRect(0,0, canvas.width ,canvas.height);

  timer++ ;
  point= Math.round(getPoints/30)-Math.round(losePoints/30); 
  //객체 생산 
  rabbit.draw() ;
  const plant = new Plant();
  const tiger =new Tiger();
  const carrot1 = new Carrot1();
  const carrot2 = new Carrot2();

  if(  level > 2  && timer % 80 == 0){
    obstacleArray.push(plant);
  }
  if (level <= 2 && timer % 175 === 0){ 
    obstacleArray.push(plant);
  }
  if( level >1 && timer % 350 == 0 ){
    obstacleArray.push(tiger);
  }
  obstacleArray.forEach( (obstacle ,i ,o)=>{
    if(obstacle.x<0){
      o.splice(i,1)
    };
    obstacle.x-- ;
    obstacle.draw();
    DetectConflict(rabbit,obstacle);
    obstacle.value === "obstacle1" ? LosePoint(1) : LosePoint(6);
    
  })
  
  if(timer % 400 == 0){pointArray.push(carrot1);}
  if (timer % 450 == 0){pointArray.push(carrot2);}
  
  pointArray.forEach( (pointObject,i,o)=>{
    if(pointObject.x<0){
      o.splice(i,1)
    };
    pointObject.x--;
    pointObject.draw();
    DetectConflict(rabbit,pointObject);
    GetPoint(1);
  })

  //점프 기능 설정 
  if(rabbit.y<10){
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
    if(rabbit.y < 400){
      rabbit.y+=3 ;  
    } 
  }
  if( jumpTimer > 50){
    jump =  false ; 
    jumpTimer =0;  }

  
  };
  AniObject();

