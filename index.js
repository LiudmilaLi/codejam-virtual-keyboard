'use strict';

let keyboard = document.createElement('div');
keyboard.className = 'keyboard';
document.body.append(keyboard);
let input = document.createElement('textarea');
input.className = 'input';
document.body.prepend(input);

const keysCode = [['BackQuote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5',
  'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO',
  'KeyP', 'BracketLeft', 'BracketRight'],
['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL',
  'Semicolon', 'Quote', 'Backslash', 'Enter'],
['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period',
  'Slash', 'ArrowUp', 'ShiftRight'],
['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft',
  'ArrowDown', 'ArrowRight']];

const keyRus = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
  ['Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '∧', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '∨', '>', 'Ctrl']];

const keyEng = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '∧', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '∨', '>', 'Ctrl']];

for (let i = 0; i < 5; i += 1) {
  keyboard.insertAdjacentHTML('beforeEnd', '<div class="row"></div>');
  let str = document.getElementsByClassName('row');
  for (let j = 0; j < keyEng[i].length; j += 1) {
    str[i].insertAdjacentHTML('beforeEnd', `<div id=${keysCode[i][j]} class="button">${keyEng[i][j]}</div>`);
  }
}

let buttons = document.getElementsByClassName('button');
for (let i = 0; i < buttons.length; i += 1) {
  buttons[i].querySelectorAll('.keyboard');
}

let lastActiveKey;
keyboard.addEventListener('click', (event) => {
  const currentKey = event.target;
  currentKey.classList.add('active');

  if (lastActiveKey) {
    lastActiveKey.classList.remove('active');
  }

  lastActiveKey = currentKey;
  input.focus();
});

let ruLang = false;
let lock = false;
let check = false;

function changeLangToRus() {
  ruLang = true;
  localStorage.setItem('rus', ruLang);
  for (let i = 0; i < 5; i += 1) {
    let str = document.getElementsByClassName('row');
    str = str[i].children;
    for (let j = 0; j < keyEng[i].length; j += 1) {
      str[j].innerHTML = keyRus[i][j];
    }
  }
}

function changeLangToEng() {
  ruLang = false;
  localStorage.setItem('rus', ruLang);
  for (let i = 0; i < 5; i += 1) {
    let str = document.getElementsByClassName('row');
    str = str[i].children;
    for (let j = 0; j < keyEng[i].length; j += 1) {
      str[j].innerHTML = keyEng[i][j];
    }
  }
  if (lock) {
    for (let i = 0; i < buttons.length; i += 1) {
      if (buttons[i].id.slice(0, 3) === 'Key') {
        buttons[i].innerHTML = buttons[i].innerHTML.toUpperCase();
      }
    }
  }
}

let press = new Set();
document.addEventListener('keydown', (event) => {
  check = true;
  buttons[event.code].click();
  if (event.code === 'AltLeft' || event.shiftKey) {
    press.add(event.code);
    if (press.size === 2) {
      if (!ruLang) { changeLangToRus(); } else { changeLangToEng(); }
      press.clear();
    }
  }
});

switch (this.innerHTML) {
  case 'ENG':
    changeLangToEng();
    input.focus();
    break;
  case 'Rus':
    changeLangToRus();
    input.focus();
    break;
  case 'Backspace':
    input.focus();
    if (check) { break; }
    input.value = input.value.slice(0, -1);
    break;
  case 'Space':
    input.focus();
    if (check) { break; }
    input.value += ' ';
    break;
  case 'Enter':
    if (check) { break; }
    input.value += '\n';
    input.focus();
    break;

  default:
    input.focus();
    if (check) { break; }
    input.value += this.innerHTML;
    break;
}
