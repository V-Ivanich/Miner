
const tabl = document.querySelector('.pole'),//место для таблицы
  inPut = document.querySelector('#vvod'), //выбор размера поля
  bTn = document.querySelector('.btn'), //кнопка
  game = document.querySelector('#gm'),// конец игры, - строка
  minutes = document.getElementById('minutes'),//минуты
  seconds = document.getElementById('seconds'),//секунды
  entrName = document.querySelector('.entr'),// ввод ф.и.о. игрока
  results = document.querySelector('.result');//вывод рекордов

let enter_bomb = document.querySelector('#enterBomb'), //дополнительные мины +5, +10, + 15
  sumMine = document.querySelector('.sum'), //общее кол-во мин на поле
  massiv = [],
  mina,
  tablica,
  sumBobms = 0,
  bomb = 0,
  globalOut = 0,
  nikName = '',
  place = [],
  n = 0,
  t = 0;

let mins = 0,
  secs = 0,
  interval;

function timer() {
  interval = setInterval(timerSet, 1000);
}

function timerSet() {
  secs++;
  if (secs < 10) {
    seconds.innerHTML = '0' + secs;
  }
  else {
    seconds.innerHTML = secs;
  }
  if (secs == 60) {
    secs = 0;
    mins++;
    if (mins < 10) {
      minutes.innerHTML = '0' + mins;
    }
    else {
      minutes.innerHTML = mins;
    }
  }
}
function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//!  создание таблицы для поля и начало игры
bTn.addEventListener('click', function () {
  nikName = entrName.value;
  nikName = nikName.toUpperCase();
  console.log(nikName);

  if (document.querySelector('table')) {
    tabl.removeChild(tablica);
    massiv = [];
    game.classList.remove('run');
    sumMine.innerHTML = 'Всего мин :';
    globalOut = 0;
    mins = 0;
    secs = 0;
    minutes.innerHTML = '00';
    seconds.innerHTML = '00';
  }
  //? создание непосредственно таблицы
  tablica = document.createElement('table');
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

  //? создание массива
  for (let o = 0; o < position + 2; o++) {
    massiv.push([0]);
    for (let p = 0; p < position + 2; p++) {
      massiv[o][p] = 0;
    }
  }

  //? расставляем мины в случайном порядке
  let s_mine = 0;
  for (let a = 0; a < position + sumBobms; a++) {
    n = randOm(1, massiv.length - 2);
    t = randOm(1, massiv.length - 2);
    while (massiv[n][t] == "M") {
      n = randOm(1, massiv.length - 2);
      t = randOm(1, massiv.length - 2);
    }
    massiv[n][t] = "M";
    s_mine++;
  }
  sumMine.innerHTML += ' ' + s_mine;

  //* обработка бомб\мин
  for (let i = 1; i < massiv.length - 2; i++) {
    for (let j = 1; j < massiv.length - 2; j++) {
      mina = massiv[i][j];
      if (mina == "M") {
        processingBomb(i, j);
      }
    }
  }
  console.log(massiv);
  timer();

  //? получение координат при клике
  document.querySelector('table').onclick = (event) => {
    if (globalOut == 1) return;
    let cell = event.target;
    if (cell.tagName.toLowerCase() != 'td')
      return;
    let i = cell.parentNode.rowIndex;
    let j = cell.cellIndex;
    let mina = massiv[i + 1][j + 1];
    let flag = tablica.rows[i].cells[j].innerHTML;
    if (flag == 'F') { return }
    if (mina == 0) {
      tablica.rows[i].cells[j].innerHTML = '';
      tablica.rows[i].cells[j].style.background = 'rgba(190, 180, 147, 0.66)';
    } else {
      tablica.rows[i].cells[j].innerHTML = mina;
      tablica.rows[i].cells[j].style.color = '#fff';
      tablica.rows[i].cells[j].style.background = 'rgba(190, 180, 147, 0.66)';
      if (mina == 'M') {
        tablica.rows[i].cells[j].style.color = 'red';
        document.querySelector('.over').innerHTML = 'GAME OVER!';
        game.classList.add('run');
        globalOut = 1;
        clearInterval(interval); //! stop timer
      }
    }
  }

  //? обработка правой кнопки мыши (флаги)
  document.querySelector('table').oncontextmenu = (e) => {
    let cell = e.target;
    if (cell.tagName.toLowerCase() != 'td')
      return;
    let x = cell.parentNode.rowIndex;
    let y = cell.cellIndex;
    let sod_e = tablica.rows[x].cells[y].innerHTML;

    if (sod_e != 'F' && s_mine > 0) { //* если не флаг и есть мины
      tablica.rows[x].cells[y].innerHTML = 'F';
      tablica.rows[x].cells[y].style.color = '#000';
      s_mine = s_mine - 1;

      //* далее проверка на соответствие флаг\мина
      let minaFlag;
      if (s_mine == 0) {
        console.log('Проверка?');
        for (let i = 0; i < position; i++) {
          for (let j = 0; j < position; j++) {
            minaFlag = tablica.rows[i].cells[j].innerHTML;
            if (minaFlag == "F") {
              let miniMina = massiv[i + 1][j + 1];
              if (miniMina == 'M') {
                s_mine++;
              } else continue;
            } else continue;
          }
        }
        if (position + sumBobms == s_mine) {
          clearInterval(interval); //! stop timer
          document.querySelector('.over').innerHTML = 'YOU WON!';
          game.classList.add('run');
          globalOut = 1;
          nikName = nikName + '  ' + mins + ':' + secs;
          results.innerHTML += nikName;
        }
      }
    }
    else {
      if (sod_e != 'F' && s_mine == 0) {
        return false;
      }
      else {
        tablica.rows[x].cells[y].innerHTML = '';
        s_mine++;
      }
    }
    sumMine.innerHTML = 'Всего мин :' + ' ' + s_mine;

    return false;
  }

});

function processingBomb(x, y) {
  if (massiv[x][y - 1] != "M") {
    calculation(x, y - 1);
  }
  if (massiv[x - 1][y - 1] != "M") {
    calculation(x - 1, y - 1);
  }
  if (massiv[x + 1][y - 1] != "M") {
    calculation(x + 1, y - 1);
  }
  if (massiv[x - 1][y] != "M") {
    calculation(x - 1, y);
  }
  if (massiv[x + 1][y] != "M") {
    calculation(x + 1, y);
  }
  if (massiv[x][y + 1] != "M") {
    calculation(x, y + 1);
  }
  if (massiv[x - 1][y + 1] != "M") {
    calculation(x - 1, y + 1);
  }
  if (massiv[x + 1][y + 1] != "M") {
    calculation(x + 1, y + 1);
  }
}

function calculation(r, c) {
  bomb = massiv[r][c];
  bomb++;
  massiv[r][c] = bomb;
}
