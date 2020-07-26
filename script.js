const gameContainer = document.getElementById("game");
let count = 0,
    temp;
const CARDS = [
  "king",
  "queen",
  "jack",
  "ace",
  "nine",
  "eight",
  "king",
  "queen",
  "jack",
  "ace",
  "nine",
  "eight"
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

let shuffledCards = shuffle(CARDS);//using Fisher Yates algorithm

// this function loops over the array of cards
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForCards(cardArray) {
  for (let card of cardArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const cardFace = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(card,'card-face-back');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked 
  if(count<2 && event.target.getAttribute('value')!=="done" && temp!==event.target){
    event.target.classList.remove('card-face-back');
    if(count<1){
      temp = event.target;
      count++
    } else if(temp.getAttribute('class')==event.target.getAttribute("class")) {
        event.target.setAttribute('value','done');
        temp.setAttribute('value','done');
        count = 0;
    } else {
        setTimeout(function(){
          event.target.classList.add('card-face-back');
          temp.classList.add('card-face-back');
          count = 0;
        },1000);
        count++;
    }
  }
  
}
// when the DOM loads
createDivsForCards(shuffledCards);
