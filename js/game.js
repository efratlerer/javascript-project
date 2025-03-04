"use strict"
// Create the balloon array
let drips = [];
let colors = [];
var targetPosition = window.innerHeight - 300;
let cnt = 0;
let height = 20;
let slideAnimation = document.createElement('style');
let audio_drip;
let play = false;
let speed = 10;
let level = 0;
let gameover=0;
let createdripsspeed=500;
let dripInterval;
let createDripInterval;
const timerElement = document.getElementById("timer");
let intervalId;
let player;
let max1=0;
let max2=0;
let max3=0;
let name1=" "
let name2=" "
let name3=" "

//ניקוי שיאים
// localStorage.removeItem('score3')
// localStorage.removeItem('score2')
// localStorage.removeItem('score1')
// localStorage.removeItem('player3')
// localStorage.removeItem('player2')
// localStorage.removeItem('player1')

//טוען את הדף 
 window.addEventListener("load", startGame);
 countdownTimer(0);

 //This function start the game by starting the level and updating the displayed information.
//הפונקציה מתחילה את המשחק
function startGame() {
  //מריץ את המשחק
  runlevel();
  //מעדכן נתונים למעלה
  updete();
}

//This function updates the number of filled cups and the player's name displayed on the screen.
function updete(){
  //מעדכן את מספר הכוסות שהתמלאו
  document.getElementById("cup").innerHTML=cnt;
  //מעדכן את שם השחקן
  document.getElementById("player").innerHTML=localStorage.getItem('firstName');
}

//This function runs the game level by setting intervals for creating drips and updating their positions on the screen. It also checks if the game is over or if the cup is full.
function runlevel() {
  //מעדכן את הרמה
  updatelevel();
  createDripInterval = setInterval(function () {
    ///פונקציה שמייצרת את הטיפות
    createdrips();
  },createdripsspeed );
  dripInterval = setInterval(function () {
    //בודק האם הוא לא נפסל וגם הכוס לא מלאה
    if (height < 290 && gameover == 0) {
      //מעדכן את מיקום הטיפה
      updatedrips();
      //מציג את הטיפה על המסך
      drawdrips();

    } else {
      // Stop the game loop when gameover condition is met
      clearInterval(createDripInterval);
      clearInterval(dripInterval);
      
      // Reset the drips array to empty
      drips = [];
      

      if (gameover == 1){
        //מסיים את המשחק
        endGame();
      }
      else{ 
        //סיכום רמה
        endlevel();
        }
    }
      } , speed);
}
///סיכום רמה
function endlevel(){
    cnt++;
    //מעדכן נתונים למעלה
    updete();
    audio_drip = new Audio("../sound/cup.mp3");
    audio_drip.play();
    //מנקה את המסך מטיפות שנשארו באויר
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = "";
    //מוציא את הכוס
    exitBowl();

      // לאחר שהכוס יצא תחכה כמה שניות ורק לאחר מכן תכניס את הכוס שוב ותריץ את המשחק מחדש
      setTimeout(() => {
      enterBowl();
      runlevel(); 
      }, 1000); // Delay the enterBowl() call by 1000 milliseconds (1 second)

}

//This function updates the game level by increasing the level, decreasing the speed of the drips, and changing the speed at which new drips are created. It also sets the colors of the drips based on the current level.
//פונקציה שמעדכנת את הרמה
function updatelevel(){
  level +=1;
  speed -=5;
  createdripsspeed -=100;
  switch(level) {
      case 1: colors = ["orange", "yellow","pink","yellow"];
      break;
      case 2: colors = ["orange", "yellow", "green","pink"];
      break;
      case 3: colors = ["orange", "yellow", "lightblue", "green","pink"];
      default: colors = ["orange", "yellow", "lightblue", "green","pink"];
  }
}

//This function creates a new drip with random horizontal position and color, and adds it to the drips array.
// יצירת הטיפות
//Percent
function createdrips() {
  const drip = {
    // יוצר ערכים אקראיים למיקום הטיפה בטווח מסוים
    x: Math.floor(Math.random() * (window.innerWidth *0.52 - window.innerWidth *0.43 + 1)) + window.innerWidth *0.43,
    // המיקום האנכי של הטיפה, מתחיל מלמעלה
    y: 0,
    // בוחר צבע אקראי לטיפה מתוך מערך הצבעים 
    color: colors[Math.floor(Math.random() * colors.length)],
    radius: 20,
  };
  // מוסיך למערך את הטיפה
  drips.push(drip);
}


//מעדכנת את מיקום הטיפות במסך
function updatedrips() {

  for (let i = 0; i < drips.length; i++) {
    //מעדכן מיקום של הטיפה
    drips[i].y += 1;
    // בודק אם הטיפה הגיעה לתחילת הכוס 
    if (Math.abs(drips[i].y - targetPosition) <= 1) {

      //בודק אם הטיפה כתומה ממלא את הכוס 
      if (drips[i].color === "orange") { 
        // ממלא את הכוס
         height += 100;
        const orangeFill = document.querySelector(".red-fill");
        orangeFill.style.height = height + "px";
        
        //משמיע קול בעת כניסת הטיפה לכוס
        audio_drip = new Audio("../sound/poit-94911.mp3");
        audio_drip.play();
      }
      //אם הטיפה הגיעה לכוס והיא לא כתומה
      else {
        gameover = 1;
      }
      //מסיר את טיפה מהמסך אם היא הגיעה לכוס 
      drips.splice(i, 1);
    }

  }
}



// מייצר את הטיפה 
function drawdrips() {
  //מנקה את המסך                                                                                
  const gameContainer = document.getElementById("game-container");
  //מסיר את הילדים שבתוכו
  gameContainer.innerHTML = "";

  for (let i = 0; i < drips.length; i++) {
    const dripElement = document.createElement("div");
    dripElement.className = "drip " + drips[i].color;
    //מגדיר את המיקום האופקי של הטיפה
    dripElement.style.left = drips[i].x + "px";
    //מיקום אנכי
    dripElement.style.top = drips[i].y + "px";
    dripElement.addEventListener("mouseover", popdrip);
    gameContainer.appendChild(dripElement);
  }
}


function popdrip(event) {
 //שומר את המיקום של האירוע בטיפה
  const x = event.clientX;
  const y = event.clientY;

  for (let i = 0; i < drips.length; i++) {
    //שומר את מיקום הטיפה הנוכחית במסך
    const left = drips[i].x;
    const top = drips[i].y;
    const width = 60; 
    const height = 60;
    //בודק אם מיקום העכבר הוא בתוך התחום של הטיפה הנוכחית
    //within the bounds of a drip.
    if (x >= left && x <= left + width && y >= top && y <= top + height) {
      // מסיר את הטיפה אם היא לא כתומה מהמסך 
      if (drips[i].color !== "orange") {
        audio_drip = new Audio("../sound/tyarin.mp3");
        audio_drip.play();
        //מוחקת מהמערך
        drips.splice(i, 1);
      } else {
        gameover = 1;
      }
    }
  }
}

function enterBowl() {
  //מכניסה כוס ריקה
  height = 0;
  const orangeFill = document.querySelector(".red-fill");
  orangeFill.style.height = height + "px";
  const bowl = document.getElementById('bowl');

  // Set the visibility of the bowl to visible
  bowl.style.visibility = 'visible';

  // Apply the entrance animation to the bowl element
  bowl.style.animation = 'enter 2s ease-out';
}

// Function to animate the exit of the full bowl from the center to the left side
function exitBowl() {

  const bowl = document.getElementById('bowl');

  // Apply the exit animation to the bowl element
  bowl.style.animation = 'exit 2s ease-out';
}

//פונקציה המקפיצה הודעה לסיום המשחק
function endGame() {
  //מחביא את המסך
  document.getElementById("game-container").style.visibility="hidden";
 
  //שיר סיכום
  // let audio_summery = new Audio('../sound/watermelon.mp3');
  // audio_summery.play();
   
  //מעלים מהמסך נתונים
  bowl.style.visibility = "hidden"
  document.getElementById('cup').style.visibility= "hidden";
  document.getElementById('player').style.visibility= "hidden";
//displaying the game over message with the player's name and cup count, and stopping the timer.
 //מכניס את שם משתמש להודעה
  var text = document.getElementById("words");
  var x = localStorage.getItem('firstName');
  text.innerHTML = (x);

  //מייצרת את ההודעה
  var message = document.getElementById("message");
  message.style.display = 'block';
  
  //משנה את מספר הכוסות שבדף הסיכום
  var sum = document.getElementById("cups");
  sum.innerHTML = cnt;
  
  //הצגת השיא
  record();
  document.getElementById("max1").innerHTML= localStorage.getItem('score1')
  document.getElementById("player1").innerHTML=(localStorage.getItem('player1'))
  document.getElementById("max2").innerHTML= localStorage.getItem('score2')
  document.getElementById("player2").innerHTML=(localStorage.getItem('player2'))
  document.getElementById("max3").innerHTML= localStorage.getItem('score3')
  document.getElementById("player3").innerHTML=(localStorage.getItem('player3'))


  //מראה את הטיימר
  var maxTime = document.getElementById("time");
  maxTime.innerHTML = timerElement.textContent;
  //עוצר טיימר
  clearInterval(intervalId);
}

//פונקציה המעדכנת את הטיימר
function countdownTimer(duration) {
  let timer = duration;
  let hours, minutes, seconds;

  intervalId = setInterval(() => {

    hours = Math.floor(timer / 3600);
    minutes = Math.floor((timer % 3600) / 60);
    seconds = timer % 60;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timerElement.textContent = `${hours}:${minutes}:${seconds}`;
    timer++;
  }, 1000);
}


//This function updates the high scores and player names in localStorage if the current score is higher than any of the top three scores. It updates the local variables and localStorage 
 function record() {
  // אתחול משתנים מקומיים לשיאים ולשמות השחקנים
  let max1 = parseInt(localStorage.getItem('score1')) || 0;
  let max2 = parseInt(localStorage.getItem('score2')) || 0;
  let max3 = parseInt(localStorage.getItem('score3')) || 0;
  let name1 = localStorage.getItem('player1') || "";
  let name2 = localStorage.getItem('player2') || "";
  let name3 = localStorage.getItem('player3') || "";
  let playerName = localStorage.getItem('firstName') || "";

  // בדיקת המיקום של התוצאה הנוכחית
  if (cnt > max1) {
    // אם התוצאה הנוכחית היא הגבוהה ביותר
    max3 = max2;
    name3 = name2;
    max2 = max1;
    name2 = name1;
    max1 = cnt;
    name1 = playerName;
  } else if (cnt > max2 && cnt != max1) {
    // אם התוצאה הנוכחית היא במקום השני
    max3 = max2;
    name3 = name2;
    max2 = cnt;
    name2 = playerName;
  } else if (cnt > max3 && cnt != max1 && cnt != max2) {
    // אם התוצאה הנוכחית היא במקום השלישי
    max3 = cnt;
    name3 = playerName;
  }

  // עדכון localStorage עם הערכים החדשים
  localStorage.setItem('score1', max1);
  localStorage.setItem('player1', name1);
  localStorage.setItem('score2', max2);
  localStorage.setItem('player2', name2);
  localStorage.setItem('score3', max3);
  localStorage.setItem('player3', name3);
}









