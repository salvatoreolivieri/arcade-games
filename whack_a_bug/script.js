// Inseriamo il punteggio iniziale
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = `Score: ${score}`;

const replayButton = document.getElementById("replay-button")

// Inseriamo il timer iniziale
const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = `Time: ${timeLeft}`;

// Inseriamo il bug in una cella via JS
const cells = document.querySelectorAll('.cell');


// Diamo un valore di velocità iniziale
let bugSpeed = 800; //millisecondi


// Logica per randomizzare i bug in una cella 

function randomBug() {
  // pulisco tutte le celle prima di randomizzarne un'altra
  removeBug();

  // Aumentiamo la difficoltà se il giocatore è troppo bravo
  if(score === 20){
    bugSpeed = bugSpeed / 2;
  }

  // randomizzo una cella a caso
  const randomNumber = Math.floor(Math.random() * cells.length);
  const cell = cells[randomNumber];
  cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug(){
  for (let i = 0; i < cells.length; i++){
    const cellToClean = cells[i];
    cellToClean.classList.remove('bug');
  }
}

// Diamo modo all'utente di colpire il bug!

for(let i = 0; i < cells.length; i++){
  const cell = cells[i];
  cell.addEventListener('click', function(){
    // se tra le classi della cella cliccata c'è la classe bug
    if(cell.classList.contains('bug')){
      // incremento il punteggio e lo stampo
      score++; 
      scoreDisplay.innerText = `Score: ${score}`;

      cell.classList.remove('bug');
      cell.classList.add('splat');

      // puliamo la cella dallo splat!
      setTimeout(function(){
        cell.classList.remove('splat');
      }, 200);
    }
  })
}

// impostiamo un conto alla rovescia
const timer = setInterval(countDown, 1000);

function countDown() {
  timeLeft--;
  timerDisplay.innerText = `Time: ${timeLeft}`;

  if(timeLeft === 0){
    clearInterval(timer);
    clearInterval(bugMovement);
    removeBug();

    showAlert(`
    GAME OVER! <br> Score: ${score}`);
  }
}

// Tasto rigioca 
// const restartButton = document.getElementById('restart');
// restartButton.addEventListener('click', function(){
//   window.location.reload(); // ricarico la pagina
// })


function showAlert(message){

  const gameArea = document.querySelector('.game-area');

  const alertMessage = `
  <div class="game-alert">
    <p class="game-alert-message">${message}</è>
  </div>
  `;

  replayButton.classList.remove("display-none")

  gameArea.innerHTML = gameArea.innerHTML + alertMessage;

}