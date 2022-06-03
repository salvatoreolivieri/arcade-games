const road = document.querySelectorAll('#grid > div');
const scoreEl = document.querySelector('#score');

const replayButton = document.querySelector('#replay-button');

// DEBUG
// for(let i = 0; i < road.length; i++) {
//     road[i].innerText = i;
// }

// Conservo in variabile i riferimenti
// all'elemento contente la papera
const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');

let speed = 150;
let score = 0;

// Logica aggiunta pianta
function addPlant() {
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    // Movimento della pianta
    const plantIntVal = setInterval(function() {
        score++;
        scoreEl.innerText = `Score: ${score}`;

        if(score % 50 === 0) {
            speed = speed - 20;
        }

        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--;
    
        if(currentPlantIdx < 0) {
            clearInterval(plantIntVal);
            addPlant();
            return;
        }

        // Se l'indice di posizione della pianta
        // coincide con quello della papera
        // e la classe `duck-jump` non è presente
        // vuol dire che la papera ha saltato nel momento sbaglato
        // e si è schiantata
        if(
            currentPlantIdx === duckIdx &&
            !road[currentPlantIdx].classList.contains('duck-jump')
        ) {
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');
            showAlert('CRASH!');
            clearInterval(plantIntVal);
            return;
        }
     
        road[currentPlantIdx].classList.add('plant');
    }, speed);
}

addPlant();


function jump(event) {
    if(event.code === 'Space' && !event.repeat) {
        duck.classList.add('duck-jump');
        setTimeout(function() {
            duck.classList.remove('duck-jump');
        }, 300);

    }
}

document.addEventListener('keydown', jump);

function showAlert(message){

    const gameArea = document.querySelector('.game-area');
  
    const alertMessage = `
    <div class="game-alert">
      <div class="game-alert-message">${message}</div>
    </div>
    `;

    replayButton.classList.remove("display-none")
  
    gameArea.innerHTML = gameArea.innerHTML + alertMessage;
  
  } 