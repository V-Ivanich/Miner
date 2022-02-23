
const tabl = document.querySelector('.pole');
const inPut = document.getElementById('vvod');
const bTn = document.querySelector('.btn');
let massiv = [];
let tepm = [];

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
})

function randOm(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}