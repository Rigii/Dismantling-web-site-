
$(document).ready(function () {
    var lastBody = document.getElementById('1');
    // Поиск
    function objects() {
        var key = document.getElementById('search');
        var but = document.getElementById('find');
        var findedH2 = Array.prototype.slice.call(document.body.getElementsByTagName('h2')); //создаём из нодлистов массивы
        var findedP = Array.prototype.slice.call(document.body.getElementsByTagName('p'));
        var general = findedH2.concat(findedP); //объединяем их
        var searcherOn = false;
        var coord = [];

        but.addEventListener('click', finder);
        function finder(e) {
            for (i = 0; i < general.length; i++) {
                searcherOn = true;
                if (i < general.length) {
                    var curVal = general[i].innerHTML.match(new RegExp(key.value, 'g' + 'i')); // значение найденного совпадения
                    if (curVal !== null) {
                        coord.push(general[i].getBoundingClientRect());
                    }
                    for (n in curVal) {
                        general[i].innerHTML = general[i].innerHTML.replace(new RegExp(curVal[n], 'g'), '<a name="hallo" style="background-color: chartreuse">' + curVal[n] + '</a>');
                    }
                }
            }
            window.scrollTo(0, coord[0].y);
        }
        key.addEventListener('click', closer);
        function closer(e) {
            key.value = '';
            if (searcherOn === true) {
                document.location.reload();
            }
        }
    }
    objects();

    // Кнопка возврата
    function returnBut() {
        // Тело кнопки
        function upBut() {
            var butCont = document.createElement('div');
            butCont.id = "up";
            butCont.innerHTML = '<p style="background-color: black; opacity: 0.7"><a href="#top" style="color: #ef634e">НАВЕРХ</a></p>';
            lastBody.appendChild(butCont);
            stateUpBut(butCont);
        }
        // Функция изменения состояния кнопки
        function stateUpBut(props) {
            window.onscroll = function () {
                var top = lastBody.getBoundingClientRect(); //получаем отступ window относительно верха документа (можно заменить на корд. кнопки)
                if (top.y < -400) {
                    props.style.display = 'block';
                } else {
                    props.style.display = 'none';
                }
            };
        }
        upBut();
    }
    returnBut();

    //Галерея
    // Шифты
    function nawBar(propsDiv) {
        var mooveLeft = document.createElement('div');
        mooveLeft.id = 'leftShift';
        mooveLeft.innerHTML = "<";
        propsDiv.appendChild(mooveLeft);
        var mooveRight = document.createElement('div');
        mooveRight.id = 'rightShift';
        mooveRight.innerHTML = ">";
        propsDiv.appendChild(mooveRight);
    }

    //Блок галереи
    function createModalWind(props) {
        var modDiv = document.createElement('div');
        modDiv.id = 'gallereyWind';
        modDiv.style.display = props.state;
        var container = document.createElement('div');
        container.id = 'cont';
        var img = document.createElement('img');
        img.id = 'slideImg';
        img.src = props.img;
        img.style.maxHeight = '600px';
        if (window.innerWidth > 1100) {
            img.style.width = 'auto';
        };
        container.appendChild(img);
        nawBar(container);
        modDiv.appendChild(container);
        document.body.appendChild(modDiv);
        container.style.top = (document.documentElement.clientHeight - img.height) / 2 + 'px';
        control({ el: modDiv, img: props.object });
    }

    //Ф-ия вызова галереи
    function opener() {
        var gallerey = document.getElementsByClassName('gallerey');
        for (i = 0; i < gallerey.length; i++) {
            gallerey[i].addEventListener('mouseover', function (e) {
                $(this).css('cursor', 'pointer');
            });
            /* e.target.style.width='20.1vw'
             gallerey[i].addEventListener('mouseout', function(e){e.target.style.width='20vw'});*/
            gallerey[i].addEventListener('click', gallereyClick);
        }
        function gallereyClick(event) {
            var target = event.target;
            if (target.tagName === 'IMG') {
                return createModalWind({ img: target.src, state: 'block', object: target });
            }
        }
    }
    opener();

    //Функция управления галереей
    function control(modalDiv) {
        var leftSh = document.getElementById('leftShift');
        var rightSh = document.getElementById('rightShift');

        leftSh.addEventListener('mouseover', function (e) {
            $(this).css('cursor', 'pointer');
        });
        rightSh.addEventListener('mouseover', function (e) {
            $(this).css('cursor', 'pointer');
        });

        modalDiv.el.addEventListener('click', galleryClose);

        function galleryClose(e) {
            if (e.target.id === leftSh.id) {
                var newCh = modalDiv.img.previousElementSibling;
                if (newCh !== null) document.body.removeChild(modalDiv.el);
                if (newCh !== null) {
                    return createModalWind({ img: newCh.src, state: 'block', object: newCh });
                }
            }
            if (e.target.id === rightSh.id) {
                var _newCh = modalDiv.img.nextElementSibling;
                if (_newCh !== null) document.body.removeChild(modalDiv.el);
                return _newCh === null ? document.body.removeChild(modalDiv.el) : createModalWind({
                    img: _newCh.src,
                    state: 'block',
                    object: _newCh
                });
            }
            return document.body.removeChild(modalDiv.el);
        }
    }

    // Скрытие текста
    function hover() {
        function butHide() {
            //прячем кнопки развёртки, при загрузке сраницы в полном размере.
            var openers = document.getElementsByClassName('opener');
            for (i = 0; i < openers.length; i++) {
                if (window.innerWidth > 1360) {
                    openers[i].style.display = 'none';
                }
            }
            window.onresize = function (e) {
                //... прячем/проявляем при изменении размера окна
                for (i = 0; i < openers.length; i++) {
                    if (window.innerWidth > 1360) {
                        openers[i].style.display = 'none';
                    } else {
                        openers[i].style.display = 'block';
                    }
                }
            };
        }
        butHide();

        var lisn = document.getElementById('restContainer');
        lisn.addEventListener('click', divSiser);
        function divSiser(e) {
            var prevNode = e.target.previousElementSibling;
            if (e.target.className === 'opener') {
                prevNode.style.height = prevNode.style.height === '100%' ? '180px' : '100%';
            }
        }
    };
    hover();

    //Админка
    // Модальное окно валидации
    function createModDiv() {
        var loginWind = document.createElement('div');
        loginWind.className = 'modal';
        loginWind.style.display = "block";
        var modContent = document.createElement('div');
        modContent.className = 'modContent';
        modContent.style.top = (document.documentElement.clientHeight - 190) / 2 + 'px';
        modContent.innerHTML = '<div id="logForm"><p>Логин</p><input id="log" type="text" size="30"><p>Пароль</p><input id="pass" type="text" size="30"><br><button id="logBut">Подтвердить</button></div>';
        loginWind.appendChild(modContent);
        document.body.appendChild(loginWind);
    }
    // Открытие окна валидации
    function openModDiv() {
        var pas = document.getElementById('pass');
        enter.ondblclick = function () {
            createModDiv();
            onLogBut();
        };
    }
    openModDiv();

    // Валидация
    function onLogBut() {
        var but = document.getElementById('logBut');
        var pass = document.getElementById('pass');
        var log = document.getElementById('log');
        but.onclick = function (e) {

            if (log.value == '' && pass.value == '') {
                var _but = document.getElementsByClassName('redactBut');
                for (i = 0; i < _but.length; i++) {
                    _but[i].style.display = 'block';
                }
            } else {
                alert('Неправильно введён логин или пароль');
            }
        };
    }

    //Закрытие модального окна
    function closeModDiv(props) {
        document.body.onclick = function (e) {
            if (e.target.className === 'modal') {
                document.body.removeChild(e.target);
            }
        };
    }
    closeModDiv();

    // Форма редактирования контента
    function redactContent(props) {
        var loginWind = document.createElement('div');
        loginWind.className = 'modal';
        loginWind.style.display = "block";
        var modContent = document.createElement('div');
        modContent.className = 'modContent';
        modContent.innerHTML = '<div id="form"><p style="margin-top: 3px">Введите заголовок</p><input style="margin-top: 3px" id="contentHead" type="text" size="30" value="' + props[0] + '">' + '<br><button id="contBut"style="margin-top: 3px">Изменить</button>' + '<p style="margin-top: 3px">Введите текст</p><textarea id="contentText" style="margin-top: 3px" type="text" rows="5" cols="85">' + props[1] + '</textarea>' + '<br><button id="contBut" style="margin-top: 3px">Изменить</button></div>';
        loginWind.appendChild(modContent);
        document.body.appendChild(loginWind);
    }

    //Функция редактирования текста
    function textRedact() {
        document.body.addEventListener('click', redact);
        function redact(e) {
            if (e.target.className === 'redactBut') {
                var parent = e.target.parentNode;
                var head = parent.getElementsByTagName('h2');
                var par = parent.getElementsByTagName('p');
                redactContent([head[0].innerText, par[0].innerText]);
            }
        }
    }
    textRedact();

    //
});