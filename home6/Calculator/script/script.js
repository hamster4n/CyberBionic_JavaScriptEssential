var arrOperator = [],
    counter = 0,
    left = [], //массив содержит результат вычисления выражений компьютером
    right = [], // массив содержит предложенные пользователем ответы
    numberOfExampls;


function generateOneNumber() {
    return Math.floor(Math.random() * (100 - 1));
}
function takeOperator() {
    var check = document.getElementsByClassName('checkbox');
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            arrOperator[i] = transformOperator(i);
            counter++;
        }
    }
    if (counter == 0) {
        arrOperator[0] = "+";
    }
}
function transformOperator(i) {
    switch (i) {
        case 0: {
            return "+"
        }
            ;
            break;
        case 1: {
            return "-"
        }
            ;
            break;
        case 2: {
            return "/"
        }
            ;
            break;
        case 3: {
            return "*"
        }
            ;
            break;
        default:
            return "+";
    }
}

function generateOneOperator() {
    var operator = Math.floor(Math.random() * (4 - 0));
    if (arrOperator[operator] == undefined) {
        for (var j = 0; arrOperator[operator] == undefined; j++) {
            operator = Math.floor(Math.random() * (4 - 0));
        }
    }
    return arrOperator[operator];
}

function generateOneExpression(numberTask) {
    var a = generateOneNumber(),
        b = generateOneNumber(),
        operatorInExpression = generateOneOperator();
    eval("left[numberTask] = a" + operatorInExpression + "b");
    var div = document.createElement("div");
    div.className = "divAnswerLine";

    div.innerHTML = (
    '<div id="task' + numberTask + '">' + a + "" + operatorInExpression + "" + b + '</div> \n' +
    '<div><input type="number" class="answer" /></div> \n' +
    '<div id="out' + numberTask + '"></div> \n');

    document.getElementById("outputDiv").appendChild(div);

}

function generateAllExpression() {
    for (var i = 1; i <= numberOfExampls; i++) {
        generateOneExpression(i);
    }
}

//главная функция генерирования задач
function generateTasks() {
    numberOfExampls = +document.getElementById("number0").value;
    document.getElementById('outputDiv').innerHTML = '';
    counter = 0;
    arrOperator = [];
    takeOperator();
    generateAllExpression();
    setSizeBodyCalcButton();
}


//главная функция проверки задач
function inspectTasks() {
    getRightAnswers();
    compareLeftRight();
}

function setSizeBodyCalcButton() {
    var verticalSizeOutputDiv = document.getElementById('outputDiv').offsetHeight; //получаю высоту зоны вывода
    var verticalBodyCalcButton = document.getElementById('bodyCalcButton').offsetHeight; //получаем высоту блока с кнопкой
    var verticalCalc = document.getElementById('Calc').offsetHeight;
    document.getElementById('bodyCalcButton').style.height =
        (verticalSizeOutputDiv>=verticalBodyCalcButton) ? verticalSizeOutputDiv + 'px' : '250px';
    document.getElementById('Calc').style.height=
        (verticalSizeOutputDiv > 250) ? (100 + verticalSizeOutputDiv + 'px') : '350px';


}

function getRightAnswers() {
    var answer = document.getElementsByClassName('answer');
    for (var i = 0; i < numberOfExampls; i++) {
        right[i + 1] = parseInt(answer[i].value);
    }
}
function compareLeftRight() {
    for (var i = 1; i <= numberOfExampls; i++) {
        var adressOut = "out" + i;
        if (left[i] == right[i]) {
            document.getElementById(adressOut).innerHTML = ("true");
        } else {
            document.getElementById(adressOut).innerHTML = ("false");
        }
    }
}