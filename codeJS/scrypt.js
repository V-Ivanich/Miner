
const tabl = document.querySelector('.pole');
const inPut = document.querySelector('#vvod');
const bTn = document.querySelector('.btn');
let massiv = [],
  bomb = 0,
  sumBobms = 2,
  n = 0,
  t = 0;

function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//создание таблицы для поля
bTn.addEventListener('click', function () {
  //создание непосредственно таблицы
  let tablica = document.createElement('table');
  let position = +inPut.value;

  for (let k = 0; k < position; k++) {
    let row = document.createElement('tr');
    for (let i = 0; i < position; i++) {
      let td = document.createElement("td");
      row.appendChild(td);
    }
    tablica.appendChild(row);
  }
  tabl.appendChild(tablica);

  //создание массива
  for (let o = 0; o < position + 2; o++) {
    massiv.push([0]);
    for (let p = 0; p < position + 2; p++) {
      massiv[o][p] = 0;
    }
  }
  console.log(massiv);

  //расставляем мины в случайном порядке
  for (let a = 0; a < position + sumBobms; a++) {
    n = randOm(1, massiv.length - 2);
    t = randOm(1, massiv.length - 2);
    massiv[n][t] = "M";
    
  }

  for (let i = 1; i < massiv.length - 2; i++) {
    for (let j = 1; j < massiv.length - 2; j++) {
      let mina = massiv[i][j];
      if (mina == "M") {
        processingBomb(i, j);
      }
    }
  }

  //запись из массива в таблицу
  for (let i = 1; i < massiv.length - 2; i++) {
    for (let j = 1; j < massiv.length - 2; j++) {
      let mina = massiv[i][j];
      if (mina != 0) {
        tablica.rows[i].cells[j].innerHTML = mina;
        tablica.rows[i].cells[j].style.color = '#fff';
        if(mina == 'M'){
          tablica.rows[i].cells[j].style.color = 'red';
        }
      } else continue;
    }
  }

});

function processingBomb(x, y) {
  if(massiv[x][y-1] != "M"){
    calculation(x, y-1);
  }
  if(massiv[x-1][y-1] != "M"){
    calculation(x -1, y-1);
  }
  if(massiv[x + 1][y-1] != "M"){
    calculation(x + 1, y-1);
  }
  if(massiv[x - 1][y] != "M"){
    calculation(x -1, y);
  }
  if(massiv[x + 1][y] != "M"){
    calculation(x + 1, y);
  }
  if(massiv[x][y+1] != "M"){
    calculation(x, y+1);
  }
  if(massiv[x - 1][y+1] != "M"){
    calculation(x - 1, y+1);
  }
  if(massiv[x + 1][y+1] != "M"){
    calculation(x + 1, y+1);
  }
}

function calculation(r, c){
  bomb = massiv[r][c];
  bomb ++;
  massiv[r][c] = bomb;
}