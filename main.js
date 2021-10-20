const canvas= document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width =window.innerWidth -100;
canvas.height = window.innerHeight -100;

const img1 =new Image();
const img2 = new Image();
const img3 =new Image();

img1.src='rabitt.png';
img2.src = 'plant.png';
img3.src='carrot.png';

// 등장 캐릭터의 속성부터 object 자료 정리
const rabbit = {
  //공룡 등장 좌표
  x:200,
  y:400,
  // 공룡 사이즈
  width:50,
  height:50,
  // 공룡 등장시킬 때 쓸 함수
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x , this.y ,this.width, this.height);
    ctx.drawImage(img1, this.x ,this.y);
  }
}

//장애물 -여러 장애물을 사용할 것이기 때문에 class로 정의
class Plant {
  constructor(){
    this.x =700;
    this.y=400;
    this.width =50;
    this.height =50;
  }
  draw(){
    ctx.fillStyle ='grey';
    ctx.fillRect(this.x, this.y ,this.width ,this.height);
    ctx.drawImage(img2,this.x, this.y)
  }
}
// 점수
class Carrot {
  constructor(){
    this.x =700;
    this.y=180;
    this.width=50;
    this.height=50;
  }
  draw(){
    ctx.fillStyle ='orange';
    ctx.fillRect(this.x, this.y ,this.width ,this.height);
    ctx.drawImage(img3 , this.x ,this.y)
  }
}

// 애니메이션 -라이브러리 사용 추천
let timer = 0 ;
let plantArray = [];
let carrotArray = [];
let jump = false;
let jumpTimer =0 ;
let getPoints =0 ;
let losePoints=0;
let point=0 ;
const htmlPoint = document.getElementById('points');


document.addEventListener('keydown', function(e){
  if(e.code ==='Space'){
    jump = true ; 
  }
});




//충돌 감지
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

function LosePoint(){
  if(xIsTrue && yIsTrue){losePoints++;};
  htmlPoint.innerHTML=`점수: ${point}`;
}
function GetPoint(){
  if(  xIsTrue&& yIsTrue ){ getPoints++;} ;
  htmlPoint.innerHTML=`점수: ${point}`;
  
}

function GameOver(){
  if (point < 0 ){
    cancelAnimationFrame(AniObject);
    alert("GAME OVER... Do you want to play the game again?");
    plantArray =[];
    getPoints=0;
    losePoints=0;
    point=0;
  }
}
function AniObject(){
  requestAnimationFrame(AniObject);
  console.log(Math.round(losePoints/30) ,Math.round(getPoints/30) , point);
  timer++ ;
  point= Math.round(getPoints/30)-Math.round(losePoints/30);

  ctx.clearRect(0,0, canvas.width ,canvas.height); // 잔상 지우기 
  //장애물 생산 
  if(timer % 180 == 0){
    const plant = new Plant();
    plantArray.push(plant);
  }
  plantArray.forEach( (a ,i ,o)=>{
    if(a.x<0){
      o.splice(i,1)
    }; // x좌표 마이너스된 장애물 지우기 
    a.x-- ;
    a.draw();
    DetectConflict(rabbit,a);
    LosePoint();
  })

  if(timer % 400 == 0){
    const carrot = new Carrot();
    carrotArray.push(carrot);
  }
  carrotArray.forEach( (c,i,o)=>{
    if(c.x<0){
      o.splice(i,1)
    };
    c.x--;
    c.draw();
    DetectConflict(rabbit,c);
    GetPoint();
  })
  if(rabbit.y<10){
    jump =false;
  }
  if(jump == true){
    rabbit.y-=3;
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
  rabbit.draw() ; //1초 마다 60번실행 
  GameOver();
  };

AniObject();


