const gameContainer = document.getElementById("game");

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
  
}

function clickCounter(){
  let clickCnt = 0;
  let colorCheck = [];
  let cards = [];
  
  gameContainer.addEventListener('click', function(e){
    //console.log("You just clicked", e.target);
    if(e.target.classList[1] === "card"){
      //console.log("You clicked a card");
      clickCnt ++;
      console.log(clickCnt);

      colorCheck.push(e.target.classList[0]);
      console.log("The colors are:", colorCheck);
    };

    //if statements that check for match
    if(clickCnt == 2){
      if(colorCheck[0] === colorCheck[1]){
        console.log("Match!");
        clickCnt = 0;
        colorCheck = [];
      }else {
        console.log("No Match!");
        clickCnt = 0;
        console.log("Removing Colors");
        setTimeout(() => {
          console.log("removed");
          const color1 = document.getElementsByClassName(colorCheck[0])[0];
          const color2 = document.getElementsByClassName(colorCheck[1])[0];

          color1.style.removeProperty("background-color");
          color2.style.removeProperty("background-color");
          colorCheck = [];
        }, 1000);
      };
    };

  });
}


// function resetCards(array){
//   console.log("removed");
//   const color1 = document.getElementsByClassName(array[0])[0];
//   const color2 = document.getElementsByClassName(array[1])[0];

//   color1.style.removeProperty("background-color");
//   color2.style.removeProperty("background-color");

// }

// when the DOM loads
createDivsForColors(shuffledColors);
clickCounter();