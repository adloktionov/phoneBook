let phonebook = {

    /*Object*/
    /*Приватные переменные*/
    counter: 0,
    arrInputId: ['inputName', 'inputTel', 'inputEmail', 'inputGroup', 'buttonAdd'],
    arrInputId2: [document.getElementById('inputName'), document.getElementById('inputTel'), document.getElementById('inputEmail'), document.getElementById('inputGroup'), document.getElementById('buttonAdd')],
    arrRegExpName: [/^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/i,
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/im,
        /^[a-z][a-z0-9]*?([-_][a-z0-9]+){0,2}$/i
    ],

    /*Слежение, приватные методы*/
    listenerTargetAdder() {
        phonebook.arrInputId2[4].addEventListener('click', phonebook.addContact);
    } /*метод слежение за нажатием кнопки Добавить контакт*/,

    /*добавление данных в таблицу*/
    addContact() {

        /*Возврат блокировки полей ввода*/
        for (let i = 1; i < phonebook.arrInputId2.length; i++) {
            phonebook.arrInputId2[i].disabled = true;
        } /*Конец возврата блокировки полей ввода*/

        var arrInputValue = [] /*массив для значений inputов*/,
            newTr = document.createElement('tr') /*новая строка*/,
            newTd /*новая ячейка*/;

        /*Создание новой строки и ее заполнение*/
        tbody.appendChild(newTr);
        newTr.id = 'row__' + phonebook.counter;

        for (let i = 0; i < phonebook.arrInputId2.length - 1; i++) {
            newTd = document.createElement('td');
            newTr.appendChild(newTd);
            newTd.innerHTML = phonebook.arrInputId2[i].value;
            phonebook.arrInputId2[i].value = '';
            phonebook.arrInputId2[i].style.borderColor = 'transparent';
        }

        newTd = document.createElement('td');
        newTr.appendChild(newTd);
        newTd.innerHTML = '<input type="button" id="remove__' + phonebook.counter++ + '" onclick="phonebook.removeContact()" value="УДАЛИТЬ" class="btn btn-danger" style="margin: .500em;">';
        /*Конец создания новой строки и ее заполнения*/

        /*Начало записи в локальное хранилище*/
        var rowNumber = 'row__' + (phonebook.counter - 1);
        var newTrLS = newTr.outerHTML;
        console.log(newTrLS);
        localStorage.setItem(rowNumber, newTrLS);
        /*Конец записи в локальное хранилище*/

    } /*конец метода добавления данных в таблицу*/,

    /*удаление данных*/
    removeContact() {

        /*Получение ID, по которому кликнули, и удаление этой строки*/
        document.getElementById('tbody').onclick = function fn(e = e || event) {
            let target = e.target || e.srcElement;

            tbody.removeChild(document.getElementById('row__' + +target.id.slice(8)));
            localStorage.removeItem('row__' + +target.id.slice(8));
        } /*Конец получения ID, по которому кликнули, и удаления этой строки*/

    } /*Конец метода удаления контакта из таблицы*/,

    EventListener() {

        for (let i = 0; i < phonebook.arrInputId.length; i++) {
            document.getElementById(phonebook.arrInputId[i]).addEventListener('keypress', () => {
                if (phonebook.arrRegExpName[i].test(document.getElementById(phonebook.arrInputId[i]).value)) {
                    document.getElementById(phonebook.arrInputId[i]).style.borderColor = 'Green';
                    document.getElementById(phonebook.arrInputId[i + 1]).disabled = false;
                } else document.getElementById(phonebook.arrInputId[i]).style.borderColor = 'Maroon';
            })
        }

    } /*отлов событий*/,

    initializer() {
        var iterator = localStorage.length - 1;
        if (localStorage.length) {
            for (iterator; iterator >= 0; iterator--) {
                var _newTr = document.createElement('tr');
                tbody.appendChild(_newTr);
                _newTr.id = 'row__' + iterator;
                _newTr.innerHTML = localStorage.getItem('row__' + iterator);
                phonebook.counter++;
            }
        }
    } /*заполнение таблицы из localStorage*/,

    start() {
        // console.log(phonebook.arrInputId2);
        this.initializer();
        this.EventListener();
        this.listenerTargetAdder();
    } /*начало программы*/

}

phonebook.start();
/*End object*/


// ЧАСЫ!!!!
/*начало программы*/
var hoursContainer = document.querySelector('.hours')
var minutesContainer = document.querySelector('.minutes')
var secondsContainer = document.querySelector('.seconds')
var tickElements = Array.from(document.querySelectorAll('.tick'))

var last = new Date(0)
last.setUTCHours(-1)

var tickState = true

function updateTime() {
    var now = new Date

    var lastHours = last.getHours().toString()
    var nowHours = now.getHours().toString()
    if (lastHours !== nowHours) {
        updateContainer(hoursContainer, nowHours)
    }

    var lastMinutes = last.getMinutes().toString()
    var nowMinutes = now.getMinutes().toString()
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes)
    }

    var lastSeconds = last.getSeconds().toString()
    var nowSeconds = now.getSeconds().toString()
    if (lastSeconds !== nowSeconds) {
        //tick()
        updateContainer(secondsContainer, nowSeconds)
    }

    last = now
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-hidden'))
}

function updateContainer(container, newTime) {
    var time = newTime.split('')

    if (time.length === 1) {
        time.unshift('0')
    }


    var first = container.firstElementChild
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0])
    }

    var last = container.lastElementChild
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1])
    }
}

function updateNumber(element, number) {
    //element.lastElementChild.textContent = number
    var second = element.lastElementChild.cloneNode(true)
    second.textContent = number

    element.appendChild(second)
    element.classList.add('move')

    setTimeout(function () {
        element.classList.remove('move')
    }, 990)
    setTimeout(function () {
        element.removeChild(element.firstElementChild)
    }, 990)
}

setInterval(updateTime, 100)


// КАЛЕНДАРЬ!!!    
var Cal = function (divId) {

    //Сохраняем идентификатор div
    this.divId = divId;

    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чтв',
        'Птн',
        'Суб',
        'Вск'
    ];

    // Месяцы начиная с января
    this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    //Устанавливаем текущий месяц, год
    var d = new Date();

    this.currMonth = d.getMonth('9');
    this.currYear = d.getFullYear('22');
    this.currDay = d.getDate('3');
};

// Переход к следующему месяцу
Cal.prototype.nextMonth = function () {
    if (this.currMonth == 11) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};

// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function () {
    if (this.currMonth == 0) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};

// Показать текущий месяц
Cal.prototype.showcurr = function () {
    this.showMonth(this.currYear, this.currMonth);
};



// Показать месяц (год, месяц)
Cal.prototype.showMonth = function (y, m) {

    var d = new Date()
        // Первый день недели в выбранном месяце 
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


    var html = '<table>';

    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';


    // заголовок дней недели
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Записываем дни
    var i = 1;
    do {

        var dow = new Date(y, m, i).getDay();

        // Начать новую строку в понедельник
        if (dow == 1) {
            html += '<tr>';
        }

        // Если первый день недели не понедельник показать последние дни предидущего месяца
        else if (i == 1) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth + 1;
            for (var j = 0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if (dow == 0) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if (i == lastDateOfMonth) {
            var k = 1;
            for (dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }

        i++;
    } while (i <= lastDateOfMonth);

    // Конец таблицы
    html += '</table>';

    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};

// При загрузке окна
window.onload = function () {

    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function () {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
    };
}

// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}


