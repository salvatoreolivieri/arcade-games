
/* Logica:

1. Creare le card dinamicamente
2. Associare randomicamente un data-name alla card che corrisponde alla sua background image
3. Dare la classe uguale al data-name
4. Creare la logica del match
5. Aggiungere il numero di errori

*/

// DATI

const grid = document.querySelector(".grid");
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
const deck = [...cards, ...cards];

const replayButton = document.querySelector(".button")

let errorsCount = 0

deck.sort(function() {
  return 0.5 - Math.random();
});

const errorDom = document.getElementById("error")
errorDom.innerHTML = errorsCount

let check = []
let cardMathed = []


// 1. Creare le card dinamicamente

for (let x = 0; x < deck.length; x++) {

  const card = document.createElement("div")
  const cardName = deck[x]
  card.classList.add("card")

  // 2. Associare randomicamente un data-name alla card che corrisponde alla sua background image

  card.setAttribute("data-name", cardName)
  card.addEventListener("click", flipCard)

  grid.appendChild(card)

}


// 3. Dare la classe uguale al data-name

function flipCard(event){
  const card = event.target

  // console.log(event.target);

  if (card.classList.contains("flipped")) {
    return
  }

  card.classList.add(card.getAttribute("data-name"), "flipped")

  check.push(card)

  if (check.length === 2) {
    findMatch()
  }

}


function findMatch(card) {

  const card1 = check[0]
  const card2 = check[1]
  const cardName1 = card1.getAttribute("data-name")
  const cardName2 = card2.getAttribute("data-name")

  if (cardName1 === cardName2) {
    // console.log("hai fatto match");
    cardMathed.push("card1")
    cardMathed.push("card2")

    // console.log(cardMathed);

    if (cardMathed.length === deck.length ) {
      checkVictory()
    }

  } else {
    setTimeout(() => {
      card1.classList.remove(card1.getAttribute("data-name"), "flipped")
      card2.classList.remove(card2.getAttribute("data-name"), "flipped")
      errorsCount++
      replayButton.classList.remove("display-none")
      error.innerHTML = errorsCount

    }, 1000);
  }

  check = []
}

function checkVictory() {
  // console.log('hai vinto');

    const gameArea = document.querySelector('.game-area');
  
    const alertMessage = `
    <div class="game-alert">
      <div class="game-alert-message">Hai vinto</div>
    </div>
    `;
  
    gameArea.innerHTML = gameArea.innerHTML + alertMessage;
  
}



