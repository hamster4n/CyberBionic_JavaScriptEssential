var arrButton = [], //массив всех кнопок
    allBombs = 0; //колличество бомб в игре



//функция отображения времени решения задачи
//отображение колличества оставшихся мин
//падающая менюшка Игра (Новая/Настройки)/Справка (Посмотреть справку/О программе)
//назначить звуки действиям
//предусмотреть неквадратное поле!!!
//поставить функцию, которая определит,что игрок выиграл (проверка при каждом ходе)
//сделать стилизацию под звёздные войны. для каждого поля своя картинка и везде одинаковые звуки

function openEmptyCells(numberButton) {
    var arr = numberButton.split("."),
        objButton = document.getElementById(numberButton),
        row = parseInt(arr[0]),
        col = parseInt(arr[1]);
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            var element = document.getElementById(i + "." + j);
            if (element) {
                if (element.bomb == 0) {
                    replaceButtonToDiv((i + "." + j), element);
                    openEmptyCells(i + "." + j);
                    //доработать условие. должны открываться и те, ячейки, в которых не ноль, но и нет бомбы
                    //тут должна быть рекурсия!!!
                }
            }
        }
    }
}


//открывает все кнопки в случае выбора кнопки с миной
function openAllCells() {
    var buttonsAll = document.getElementsByClassName('button');
    for (var y = 0; y < buttonsAll.length;) { //где-то добавляет +1 к счётчику. убрал у++ и норм ) но где?
        var numberButton = buttonsAll[y].id,
            objButton = document.getElementById(numberButton);
        replaceButtonToDiv(numberButton, objButton);
    }
}

//установка/снятие флага на ячейке
function markUnmarkCell() {
    var numberButton = this.id,
        objButton = document.getElementById(numberButton);

    if (objButton.firstChild == null) {
        objButton.innerHTML = ('<img src="img/flag.png">');
    } else {
        objButton.innerHTML = "";
    }
    return false;
}

//расчёт колличества смежных ячеек с бомбами для текущей ячейки
function calculateNumberBombs(row, col) {
    var numberBombs = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        for (var j = col - 1; j <= col + 1; j++) {
            var element = document.getElementById(i + "." + j);
            if (element) {
                if (element.value == 1) {
                    numberBombs++;
                }
            }
        }
    }
    return numberBombs;
}

function openOneCell() {
    soundClickBomb(); //временно
    var numberButton = this.id,
        objButton = document.getElementById(numberButton);
    if (objButton.value == 1) {
        openAllCells();
    } else {  //если бомбы в ячейке нет
        replaceButtonToDiv(numberButton, objButton); //открываем ячейку
        if (objButton.bomb == 0) {                       //если в ячейке ноль, то проверяем соседние на 0 и открываем их
            //document.getElementById('cell').innerHTML += ("нулевая!<br/>"); //удалить
            openEmptyCells(numberButton);
        }
    }
}

//заменяет кнопку на див с числом бомб на смежных клетках
//либо добавить в эту функцию выбор мина/не мина и тогда переработать openOneCell
//либо в openAllCells сделать выбор мина/не мина
function replaceButtonToDiv(numberButton, objButton) {
    var newDiv = document.createElement("div");
    newDiv.className = "divActiveButton";
    newDiv.id = "div" + numberButton;
    if (objButton.value == 1) {
        newDiv.innerHTML = ('<img src="img/bomb.png">');
    } else {
        newDiv.innerHTML = objButton.bomb;
    }
    document.getElementById('divPlayingField').replaceChild(newDiv, objButton);
}

//функция создаёт двумерный массив, в который забивает объекты кнопок
function generateGame(size1, size2) {
    zeroingOutDivPlayingField();

    var div = generatePlayingField(size1, size2);
    document.getElementById('field').appendChild(div);

    for (var row = 1; row <= size1; row++) {
        arrButton[row] = [];
        for (var col = 1; col <= size2; col++) {
            var newButton = generateOneButton(row, col);
            arrButton[row][col] = newButton;
            document.getElementById('divPlayingField').appendChild(newButton);
        }
    }

    //присваиваем расчёт бомб для всех кнопок - выделить в отдельную функцию?
    for (var row = 1; row <= size1; row++) {
        for (var col = 1; col <= size2; col++) {
            document.getElementById(row + "." + col).bomb = calculateNumberBombs(row, col);
        }
    }
    //выдаём в "консоль" колличество бомб на игровом поле - временная штука. удалить
    //document.getElementById('cell').innerHTML = ("всего бомб: " + allBombs + "<br/>");
}



//проверяем наличие игрового поля, и если таковое есть, то удаляем
function zeroingOutDivPlayingField(){
    var element = document.getElementById('divPlayingField');
    if(element){
        element.remove();
    }
}


//для каждого уровня сложности функция создаёт игровое поле соотвествующего размера
function generatePlayingField(size1, size2){
    var div = document.createElement("div");
    div.id = 'divPlayingField';
    div.style.width = size1 * 27 + "px";
    div.style.height = size2 * 27 + "px";
    setWallpaper(size1,size2);
    return div;
}

//установка фоновой картинки для поля каждого размера TODO подобрать другие заставки
function setWallpaper(size1, size2){
    var result;
    if(size1 == 10){
        result = 'url(img/back03.jpg)';
    } else if (size1 == 16 && size2 == 16){
        result = 'url(img/back06.jpg)';
    } else {
        result = 'url(img/back05.jpg)';
    }
    document.getElementById('field').style.backgroundImage = result;
}


function generateOneButton(row, col) {
    var newButton = document.createElement("button");
    newButton.className = "button";
    newButton.id = (row + "." + col);
    newButton.value = rndGenerator(); //сюда ставим генератор бомба/пусто - добавить верхний предел колличества бомб (сложность)
    newButton.onclick = openOneCell;
    newButton.oncontextmenu = markUnmarkCell;
    if (newButton.value == 1) {
        allBombs++;
    }
    return newButton;
}


function rndGenerator() {
    var result = Math.floor(Math.random() * 5);
    return result;
}

function soundClickBomb(){
    var audio = new Audio();
    audio.src = "sound/ligthsword.mp3";
    audio.autoplay = true;
}