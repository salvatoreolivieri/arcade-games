
/* Logica:

1. Al click aggiungere X oppure O
2. Evitare che un quadratino venga sovrascritto
3. Creare logica di vittoria e interruzione gioco
4. Modal per annunciare vittoria-sconfitta-pareggio

*/


// 1. Al click aggiungere X oppure O

const cells = document.querySelectorAll(".cell")

let turn = 0

for (let x = 0; x < cells.length; x++) {
  const cell = cells[x]
  cell.addEventListener("click", function(){

    turn++

    if (turn % 2) {
      cell.innerHTML="X"
    } else{
      cell.innerHTML="O"
    }

  })
  
}


