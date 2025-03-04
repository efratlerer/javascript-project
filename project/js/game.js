
// Create the balloon array
let drips = [];
var targetPosition = window.innerHeight - 300;
let cnt = 0;
let height = 20;
let slideAnimation = document.createElement('style');
let intervalId ;

//טוען את הדף 
window.addEventListener("load", enterBowl);

// יצירת הטיפות
function createdrips() {
  const colors = ["orange", "yellow", "pink", "green"];
  const drip = {
     // יוצר ערכים אקראיים למיקום הטיפה בטווח מסוים
    x: chek(),
    // המיקום האנכי של הטיפה, מתחיל מלמעלה
    y: 0,
     // בוחר צבע אקראי לטיפה מתוך מערך הצבעים 
    color: colors[Math.floor(Math.random() * colors.length)],
    radius: 20, 
  };
   // מוסיך למערך את הטיפה
  drips.push(drip); 
}

// רינדום מיקום
function chek() {
  let x;
  do {
    x = Math.random() * (window.innerWidth - 40);
  } while (x < 700 || x > 900);
  return x;
}



function updatedrips() {
  for (let i = 0; i < drips.length; i++) {
    //מעדכן מיקום של הטיפה
    drips[i].y += 1; 
// בודק אם הטיפה הגיעה לתחילת הכוס 
    if (Math.abs(drips[i].y - targetPosition) <= 1) {

     //בודק אם הטיפה כתומה ממלא את הכוס 
      if (drips[i].color === "orange") {
        const orangeFill = document.querySelector(".red-fill");
        orangeFill.style.height = height + "px";
        // ממלא את הכוס
        height += 20; 
        //משמיע קול בעת כניסת הטיפה לכוס
        var audio_drip = new Audio("../sound/poit-94911.mp3");
        audio_drip.play();
        //בודק אם הכוס מלאה 
        if (height >= 320) {
         //משמיע קול שהכוס מלאה
          var audio_drip = new Audio("../sound/cup.mp3");
          audio_drip.play();
          //סופר את מספר הכוסות
          cnt++;
         // מאפס את הגובה של הכוס 
        height = 0;
          
          //enterBowl();
          // exitBowl();
          // setTimeout(enterBowl, 2000); // הפעל enterBowl בעצם שלב מאוחר יותר (אחרי היציאה)



        
        }
       
      }
      else {
        endGame();
      }
       //מסיר את טיפה מהמסך אם היא הגיעה לכוס 
      drips.splice(i, 1);
    }

  }
}

// מייצר את הטיפה 
function drawdrips() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  for (let i = 0; i < drips.length; i++) {
    const dripElement = document.createElement("div");
    dripElement.className = "drip " + drips[i].color;
    dripElement.style.left = drips[i].x + "px";
    dripElement.style.top = drips[i].y + "px";
    dripElement.addEventListener("mouseover", popdrip);
    gameContainer.appendChild(dripElement);
  }
}

// Handle clicking on the balloons
function popdrip(event) {
  const x = event.clientX;
  const y = event.clientY;

  for (let i = 0; i < drips.length; i++) {
    const left =drips[i].x;
    const top = drips[i].y;
    const width = 60; // Assuming balloons have a width and height of 40 pixels
    const height = 60;

    if (x >= left && x <= left + width && y >= top && y <= top + height) {
   // מסיר את הטיפה אם היא לא כתומה מהמסך 
      if (drips[i].color !== "orange") {
       drips.splice(i, 1); 
      } else {
        endGame();

      }
    }
  }
}


//הפונקציה מתחילה את המשחק
function startGame() {

 
  // נשלח לפונקצייות שמייצרת טיפות כל כמה שניות
  setInterval(function () {
    createdrips();
  }, 500); 

  setInterval(function () {
    updatedrips();
    drawdrips();
   
  }, 10); // Update and draw the balloons every 10 milliseconds
   //הפעלת טיימר חדש 
   
   countdownTimer(0) ;
   
}

function enterBowl() {
  bowl.style.visibility = "visible"
  bowl.style.animationName = "enter"
  // הכניסה של הכוס מימין
  // slideAnimation.type = 'text/css';
  // slideAnimation.innerHTML = `@keyframes slide {
  //     from { right: 0; }
  //     to { right: 50vw; }
  //   }`;
  // document.head.appendChild(slideAnimation);

  // הוסף את הסגנון הבא כדי להפעיל את האנימציה של הכוס
  // const bowl = document.getElementById('bowl');
  // bowl.style.animation = `@keyframes slide {
  //   from { right: 0; }
  //   to { right: 50vw; }
  // }`;
  // bowl.style.right = "50vw"
  startGame();
}

// פונקציה שפועלת בטעינת הדף
// window.onload = enterBowl();
function exitBowl() {
  console.log("exit");

  // הכניסה של הכוס מהמרכז לצד שמאל
  //slideAnimation = document.createElement('style');
  //slideAnimation.type = 'text/css';
  // slideAnimation.innerHTML = `@keyframes slide {
  //   from {left: 0; } /* מתחיל מהמרכז */
  //   to {transform: translateX(50vw); } /* מסתיים בצד שמאל */
  // }`

  // const bowl = document.getElementById('bowl');
  bowl.style.animationName = "exist"
  bowl.style.visibility = "hidden"
  bowl.style.right = 0
  enterBowl();
  startGame()
  // console.log(bowl);
  // document.head.appendChild(slideAnimation);
  // הוסף את הסגנון הבא כדי להפעיל את האנימציה של הכוס
  // const bowl = document.getElementById('bowl');
  // bowl.style.animation = 'slide 2s ease-out';
};

//פונקציה המקפיצה הודעה לסיום המשחק
function endGame() {
  //מרוקן את הטיפות מהמערך
  drips = [];
  //מעלים את הכוס מהמסך
  bowl.style.visibility = "hidden"
 
  //clearInte;rval(timeClock);
  //מייצרת את ההודעה
  var text = document.getElementById("words");
  //השם שהכניס 
  var x = sessionStorage.getItem('firstName');
  text.innerHTML = (x);
  var message = document.getElementById("message");
  message.style.display = 'block';
  //משנה את מספר הכוסות שבדף הסיכום
  var sum = document.getElementById("cups");
  sum.innerHTML = cnt;
  var maxTime= document.getElementById("time");
  maxTime.innerHTML = timerElement.textContent;
  clearInterval(intervalId);

  //שיר סיכום
  // var audio_summery = new Audio('../sound/watermelon.mp3');
  // audio_summery.play();
}
//פונקציה המעדכנת את הטיימר
const timerElement = document.getElementById("timer");

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
    // if (++timer < 0) {
    //   clearInterval(intervalId);
    //   timerElement.textContent = "Times up!";
    //   // Perform any actions you want after the countdown finishes
    // }
  }, 1000);
}


   


