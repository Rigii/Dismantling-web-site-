$(document ).ready(function() {
  const lastBody=document.getElementById('1');
// Поиск
    function objects() {
        let key = document.getElementById('search');
        let but = document.getElementById('find');
        let findedH2= Array.prototype.slice.call(document.body.getElementsByTagName('h2')); //создаём из нодлистов массивы
        let findedP= Array.prototype.slice.call(document.body.getElementsByTagName('p'));
        let general=findedH2.concat(findedP); //объединяем их
        let searcherOn=false;
        let coord=[];

           but.addEventListener('click', finder);
           function finder(e) {
                   for (i = 0; i < general.length; i++) {
                       searcherOn=true;
                       if (i < general.length) {
                           let curVal = general[i].innerHTML.match(new RegExp(key.value, 'g' + 'i')); // значение найденного совпадения
                           if (curVal !== null) {
                               coord.push(general[i].getBoundingClientRect());
                           }
                           for (n in curVal) {
                               general[i].innerHTML = general[i].innerHTML.replace(new RegExp(curVal[n], 'g'), '<a name="hallo" style="background-color: chartreuse">' + curVal[n] + '</a>')
                           }
                       }
                   }
               window.scrollTo(0,coord[0].y);
           }
           key.addEventListener('click', closer);
           function closer(e) {
               key.value = '';
               if(searcherOn===true){
                   document.location.reload()}
           }}
    objects();
    
    // Кнопка возврата
    function returnBut() {
        // Тело кнопки
        function upBut(){
            let butCont= document.createElement('div');
            butCont.id="up";
            butCont.innerHTML='<p style="background-color: black; opacity: 0.7">' +
                '<a href="#top" style="color: #ef634e">НАВЕРХ</a></p>';
            lastBody.appendChild(butCont);
            stateUpBut(butCont)
        }
        // Функция изменения состояния кнопки
        function stateUpBut(props){
        window.onscroll= function(){
            let top= lastBody.getBoundingClientRect(); //получаем отступ window относительно верха документа (можно заменить на корд. кнопки)
            if(top.y< -400){
                props.style.display='block';
        }else{props.style.display='none'}
        }}
        upBut();
    }
    returnBut();

    //Галерея
    // Шифты
    function nawBar(propsDiv) {
        let mooveLeft = document.createElement('div');
        mooveLeft.id = 'leftShift';
        mooveLeft.innerHTML = "<";
        propsDiv.appendChild(mooveLeft);
        let mooveRight = document.createElement('div');
        mooveRight.id = 'rightShift';
        mooveRight.innerHTML = ">";
        propsDiv.appendChild(mooveRight);
    }

//Блок галереи
    function createModalWind(props) {
        let modDiv = document.createElement('div');
        modDiv.id = 'gallereyWind';
        modDiv.style.display = props.state;
        let container = document.createElement('div');
        container.id = 'cont';
        let img = document.createElement('img');
        img.id = 'slideImg';
        img.src = props.img;
        img.style.maxHeight='600px';
        if(window.innerWidth>1100) {img.style.width='auto'};
        container.appendChild(img);
        nawBar(container);
        modDiv.appendChild(container);
        document.body.appendChild(modDiv);
        container.style.top = (document.documentElement.clientHeight - img.height) / 2 + 'px';
        control({el: modDiv, img: props.object});
    }

//Ф-ия вызова галереи
    function opener() {
        let gallerey = document.getElementsByClassName('gallerey');
        for (i = 0; i < gallerey.length; i++) {
            gallerey[i].addEventListener('mouseover', function (e) {
                $(this).css('cursor', 'pointer')
            });
            /* e.target.style.width='20.1vw'
             gallerey[i].addEventListener('mouseout', function(e){e.target.style.width='20vw'});*/
            gallerey[i].addEventListener('click', gallereyClick);
        }
        function gallereyClick(event) {
            let target = event.target;
            if (target.tagName === 'IMG') {
                return createModalWind({img: target.src, state: 'block', object: target});
            }
        }
    }
    opener();

//Функция управления галереей
    function control(modalDiv) {
        let leftSh = document.getElementById('leftShift');
        let rightSh = document.getElementById('rightShift');

        leftSh.addEventListener('mouseover', function (e) {
            $(this).css('cursor', 'pointer')
        });
        rightSh.addEventListener('mouseover', function (e) {
            $(this).css('cursor', 'pointer')
        });

        modalDiv.el.addEventListener('click', galleryClose);

        function galleryClose(e) {
            if (e.target.id === leftSh.id) {
                let newCh = (modalDiv.img).previousElementSibling;
                if (newCh !== null) document.body.removeChild(modalDiv.el);
                if (newCh !== null) {
                    return createModalWind({img: newCh.src, state: 'block', object: newCh})
                }
            }
            if (e.target.id === rightSh.id) {
                let newCh = (modalDiv.img).nextElementSibling;
                if (newCh !== null) document.body.removeChild(modalDiv.el);
                return newCh === null ? document.body.removeChild(modalDiv.el) : createModalWind({
                    img: newCh.src,
                    state: 'block',
                    object: newCh
                })
            }
            return document.body.removeChild(modalDiv.el)
        }
    }

// Скрытие текста
    function hover() {
 function butHide() { //прячем кнопки развёртки, при загрузке сраницы в полном размере.
     let openers=document.getElementsByClassName('opener');
for (i=0; i<openers.length; i++){
        if(window.innerWidth>1360){openers[i].style.display='none'}}
   window.onresize= function (e) {  //... прячем/проявляем при изменении размера окна
       for (i=0; i<openers.length; i++){
    if(window.innerWidth>1360){openers[i].style.display='none'}else{openers[i].style.display='block'}}}
 }
 butHide();

        let lisn=document.getElementById('restContainer');
lisn.addEventListener('click', divSiser);
function divSiser(e){
    let prevNode=e.target.previousElementSibling;
    if (e.target.className==='opener'){prevNode.style.height= prevNode.style.height==='100%'? '180px': '100%'}}
        };
    hover();

    //Админка
    // Модальное окно валидации
    function createModDiv() {
    let loginWind=document.createElement('div');
    loginWind.className='modal';
        loginWind.style.display = "block";
    let modContent=document.createElement('div');
    modContent.className='modContent';
    modContent.style.top = (document.documentElement.clientHeight - 190) / 2 + 'px';
    modContent.innerHTML='<div id="logForm"><p>Логин</p><input id="log" type="text" size="30"><p>Пароль</p><input id="pass" type="text" size="30"><br><button id="logBut">Подтвердить</button></div>';
        loginWind.appendChild(modContent);
    document.body.appendChild(loginWind);
}
// Открытие окна валидации
function openModDiv(){
    let pas=document.getElementById('pass');
    enter.ondblclick=function(){
        createModDiv();
        onLogBut()
    }
}
    openModDiv();

// Валидация
   function onLogBut(){
        let but= document.getElementById('logBut');
       let pass= document.getElementById('pass');
       let log= document.getElementById('log');
       but.onclick=function(e){

           if ( log.value==''&& pass.value==''){
               let but=document.getElementsByClassName('redactBut');
               for(i=0;i< but.length; i++){
but[i].style.display='block';
               }
           } else {alert('Неправильно введён логин или пароль')}
       }
   }

//Закрытие модального окна
    function closeModDiv(props){
        document.body.onclick=function(e){
            if (e.target.className==='modal'){
                document.body.removeChild(e.target)
            }
        }
    }
    closeModDiv();

    // Форма редактирования контента
    function redactContent(props) {
        let loginWind=document.createElement('div');
        loginWind.className='modal';
        loginWind.style.display = "block";
        let modContent=document.createElement('div');
        modContent.className='modContent';
        modContent.innerHTML='<div id="form"><p style="margin-top: 3px">Введите заголовок</p><input style="margin-top: 3px" id="contentHead" type="text" size="30" value="'+props[0]+'">'+
            '<br><button id="contBut"style="margin-top: 3px">Изменить</button>' +
            '<p style="margin-top: 3px">Введите текст</p><textarea id="contentText" style="margin-top: 3px" type="text" rows="5" cols="85">'+props[1]+'</textarea>' +
            '<br><button id="contBut" style="margin-top: 3px">Изменить</button></div>';
        loginWind.appendChild(modContent);
        document.body.appendChild(loginWind);
    }

    //Функция редактирования текста
    function textRedact() {
        document.body.addEventListener('click', redact);
        function redact(e){
            if (e.target.className==='redactBut'){
               let parent= e.target.parentNode;
               let head= parent.getElementsByTagName('h2');
                let par= parent.getElementsByTagName('p');
               redactContent([head[0].innerText, par[0].innerText]);
            }
        }
    }
    textRedact()

        //

});





// Функция раздельного поиска в тегах
/* function finder(e){
let highVal= findedP.length>findedH2.length? findedP.length: findedH2.length;
        for (i=0; i<highVal; i++){
            if (i<findedH2.length) {let firstVal=findedH2[i].innerHTML.match(new RegExp(key.value,'i'));
                let curVal=findedH2[i].innerHTML.match(new RegExp(key.value,'g'+'i')); // значение найденного совпадения в h2
                for (n in curVal){
             findedH2[i].innerHTML= findedH2[i].innerHTML.replace(new RegExp(curVal[n], 'g'), '<a name="hallo" style="background-color: chartreuse">'+curVal[n]+'</a>')}}

            if (i<findedP.length) {let firstValP=findedP[i].innerHTML.match(new RegExp(key.value,'i'));
                let curValP=findedP[i].innerHTML.match(new RegExp(key.value,'g'+'i')); // значение найденного совпадения в p

                for (n in curValP){
           findedP[i].innerHTML= findedP[i].innerHTML.replace(new RegExp(curValP[n],'g'), '<a style="background-color: chartreuse">'+curValP[n]+'</a>')};
    }}
    }
    */