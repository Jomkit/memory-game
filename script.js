const gameContainer = document.getElementById("game");
const startBtn = document.getElementById('start-button');
const splashScreen = document.querySelector('.splash-container');
const clickScore = document.querySelector('#score');
const lowScore = document.querySelector('#best-score');
const recordLowScore = localStorage.getItem("lowestScore");

if(recordLowScore == null){
  lowScore.innerText = "";
}else {
  lowScore.innerText = recordLowScore;
}

let score = 0;

splashScreen.classList.add(sessionStorage.getItem("splashHidden"));
//Implementing random colors: there's two sets of colors below to make doubles, perhaps could just 
//run color randomizer code twice to get sets
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//Start Menu
if(sessionStorage.getItem("splashHidden") == null){
  startBtn.addEventListener('click', function(){
    splashScreen.style.opacity = 0;
    setTimeout(()=>{
      splashScreen.classList.add('hidden')},610); 
    });
    sessionStorage.setItem("splashHidden", "hidden");
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over and add .card and a random color
    newDiv.classList.add( color, "card");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }

}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  const color = event.target.classList[0];
  event.target.style.setProperty("background-color", color);
  score++;
  clickScore.innerText = score;
}

function clickCounter(){
  let clickCnt = 0;
  let matches = 0;

  let colorCheck = [];
  let cards = [];
  
  gameContainer.addEventListener('click', function(e){
    //console.log("You just clicked", e.target);
    if(e.target.classList[1] === "card"){
      //console.log("You clicked a card");
      
      clickCnt ++;
      console.log("count", clickCnt);
      if(e.target.classList.contains("match")){
        //console.log("Wait, this one's already matched");
        clickCnt --;
        score--;
        //console.log("count after match", clickCnt);
        return;
      }else if(e.target.classList.contains("duplicate")){ //Duplicate aka same card pressed
        console.log("Duplicate"); 
        clickCnt--;
        score--;
        return;
      }else {
        e.target.classList.add("duplicate");                
      }

      colorCheck.push(e.target.classList[0]);
      cards.push(e.target);
      console.log("The colors are:", colorCheck);
      //console.log(cards);
    };

    //if statements that check for match
    if(clickCnt == 2){

      stopClicks();
      if(colorCheck[0] === colorCheck[1]){
        //console.log("Match!");

        for(let card of cards){
          card.classList.add("match");
        }
        
        matches++;
        console.log("matches", matches);
        clickCnt = 0;
        colorCheck = [];
        cards = [];

        if(matches*2 == COLORS.length){
          console.log("Game Over");
          gameOver()
        };
        
      }else {
        //console.log("No Match!");
        clickCnt = 0;
        //console.log("Removing Colors");
        resetCards(cards);
        colorCheck = [];
        cards = [];
        
      };
    };

  });
}

function stopClicks(){
  gameContainer.classList.add("stopClicks");
  //console.log("Stop Clicked");

  setTimeout(()=>{
    gameContainer.classList.toggle("stopClicks");
  }, 1000)
}

function gameOver(){
  const gameOverDiv = document.createElement('div');
  const newScore = document.createElement('div');
  const resetBtn = document.createElement('button');

  
  resetBtn.setAttribute("id", "reset");
  resetBtn.innerText = "RESET";
  // scoreDiv.setAttribute("class", "game-over");
  //bestScore.setAttribute("id", "best-score");

  document.body.append(gameOverDiv);
  gameOverDiv.append(resetBtn);

  //Need to compare old score and new score to see which is better aka lower
  if(recordLowScore === null || score < recordLowScore) {
    localStorage.setItem("lowestScore", score);
    newScore.innerText = `New Lowest Score: ${localStorage.getItem("lowestScore")}`;
    gameOverDiv.append(newScore);
  }

  resetBtn.addEventListener('click', ()=>{
    window.location.reload();
  });
    
}

function resetCards(cards){
  setTimeout(() => {
    console.log("removed");
    
    cards[0].style.removeProperty("background-color");
    cards[0].classList.remove("duplicate");
    cards[1].style.removeProperty("background-color");
    cards[1].classList.remove("duplicate");
    return cards;
  }, 1000);

}


// when the DOM loads
createDivsForColors(shuffledColors);
clickCounter();