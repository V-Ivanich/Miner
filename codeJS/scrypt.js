
const tabl = document.querySelector('.pole');
const inPut = document.getElementById('vvod');
const bTn = document.querySelector('.btn');
let massiv = [],
  n,
  t;


bTn.addEventListener('click', () => {
  let tablica = document.createElement('table');

  for (let k = 0; k < inPut.value; k++) {
    let row = document.createElement('tr');
    massiv.push([0]);
    for (let i = 0; i < inPut.value; i++) {
      let td = document.createElement("td");
      row.appendChild(td);
      massiv[k][i] = 9;
    }
    tablica.appendChild(row);
  }
  tabl.appendChild(tablica);
  console.log(massiv);

  for( let a = 0; a < inPut.value / 2; a++){
    n = randOm(0, inPut.value);
    t = randOm(0, inPut.value);
    massiv[n][t] = "M";
    // tablica[n][t].innerHTML.text = "M";
  }
})

function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}