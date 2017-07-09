onclick

1. можно засунуть в разметку и тогда всё работает. Но не получается покачто при создании кнопки засунуть в атрибуты ссылку на функцию, может просто обернуть в див и в него пихать уже сконструированную кнопку? Типа так:

    var newDiv = document.createElement("div");
    newDiv.className="divActiveButton";
	newDiv.innerHTML = ('<button class="button" id="row + \'.\' + col" value="rndGenerator()" onclick="replaceButtonToDiv(this)" oncontextmenu="markUnmarkCell(this) ; return false">');
	return newDiv;
	
	<button id="row + "." + col">
	
так отрабатывают: onclick и oncontextmenu
НЕ отрабатывают: id и rndGenerator
а как положить значение переменной (или функции) в атрибут HTML? //см строку 7

2. можно назначить обработчик событий свойству DOM объекта. Собираем все кнопки, и идём в цикле по этой выборке, назначая событию onclick функцию. При этом у меня сразу эта функция выполняется, а не по нажатию мыхи. Также непонятно где должна храниться эта инфа?

function setLeftClickHandler() {
    var elements = document.getElementsByClassName('button');
    for(var i =0; i < elements.length; i++){
        elements[i].onclick = replaceButtonToDiv(elements[i]);
    }
}


3. Можно использовать метод addEventListener. Также в цикле. Результат такой же, как и в п.2 - обработчик отрабатывает в цикле, а не по событию.

function setLeftClickHandler() {
    var elements = document.getElementsByClassName('button');
    for(var i =0; i < elements.length; i++){
        elements[i].addEventListener("onclick", replaceButtonToDiv(elements[i]));
    }
}


************************************************************
Новичёк
10 мин. поле 9 * 9
Любитель
40 мин поле 16*16
Професионал
99 мин поле 16 * 30
************************************************************
рандом. мысли
берём размерность игрального поля, например 10*10
известно число бомб, например 19
через рандом получаем строку (), через второй рандом - столбик и пишем в эту ячейку бомбу,
если там бомба уже есть, то повторяем
всё это  в цикле, где i = 19

такой вариант позволит ставить фиксированное колличество мин

function getRandomInt(min, max)
{
return Math.floor(Math.random() * (max - min + 1)) + min;
}

***************************************************************
