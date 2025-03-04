// קליטת שם מהשחקן
function getFirstName() {
    var firstName = document.getElementById("firstNameInput").value;
  if(firstName=='')
        alert("please enter name");
    else
    {
     sessionStorage.setItem('firstName', firstName);
        window.location.href = "../html/game.html";
  
    }
  }
   //מערך תמונות
   var images = ["../image/images.jpg", "../image/2917093994_db53af6233_b_i.jpg"];
   var currentIndex = 0;
   var timer;
  function startTimer() {
     timer = setInterval(changeImage, 1000);
   }
  //פונקציה שבוחרת בכל שניה אבטיח או לימון מתוך מערך התמונות
   function changeImage() {
     var image = document.getElementById("fruit-image");
     image.src = images[currentIndex];
     currentIndex = (currentIndex + 1) % images.length;//החלפת אינדקס
   }
  //פןנקציה ששולחת לדף המשחק
   function goToGamePage() {
     clearInterval(timer);
     window.location.href = "html/game.html";
   }
  
  
   //  הוראות משחק
  var modal = document.getElementById("myModal");
  
  //הכפתור שפותח את המודל
  var btn = document.getElementById("myBtn");
  
  // הכפתור שסוגר את המודל
  var span = document.getElementsByClassName("close")[0];
  
  //כאשר השחקן לוחץ על כפתור הפתיחה-פתח את המודל
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  //כאשר השחקן לוחץ על כפתור הסגירה-סגור את המודל
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // כאשר השחקן לוחץ איפשהוא מחוץ למודל-סגור את המודל
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }