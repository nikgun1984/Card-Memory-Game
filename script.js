//get and create elements and object(for localStorage manipulation)
const gameContainer = document.getElementById("game"),
      resetButton = document.createElement('button'),
      startButton = document.createElement('button'),
      guessBox = document.createElement('h1'),
      recordBox = document.createElement('h1'),
      label = document.querySelector('label'),
      obj = JSON.parse(localStorage.getItem('guess')) || {},
      div = document.querySelector('.heading');

// Variables that will be mutated
let numberBox,
    count = 0,
    guess = 0,
    evens,
    temp,
    allCards,
    cardsArray, // our dynamic array
    cardCount,
    shuffledCards;

//Add classes and styles to creates elements    
startButton.classList.add("btn");
resetButton.classList.add("btn");
startButton.innerText = 'Play';
resetButton.innerText = 'Reset';
div.appendChild(startButton);
div.appendChild(resetButton);
resetButton.style.display='none';
guessBox.innerText = `#Guesses: ${guess}`;

// Our cards we have and for reuse purpose too
const CARDS = [
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

// this function loops over the array of cards
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForCards(cardArray) {
  for (let card of cardArray) {
    // create a new div
    const newDiv = document.createElement("div");
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(card,'card-face-back');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);
    

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  allCards = document.querySelectorAll('#game div');
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked 
  if(count<2 && event.target.getAttribute('value')!=="done" && temp!==event.target){
    event.target.classList.remove('card-face-back');
    if(count<1){
      temp = event.target;
      count++;
    } else if(temp.getAttribute('class')==event.target.getAttribute("class")) {
        event.target.setAttribute('value','done');
        temp.setAttribute('value','done');
        cardCount -= 2;
        guess += 1;
        guessBox.innerText = `#Guesses: ${guess}`;
        count = 0;
        temp = null;
        if(!cardCount){
          resetButton.style.display='block';
          label.style.display="block";
          if(!obj[evens] || guess<(+obj[evens])){
            obj[evens] = guess;
            console.log(obj);
            localStorage.setItem('guess',JSON.stringify(obj));
            recordBox.innerText = `Record Score(${evens} cards): ${obj[evens]}`;
          }
        }
    } else {
        setTimeout(function(){
          event.target.classList.add('card-face-back');
          temp.classList.add('card-face-back');
          guess += 1;
          guessBox.innerText = `#Guesses: ${guess}`;
          count = 0;
          temp = null;
        },1000);
        count++;
    }
  }
}
//start button event listener
startButton.addEventListener('click',function(event){
  setupCards(event)
  div.appendChild(guessBox);
  div.appendChild(recordBox);
  if(obj[evens]){
    recordBox.innerText = `Record Score(${evens} cards): ${obj[evens]}`;
  }
});

//reset button event listener
resetButton.addEventListener('click',function(e){
  for(let card of allCards){
    gameContainer.removeChild(card);
  }
  setupCards(event);
  guess = 0;
  guessBox.innerText = `#Guesses: ${guess}`;
  if(obj[evens]){
    console.log('in')
    recordBox.innerText = `Record Score(${evens} cards): ${obj[evens]}`;
  } else {
    recordBox.innerText = '';
  }
});

//populate our working array dynamically
function getDynamicCardsArray(evens){
  let result = [];
  if((evens) < CARDS.length){
    result = result.concat(CARDS.slice(0,evens/2))
    return result.concat(result);
  }
  const remainder = (evens/2)%CARDS.length;
  const quotient = Math.floor((evens/2)/CARDS.length);
  let newArray = [].concat(...Array(quotient).fill(CARDS));
  result = remainder ? newArray.concat(CARDS.slice(0,remainder)):newArray;
  return result.concat(result);
}

//setup our cards that will be available for a session, restart will 
//change the session
function setupCards(event){
  event.preventDefault();
  numberBox = document.getElementById('myInput');
  evens = +numberBox.value;
  cardsArray = getDynamicCardsArray(evens);
  cardCount = cardsArray.length;
  shuffledCards = shuffle(cardsArray);//using Fisher Yates algorithm
  event.target.style.display = 'none';
  createDivsForCards(shuffledCards);
  label.style.display="none";
}
