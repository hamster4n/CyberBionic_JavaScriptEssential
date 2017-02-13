var arrButton = []; //массив всех кнопок
var allBombs = 0; //колличество бомб в игре


//добавить функцию открытия всех пустых клеток, начиная с текущей, у которых нет смежных ячеек с минами - value = 0
//функция отображения времени решения задачи
//отображение колличества оставшихся мин
//падающая менюшка Игра (Новая/Настройки)/Справка (Посмотреть справку/О программе)
//назначить звуки действиям
//предусмотреть неквадратное поле!!!
//поставить функцию, которая определит,что игрок выиграл

function openEmptyCells(numberButton) { //тут должна быть рекурсия!!!
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
                    //и вот тут должен быть рекурсивный вызов
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
    var numberButton = this.id,
        objButton = document.getElementById(numberButton);
    if (objButton.value == 1) {
        openAllCells();
    } else {  //если бомбы в ячейке нет
        replaceButtonToDiv(numberButton, objButton); //открываем ячейку
        if (objButton.bomb == 0) {                       //если в ячейке ноль, то проверяем соседние на 0 и открываем их
            document.getElementById('cell').innerHTML += ("нулевая!<br/>"); //удалить
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
    document.getElementById('inputButtonDiv').replaceChild(newDiv, objButton);
}


function generateGame(size) { //функция создаёт двумерный массив, в который забивает объекты кнопок
    var totalNumberMines = size * 3, //резерв
        currentNumberMines = 0; //резерв
    for (var row = 1; row <= size; row++) {
        arrButton[row] = [];
        for (var col = 1; col <= size; col++) {
            var but = generateOneButton(row, col);
            arrButton[row][col] = but;
            document.getElementById('inputButtonDiv').appendChild(but);
        }
    }

    //присваиваем расчёт бомб для всех кнопок - выделить в отдельную функцию?
    for (var row = 1; row <= size; row++) {
        for (var col = 1; col <= size; col++) {
            document.getElementById(row + "." + col).bomb = calculateNumberBombs(row, col);
        }
    }
    //выдаём в "консоль" колличество бомб на игровом поле
    document.getElementById('cell').innerHTML = ("всего бомб: " + allBombs + "<br/>");
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