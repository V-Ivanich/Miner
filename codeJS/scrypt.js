
const tabl = document.querySelector('.pole');
const inPut = document.querySelector('#vvod');
const bTn = document.querySelector('.btn');
let massiv = [],
  n,
  t;

  function randOm(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

bTn.addEventListener('click', () => {
  let tablica = document.createElement('table');
  let position = +inPut.value;
  for (let k = 0; k < position + 2; k++) {
    let row = document.createElement('tr');
    massiv.push([0]);
    for (let i = 0; i < position + 2; i++) {
      let td = document.createElement("td");
      row.appendChild(td);
      massiv[k][i] = 0;
    }
    tablica.appendChild(row);
  }
  tabl.appendChild(tablica);
  console.log(massiv);

  //расставляем мины в случайном порядке
  for( let a = 0; a < inPut.value / 2 + 2; a++){
    n = randOm(1, massiv.length - 1);
    t = randOm(1, massiv.length - 1);
    massiv[n][t] = "M";
    tablica.rows[n].cells[t].innerHTML = "M";
    tablica.rows[n].cells[t].style.color = "red";
  }

  for(let i = 1; i < massiv.length - 1; i++){
    for(let j = 1; j < massiv.length - 1; j++) {
      let mina =  massiv[i][j];
      if(mina == "M") {
        console.log(i + ' ' + j);
      }
    }
  }
});

function processingBomb (x, y){

}

