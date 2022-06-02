
/* Logica:

1. Al click aggiungere X oppure O
2. Evitare che un quadratino venga sovrascritto
3. Creare logica di vittoria e interruzione gioco
4. Modal per annunciare vittoria-sconfitta-pareggio

*/


// 1. Al click aggiungere X oppure O

const cells = document.querySelectorAll(".cell");

const cellSign = [];

let filled = false;
let turn = 0;

for (let x = 0; x < cells.length; x++) {
  const cell = cells[x]
  cell.addEventListener("click", function(){

    console.log("hai cliccato la cella:", cells[x]);

    // 2. Evitare che un quadratino venga sovrascritto
    if (cellSign[x]) {
      console.log("questa cella è già stata cliccata");

      return
    }

    turn++;

    let sign;

    if (turn % 2 ) {
      sign = "X"
    } else{
      sign = "O"
    }

    cell.innerText = sign;
    cellSign[x] = sign;

    let hasWon = checkVictory();

    if(hasWon){
      console.log(sign, "ha vinto");
    } else if (turn === 9){
      console.log("Pareggio");
    }

  })
  
}


// 3. Logica di vittoria e interruzione gioco

function checkVictory(){

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < winningCombination.length; i++) {
    const combination = winningCombination[i];

    const a = combination[0];
    const b = combination[1];
    const c = combination[2];

    if(cellSign[a] && cellSign[a] === cellSign[b] && cellSign[b] === cellSign[c]){
      console.log("trovata combinazione vincente", a, b, c);
      return true
    }
  }

  return false

}


