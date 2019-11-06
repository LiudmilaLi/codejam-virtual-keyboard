'use strict';

const keys =  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',
      'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
      'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '∧', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '∨', '>', 'Ctrl'
    ];

   /* eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
      'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
      'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '∧', 'Shift',
      'Ctrl', 'Win', 'Alt', 'Space', 'Alt', '<', '∨', '>', 'Ctrl'
    ]
  },

  shift: false,
  caps: false,
  lang: 'eng',
  alt: false
};*/

let div1 = document.createElement('textarea');
div1.className = 'div_one';
document.body.appendChild(div1);

let div2 = document.createElement('div');
div2.className = 'keyboard';
document.body.appendChild(div2);


  function init() {
    let str = '';
    for (let i = 0; i < keys.length; i += 1) {
      if (i === 15) {
        str += '<div class = "clearfix"></div>';
      }
      str += '<div class="keyboard_keys">' + String(keys[i]) + '</div>';
      
    }
  
    document.querySelector('.keyboard').innerHTML = str;
  }
  init();

  document.onkeypress = function (event) {
    console.log(event.code);
    console.log(event.keyCode);
    document.querySelectorAll('.keyboard .keyboard_keys').forEach(function (element) {
      element.classList.remove('active');
    });
    document.querySelector('.keyboard .keyboard_keys[data = "' + event.keyCode +'"]').classList.add('active');
  }
  
  document.querySelectorAll('.keyboard .keyboard_keys').forEach(function (element) {
    element.onclick = function (event) {
      document.querySelectorAll('.keyboard .keyboard_keys').forEach(function(element) {
        element.classList.remove('active');
      });
      let code = this.getAttribute('data');
      this.classList.add('active');
      console.log(code);
    }
  }); 
  