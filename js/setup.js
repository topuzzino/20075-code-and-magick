'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_NUMBER = 4;


var userDialog = document.querySelector('.setup');


// показывает блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');

// находит элемент, в который мы будем вставлять похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

// находит шаблон, который мы будем копировать.
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var randomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

// функция получает рандомное число между min и max
var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


// функция отрисовки персонажей
var getWizards = function () {
  var nameIndex = randomNumber(0, WIZARD_NAMES.length - 1);
  var surnameIndex = randomNumber(0, WIZARD_SURNAMES.length - 1);
  var coatColorIndex = randomNumber(0, COAT_COLORS.length - 1);
  var eyesColorIndex = randomNumber(0, EYES_COLORS.length - 1);
  return {
    name: WIZARD_NAMES[nameIndex] + ' ' + WIZARD_SURNAMES[surnameIndex],
    coatColor: COAT_COLORS[coatColorIndex],
    eyesColor: EYES_COLORS[eyesColorIndex]
  };
};


// функция создает копию шаблона и вставляет в него из массива рандомные имена, цвета мантии и цвет глаз
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


// вставляет в пустой массив wizards элементы из функции getWizards()
var generateWizards = function (wizardCount) {
  var wizards = [];
  for (var i = 0; i < wizardCount; i++) {
    wizards[i] = getWizards();
  }
  return wizards;
};

// будущий список похожих персонажей
var wizards = generateWizards(WIZARD_NUMBER);


// создает контейнер для будущих данных
var fragment = document.createDocumentFragment();


// Отрисовывает шаблон в документ
var getWizardTemplate = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
};

getWizardTemplate(wizards);

similarListElement.appendChild(fragment);


// -------------------- 4 --------------------

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupSubmit = document.querySelector('.setup-submit');
var setupForm = document.querySelector('.setup-wizard-form');


var setupCloseEscape = function (evt) { // if ESC, close setup
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};
var setupCloseEnter = function (evt) { // if ENTER, open Popup
  // / если фокус не на инпуте с именем, то закрывать с помощью ENTER
  if (evt.keyCode === ENTER_KEYCODE && evt.className !== '.setup-user-name') {
    closeSetup();
  }
};

var openSetup = function () { // функция открытия окна персонажа
  userDialog.classList.remove('hidden');
  userDialog.style.top = '80px';
  userDialog.style.left = '50%';
  document.addEventListener('keydown', setupCloseEscape); // если окно открыто, то ESC можно закрыть
};

var closeSetup = function () { // функция закрытия окна персонажа
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', setupCloseEscape); // обработчик закрытия окна по нажатию на Esc удаляется после закрытия окна
};

// открывает/закрывает окно персонажа по клику
setupOpen.addEventListener('click', openSetup);
setupClose.addEventListener('click', closeSetup);

setupOpen.addEventListener('keydown', function (evt) { // обработчик keydown - открывает окно по нажатию ENTER
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('focus', function () { // обработчик focus на крестике окна
  setupClose.addEventListener('keydown', setupCloseEnter);
});

setupSubmit.addEventListener('click', function () {
  setupForm.submit();
});

setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setupForm.submit();
  }
});


var wizardCoat = document.querySelector('.wizard-coat');

// клик по мантии меняет цвет мантии
wizardCoat.addEventListener('click', function () {
  var getRandomCoat = randomItem(COAT_COLORS);
  wizardCoat.style.fill = getRandomCoat;
  userDialog.querySelector('[name = coat-color]').value = getRandomCoat; // значение соответствующего скрытого инпута
});


var wizardEyes = document.querySelector('.wizard-eyes');

// клик по глазам меняет их цвет
wizardEyes.addEventListener('click', function () {
  var getRandomEyes = randomItem(EYES_COLORS);
  wizardEyes.style.fill = getRandomEyes;
  userDialog.querySelector('[name=eyes-color]').value = getRandomEyes; // значение соответствующего скрытого инпута
});


var FIREBALLS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizardFireball = document.querySelector('.setup-fireball-wrap');

// клик по фаерболу меняет его цвет
wizardFireball.addEventListener('click', function () {
  var getRandomFireball = randomItem(FIREBALLS);
  wizardFireball.style.backgroundColor = getRandomFireball;
  userDialog.querySelector('[name=fireball-color]').value = getRandomFireball; // значение соответствующего скрытого инпута
});


// -------------------- 5 --------------------


var userPic = userDialog.querySelector('.upload');


userPic.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  // координаты точки, с которой начали перемещать диалог
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  // При каждом движении мыши нужно обновлять смещение
  // относительно первоначальной точки, чтобы диалог смещался
  // на необходимую величину
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
    userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
  };

  // При отпускании кнопки мыши нужно переставать
  // слушать события движения мыши
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    if (dragged) {
      var onClickPreventDefault = function (evt) {
        evt.preventDefault();
        userPic.removeEventListener('click', onClickPreventDefault);
      };
      userPic.addEventListener('click', onClickPreventDefault);
    }
  };

  // Добавим обработчики события передвижения мыши и отпускания кнопки мыши
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

