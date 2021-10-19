const canvas= document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const img1 =new Image();
const img2 = new Image();
img1.src='rabitt.png';
img2.src = 'plant.png';
canvas.width =window.innerWidth -100;
canvas.height = window.innerHeight -100;

// 등장 캐릭터의 속성부터 object 자료 정리
const rabbit = {
  //공룡 등장 좌표
  x:10,
  y:200,
  // 공룡 사이즈
  width:40,
  height:50,
  // 공룡 등장시킬 때 쓸 함수
  draw(){
    ctx.fillStyle = 'green';
    //ctx.fillRect(this.x , this.y ,this.width, this.height);
    ctx.drawImage(img1, this.x ,this.y);
  }
}

//장애물 -여러 장애물을 사용할 것이기 때문에 class로 정의
class Plant {
  constructor(){
    this.x =500;
    this.y=200;
    this.width =50;
    this.height =50;
  }
  draw(){
    ctx.fillStyle ='grey';
    //ctx.fillRect(this.x, this.y ,this.width ,this.height);
    ctx.drawImage(img2,this.x, this.y)
  }
}

let timer = 0 ;
let plantArray = [];
// 애니메이션 -라이브러리 사용 추천
let jump = false;
document.addEventListener('keydown', function(e){
  if(e.code ==='Space'){
    jump = true ; 
  }
});
let jumpTimer =0 ;

//충돌 감지
function CheckConflict( rabbit, plant){
  let x= plant.x - (rabbit.x+rabbit.width);
  let x1 = rabbit.x -(plant.x+plant.width);
  let y = plant.y - (rabbit.y+rabbit.height);

  if( x <0 && x1 < 0 && y<0){
    cancelAnimationFrame(AniObject);
    alert("GAME OVER... Do you want to play the game again?");
    plantArray =[];

  } 
}
function AniObject(){
  requestAnimationFrame(AniObject);
  timer++ ;
  ctx.clearRect(0,0, canvas.width ,canvas.height); // 잔상 지우기 

  if(timer % 180 == 0){
    const plant = new Plant();
    plantArray.push(plant);
    ;  // 2초에 한번 실행 
  }
  plantArray.forEach( (a ,i ,o)=>{
    if(a.x<0){
      o.splice(i,1)
    };
    a.x-- ;
    a.draw();
    CheckConflict(rabbit, a);
  })
  if(jump == true){
    rabbit.y-=3;
    jumpTimer++;
  } 
  if (jump ==false){
    if(rabbit.y < 200){
      rabbit.y+=3 ;  
    } 
  }
  if( jumpTimer > 50){
    jump =  false ; 
    jumpTimer =0;  }
  rabbit.draw() ; //1초 마다 60번실행 
  };

AniObject();
