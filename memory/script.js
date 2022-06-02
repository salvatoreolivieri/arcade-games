
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


// 1. Creare le card dinamicamente

for (let x = 0; x < deck.length; x++) {

  const card = document.createElement("div")
  const cardName = deck[x]
  card.classList.add("card")

  card.setAttribute("data-name", cardName)
  card.addEventListener("click", flipCard)

  grid.appendChild(card)

}

function flipCard(event){
  const card = event.target

  if (card.classList.contains("flipped")) {
    return
  }

  card.classList.add(card.getAttribute("data-name"), "flipped")


}



