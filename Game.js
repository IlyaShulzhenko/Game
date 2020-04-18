"use strict";

  // в закладке УРЛа будем хранить полное JSON-представление состояния приложения

  // отслеживаем изменение закладки в УРЛе
  // оно происходит при любом виде навигации
  // (в т.ч. при нажатии кнопок браузера ВПЕРЁД/НАЗАД)
  // и при программном изменении закладки
  window.onhashchange=switchToStateFromURLHash;

  // текущее состояние приложения
  // это Model из MVC
  var SPAState={}; // могут быть элементы pagename и photoid

  // фотографии, которые можно просмотреть
  var photos={
    1 : { image:"Hilu3.jpg", comment:"собака Шарик лысый" },
    2 : { image:"Retriever3.jpg", comment:"собака Барбос мохнатый" }
  };

  // вызывается при изменении закладки УРЛа
  // а также при первом открытии страницы
  // читает новое состояние приложения из закладки УРЛа
  // и обновляет ВСЮ вариабельную часть веб-страницы
  // соответственно этому состоянию
  // это упрощённая реализация РОУТИНГА - автоматического выполнения нужных
  // частей кода в зависимости от формы URLа
  // "роутинг" и есть "контроллер" из MVC - управление приложением через URL
  function switchToStateFromURLHash() {
    var URLHash=window.location.hash;

    // убираем из закладки УРЛа решётку
    // (по-хорошему надо ещё убирать восклицательный знак, если есть)
    // и декодируем из формата УРЛ, т.к. любые значения в УРЛ закодированы
    var stateJSON=decodeURIComponent(URLHash.substr(1));

    if ( stateJSON!="" )
      SPAState=JSON.parse(stateJSON); // если JSON непустой, читаем из него состояние и отображаем
    else
      SPAState={pagename:'Main'}; // иначе показываем главную страницу

    console.log('Новое состояние приложения:');
    console.log(SPAState);


    const pageName = SPAState.pagename;

    // обновляем вариабельную часть страницы под текущее состояние
    // это реализация View из MVC - отображение состояния модели в HTML-код
    var pageHTML="";
    switch ( SPAState.pagename ) {
      case 'Main':
        pageHTML+="<h3>Главная страница</h3>";
        pageHTML+="<p>Щёлкайте по кнопкам!</p>";
        break;
      case 'Photo':
        var photo=photos[SPAState.photoid];
        pageHTML+="<h3>Фото</h3>";
        pageHTML+="<img src='"+photo.image+"'>";
        pageHTML+="<p><i>"+photo.comment+"</i></p>";
        break;
      case 'About':
        pageHTML+="<h3>О нас</h3>";
        pageHTML+= '<div class="wrapper"><canvas class="canvas" id="canvas"></canvas></div>';
        pageHTML+= '<script src="game.js"></script>';
        break;
    }
    document.getElementById('IPage').innerHTML=pageHTML;
    if (pageName === 'About') {
      startGame();
    }
  }

  // устанавливает в закладке УРЛа новое состояние приложения
  // и затем устанавливает+отображает это состояние
  function switchToState(newState) {
    // устанавливаем закладку УРЛа (кодируя как положено любые компоненты УРЛ)
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    location.hash=encodeURIComponent(JSON.stringify(newState));

    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
  }

  function switchToMainPage() {
    switchToState( { pagename:'Main' } );
  }

  function switchToPhotoPage(photoId) {
    switchToState( { pagename:'Photo', photoid:photoId } );
  }

  function switchToAboutPage() {
    switchToState( { pagename:'About' } );
  }

  // переключаемся в состояние, которое сейчас прописано в закладке УРЛ
  switchToStateFromURLHash();

  var photosStr="";
  for ( var photoId in photos ) {
    var photo=photos[photoId];
    photosStr+='<input type=button value="'+photo.comment+'" onclick="switchToPhotoPage('+photoId+')"> ';
  }
  document.getElementById('IPhotosButtons').innerHTML=photosStr;


  function startGame() {
    class Road {
      constructor(image, y) {
        this.x = 0;
        this.y = y;
        this.loaded = false;

        this.image = new Image();

        let obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
      }

      Update(road) {
        this.y += speed; //движение изображения вниз
        if(this.y > window.innerHeight) { //если изображение покинуло экран, то меняется положение

          this.y = road.y - canvas.width + speed; //новое положение зависит от следующего объекта
        }
      }
    }

    class Car{
      constructor(image, x, y, isPlayer)	{
        this.x = x;
        this.y = y;
        this.loaded = false;
        this.dead = false;
        this.isPlayer = isPlayer;

        this.image = new Image();

        let obj = this;

        this.image.addEventListener("load", function () { obj.loaded = true; });

        this.image.src = image;
      }

      Update(){
        if(!this.isPlayer){
          this.y += speed;
        }

        if(this.y > canvas.height + 50){
          this.dead = true;
        }
      }

      Collide(car){
        let hit = false;

        if(this.y < car.y + car.image.height * scale && this.y + this.image.height * scale > car.y){ //если столкновение по у

          if(this.x + this.image.width * scale > car.x && this.x < car.x + car.image.width * scale){ //если столкновение по х
            hit = true;

          }
        }

        return hit;
      }

      Move(v, d){
        if(v == "x"){ //передвиж по х

          d *= 2;

          this.x += d; //смена позиции

          //если автомобиль покинул экран, то возврат изменений
          if(this.x + this.image.width * scale > canvas.width){
            this.x -= d;

          }

          if(this.x < 0){
            this.x = 0;
          }
        }
        else{ //передвиж по у

          this.y += d;

          if(this.y + this.image.height * scale > canvas.height){
            this.y -= d;
          }

          if(this.y < 0){
            this.y = 0;
          }
        }

      }
    }


    const UPDATE_TIME = 1000 / 60;

    let timer = null;

    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let scale = 0.2; //масштаб машин

    Resize(); //получение холста дороги на экране

    window.addEventListener("resize", Resize); //изменение размера холста в соответствии с размерами экрана

//для нормальной работы на мобильн устр.
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); return false; });

    window.addEventListener("keydown", function (e) { KeyDown(e); }); //получение событий с клавиатуры

    let objects = []; //игровые объекты

    let roads =
        [
          new Road("images/road.jpg", 0),
          new Road("images/road.jpg", canvas.width)
        ]; //фон

    let player = new Car("images/car.png", canvas.width / 2, canvas.height / 2, true); //машина игрока


    let speed = 5;

    Start();


    function Start(){
      if(!player.dead){
        timer = setInterval(Update, UPDATE_TIME); //обновление игры раз в 60 сек
      }

    }

    function Stop(){
      clearInterval(timer); //остановка игры
      timer = null;
    }

    function Update(){
      roads[0].Update(roads[1]);
      roads[1].Update(roads[0]);

      if(RandomInteger(0, 215) > 210){ //создание новых машин

        objects.push(new Car("images/carMale.png", RandomInteger(400, canvas.width - 400), RandomInteger(1000, 1200) * -1 ));
      }

      player.Update();

      if(player.dead){
        alert("Crash!");
        Stop();
      }

      let isDead = false;

      for(let i = 0; i < objects.length; i++){
        objects[i].Update();

        if(objects[i].dead){
          isDead = true;
        }
      }

      if(isDead){
        objects.shift();
      }

      let hit = false;

      for(let i = 0; i < objects.length; i++){
        hit = player.Collide(objects[i]);

        if(hit){
          alert("Crash!");
          Stop();
          player.dead = true;
          break;
        }
      }

      Draw();
    }

    function Draw(){ //работа с графикой

      ctx.clearRect(0, 0, canvas.width, canvas.height); //очистка канваса
      for(let i = 0; i < roads.length; i++){
        ctx.drawImage
        (
            roads[i].image, //картинка
            0, //первый х изображения
            0, //первый у
            roads[i].image.width, //последний х
            roads[i].image.height, //последний у
            roads[i].x, //х
            roads[i].y, //Y
            canvas.width, //ширина
            canvas.width //высота (для того, чтобы картинка шла друг за другом)
        );
      }

      DrawCar(player);

      for(let i = 0; i < objects.length; i++){
        DrawCar(objects[i]);
      }
    }

    function DrawCar(car){
      ctx.drawImage
      (
          car.image,
          0,
          0,
          car.image.width,
          car.image.height,
          car.x,
          car.y,
          car.image.width * scale,
          car.image.height * scale
      );
    }

    function KeyDown(e){
      switch(e.keyCode){

        case 37:
          player.Move("x", -speed);
          break;

        case 39:
          player.Move("x", speed);
          break;

        case 38:
          player.Move("y", -speed);
          break;

        case 40:
          player.Move("y", speed);
          break;

        case 27:
          if(timer == null){
            Start();
          }
          else{
            Stop();
          }
          break;
      }
    }

    function Resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function RandomInteger(min, max){
      let rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    }
  };
