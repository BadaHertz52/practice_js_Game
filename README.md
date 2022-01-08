# 토끼 게임 

[🐰페이지 바로 가기](https://badahertz52.github.io/practice_js_Game_rabbit/)

## 게임 진행을 위한 조건
해당 게임을 진행하기 위해서 게임 특성상 768px이상의 화면 크기가 필요하며 화면이 768px 미만인 경우 이에 대한 알림창이 뜨도록 설정하였습니다. 

## 게임 소개
해당 게임은 토끼를 점프시켜 점수를 얻고 레벨업을 하여 미션을 완수하는 게임입니다.</br>
토끼가 당근에 닿으면 점수가 상승하고 꽃,호랑이(이하 장애물)에 닿으면 감점이 일어납니다.</br>
일정 점수에 달성하면 레벨이 올라가고 장애물의 속도와 토끼의 점프 컨트롤 난이도가 상승합니다. </br>
일정 레벨에 충족하거나 점수가 0 이면 게임이 끝납니다.

### 게임 화면
#### 첫화면
+ 화면 너비:768px 미만 일때 

<img 
     src="https://user-images.githubusercontent.com/69838872/148643740-25c6c275-f2f8-467b-ba38-453d4e1e5cd4.png" 
     width="330px"
     height="auto" 
     alt="768px미만">
  </img> 
</br>

+ 화면 너비:768px 미만 일때 

<img 
     src="https://user-images.githubusercontent.com/69838872/148643750-ba1af787-f2b2-448a-a756-2038ae8b160d.png"
     width="500px" 
     height="auto" 
     alt="768px이상">
 </img>
</br>

#### 게임 진행

+ 게임 중

<img 
     src="https://user-images.githubusercontent.com/69838872/148644268-81d7f0b1-9972-41d3-883a-d7222a5dfce2.png" 
     alt="game" 
     width="500px" 
     height="auto">
  </img>

+ 게임 오버

<img 
     src="https://user-images.githubusercontent.com/69838872/148644287-cd3f3aa2-22cf-4ee0-8925-b840f3c41780.png" 
     alt="game over" 
     width="500px" 
     height="auto">
  </img>

+ 미션 클리어 (누적점수 20전 도달)

<img
 src="https://user-images.githubusercontent.com/69838872/148644301-0f2f750c-5553-4b4c-98b1-754e1d07296f.png" 
     alt="mission cleaer"
     width="500px" 
     height="auto">
 </img>


#### 하단
<img
     src="https://user-images.githubusercontent.com/69838872/148644554-f3e31551-0b41-4e04-bda4-b3f54a3791a3.png"
     alt="layout"
     width="600px"
     height="footer"
     >
</img>

</br>
페이지의 하단에는  페이지 작성자는 본인의 깃헙의 프로필 링크, 해당 프로젝트에 대한 깃헙 페이지로 연결되는 링크와 프로젝트에 사용된 이모티콘에 대한 출처를 확인할 수 있는 버튼이 있습니다. 

## 프로젝트에 사용된 기술
+ HTML
+ CSS (canvas 사용)
+ Java Script (class 를 통해 반복적인 요소를 생성함)

### java script

+java script에서 사용한 객체
</br>

|객체|설명|
|---|----|
|pointArray| 화면에 나타나는 포인트 객체(carrot)들 담긴 배열|       
|obstacleArray| 화면에 나타나는 점수를 차감하는 객체(plant, tiger)들이 담긴 배열|      
|timer|개임이 시작되고 나서 흐른 시간에 대한 객체, pointArray와  obstacleArray안의 객체 생성에 사용됨|      
|jumpTimer| 토끼가 점프하는 시간에 대한 객체|        

+ 동일한 객체를 만들어 주는 class 

 ```java script
 let obstacleArray = []; //점수를 차감하는 장애물 객체들이 담긴 배열 
 
 class Plant {
  constructor(){
    this.x = window.innerWidth*0.6;
     // 캔버스의 너비에 맞추어 끝에서 부터 객체가 생성될 수 있도록
    this.y= window.innerHeight * 0.5;
     // 캔버스의 높이에 맞추어 끝에서 부터 객체가 생성될 수 있도록
    this.width =50;
    this.height =100;
    this.value="obstacle1"
  } 
  draw(){
    ctx2.drawImage(plant_img,this.x, this.y )
  }
}
 function AniBbject(){
 const plant = new Plant();
  function MakeObject(){ 
   timer % 170==0 && obstacleArray.push(plant);

  //...
  }
  }
}
 ```
  </br>
  점수를 차감하는 객체와 점수를 얻을 수 있는 객체는 반복적으로 사용하기 때문에 이를 class를 이용해 정의하고 사용하고자 하는 조건하에서 사용하고자 하는 객체를 적합한 배열(점수를 얻는 객체는 pointArray , 점수를 차감하는 객체는 obstacleArray)에 넣었습니다. 
  
  + java script에서 사용한  함수

|객체|설명|
|----|-------|
|CheckWindowSize()|브라우처 창 크기에 따라 canvas의 크기를 조절하는 함수|    
|StartGame()|첫 화면에 나타나는 설명창을 닫고 게임을 시작하는 함수|    
|ClearGame()|게임이 끝나면 객체들을 원래의 상태로 돌려놓는 함수|    
|ChangeLevel ()|일정 점수 도달 시 레벨를 올려주고 레벨을 표기하며 미션 클리어 조건 시 이에 대한 함수를 실행하는 함수|
|DetectConflict()|객체끼리의 충돌을 감지하는 함수|
|LosePoint()|층돌 감지에 따른 점수를 감점 하는 함수|
|GetPoint()|층돌 감지에 따른 점수를  가하는 함수|
|AniObject() | 애니메이션을 실행하고 일정한 조건하에서 객체를 canvas에 그리고, canvas 창의 범위를 넘는 객체를 삭제하는 함수|


## 참고 자료
해당 프로젝트는 ["크롬 공룡 게임만들기" 강의](https://youtu.be/qkTtmgCjHhM)를 참고하였습니다. 

## 더보기
프로젝트 개발하면서 알게된 점등을 정리한 블로그로 [바로가기😀](https://velog.io/@badahertz52/개발일지JS-토끼-게임-만들기)
