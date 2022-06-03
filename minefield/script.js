
// 1. Inseriamo una costante che al click del bottone "conferma" fa partire la nostra WebApp

// 1. Generare i quadrati in base alla difficoltà selezionata dall'utente



const gameArea = document.querySelector(".game-area")
const container = document.querySelector(".grid")
const winCondition = 10; //numero di slot che servono per vincere

const replayButton = document.getElementById("replay-button");

let generatedBombs = [];
let listaCelleCliccate = [];

const cellNumbers = 81 //numero delle celle da generare

  start()

function start() {

  // var audio = new Audio('sound/start.wav');
  // audio.play();

  container.innerHTML = ""; //reset del contenitore
  generatedBombs.length = 0; //reset dell'array
  listaCelleCliccate.length = 0 //reset punteggio giocatore
  
  console.log(winCondition);

  const square = creaQuadrati(cellNumbers);

  const bombs = creaBombe(cellNumbers);

}

function creaQuadrati(cellNumbers) {

  for (let x = 1; x <= cellNumbers; x++) { //generiamo le celle in funzione della modalità selezionata dall'utente
    const square = document.createElement("div");
    square.classList.add("square-"+cellNumbers)
    // square.innerHTML = x;
    square.myNumber = x;
    
    square.addEventListener("click", cellaCliccata);
    container.append(square);

  }

}


// Funzione per colorare le celle
function cellaCliccata(){

  
  console.log(this);
  console.log(this.myNumber);


  if (generatedBombs.includes(this.myNumber) ) {
    this.classList.add("bomb");
    this.innerHTML = `<span class="bomb"> &#128163 </span>`

    console.log("è nell'array");

    stopGame(listaCelleCliccate);
  } else {
    console.log("non è nell'array");

    this.innerHTML = `<img src="/minefield/img/Making motherhood enjoyable-PhotoRoom.png" alt="">`


    // listaCelleCliccate.push(this.myNumber);
    if (!listaCelleCliccate.includes(this.myNumber)) { //contatore punteggio player
      listaCelleCliccate.push(this.myNumber)


      var audio = new Audio('sound/click.wav');
      audio.play();

      this.classList.add("clicked");

    }

    if (listaCelleCliccate.length === winCondition) { //condizione per fermare la partita e vincere il gioco
      container.innerHTML +=
      `
      <div class="game-alert" text-center">
        <p>Hai azzeccato ${winCondition} fiori e hai vinto. Gioca ancora!</p>
      </div>
      `;

      replayButton.classList.remove("display-none")


      // var audio = new Audio('sound/win.mp3');
      // audio.start();

      var audio = new Audio('sound/win.mp3');
      audio.play();


    }

    console.log("questi sono i numeri che hai azzeccato:", listaCelleCliccate);
  }
}


// 2. Creare le 16 bombe.

function creaBombe(cellNumbers) {

  while (generatedBombs.length < 16) {
    let bombs;
    bombs = generateUniqueRandomNumber(cellNumbers,1);

    if (!generatedBombs.includes(bombs)) {
      generatedBombs.push(bombs)
    }

    console.log(generatedBombs);

  }

  return generatedBombs;
}


function generateUniqueRandomNumber(max, min){
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



// 3. Funzione che ferma il gioco

function stopGame(listaCelleCliccate){
  console.log("stop Game");
  console.log(listaCelleCliccate.length);
  container.innerHTML +=
  `
  <div class="game-alert" text-center">
    <p>Hai beccato una bomba e hai perso. Il tuo punteggio: ${listaCelleCliccate.length} slot su 10.</p>
  </div>
  `;

  replayButton.classList.remove("display-none")

  showAllBombs();

  // while (generatedBombs.length < 16) {
  //   generatedBombs[0].classList.add("bomb");
  // }

  var audio = new Audio('sound/lose.wav');
  audio.play();
  replayButton.classList.remove("display-none")


}


// 4. Funzione che fa scoppiare tutte le bombe

function showAllBombs() {
  const celle = document.getElementsByClassName("square-"+cellNumbers);

  for(let x = 0; x < celle.length; x++){
    if (generatedBombs.includes(x+1)){
      celle[x].classList.add("bomb")
      celle[x].innerHTML = `<span class="bomb"> &#128163 </span>`;
    }
  }

}
