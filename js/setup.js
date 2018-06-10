'use strict';

// показывает все окно, в котором происходит "действие"
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// показывает блок с похожими персонажами
document.querySelector('.setup-similar').classList.remove('hidden');

// находит элемент, в который мы будем вставлять похожих магов
var similarListElement = document.querySelector('.setup-similar-list');

// находит шаблон, который мы будем копировать.
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var WIZARD_NUMBER = 4;


// функция получает рандомное число между min и max
var randomItem = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


// функция отрисовки персонажей
var getWizards = function () {
  var nameIndex = randomItem(0, WIZARD_NAMES.length - 1);
  var surnameIndex = randomItem(0, WIZARD_SURNAMES.length - 1);
  var coatColorIndex = randomItem(0, COAT_COLORS.length - 1);
  var eyesColorIndex = randomItem(0, EYES_COLORS.length - 1);
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


