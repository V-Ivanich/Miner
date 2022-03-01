
const tabl = document.querySelector('.pole');//место для таблицы
const inPut = document.querySelector('#vvod'); //выбор размера поля
let enter_bomb = document.querySelector('#enterBomb'); //дополнительные мины +5, +10, + 15
let sumMine = document.querySelector('.sum'); //общее кол-во мин на поле
const bTn = document.querySelector('.btn'); //кнопка
let massiv = [],
  sumBobms = 0,
  bomb = 0,
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
  sumBobms = +enter_bomb.value;

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
  let s_mine = 0;
  for (let a = 0; a < position + sumBobms; a++) {
    n = randOm(1, massiv.length - 2);
    t = randOm(1, massiv.length - 2);
    while(massiv[n][t] == "M"){
      n = randOm(1, massiv.length - 2);
      t = randOm(1, massiv.length - 2);
    }
   massiv[n][t] = "M";
   s_mine++;
  }
  sumMine.innerHTML += s_mine;

  //обработка бомб\мин
  for (let i = 1; i < massiv.length - 2; i++) {
    for (let j = 1; j < massiv.length - 2; j++) {
      let mina = massiv[i][j];
      if (mina == "M") {
        processingBomb(i, j);
      }
    }
  }


//получение координат при клике
  document.querySelector('table').onclick = (event) => {
    let cell = event.target;
    if (cell.tagName.toLowerCase() != 'td')
      return;
    let i = cell.parentNode.rowIndex;
    let j = cell.cellIndex;

    let mina = massiv[i + 1][j + 1];
    if(mina == 0) {
      tablica.rows[i].cells[j].innerHTML = '';
      tablica.rows[i].cells[j].style.background = '#1c1c1c'; 
     }  else {
        tablica.rows[i].cells[j].innerHTML = mina;
        tablica.rows[i].cells[j].style.color = '#fff'; 
        tablica.rows[i].cells[j].style.background = '#1c1c1c'; 
          if(mina == 'M')
             tablica.rows[i].cells[j].style.color = 'red';      

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
