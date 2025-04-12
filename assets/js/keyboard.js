
const keyboardLayout = [
  'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
  'W', 'X', 'C', 'V', 'B', 'N', '←', 'ESPACE'
];

let Index = 0
const keyboard = document.getElementById('keyboard');
const textInput = document.getElementById('input-field');
let lastIndex = ''




keyboardLayout.forEach(key => {
  const keyButton = document.createElement('button');
  keyButton.textContent = key;
  keyButton.classList.add('key');
  keyButton.classList.add(key);




  textInput.addEventListener("input", () => {
    lastIndex = textInput.value[textInput.value.length - 1].toUpperCase()
    if (keyButton.textContent == lastIndex) {

      keyButton.style.background = '#888787'
      setInterval(() => {
        keyButton.style.background = '#eee'
      }, 300);
    }
  });

  // keyButton.style.background = 'grey'
  if (key === '←' || key === 'ESPACE') {
    keyButton.classList.add('special');
  }



  keyButton.addEventListener('click', () => {

    if (key === '←') {
      textInput.value = textInput.value.slice(0, -1);
    } else if (key === 'ESPACE') {
      textInput.value += ' ';
    } else {
      textInput.value += key.toLowerCase();
    }
  });

  keyboard.appendChild(keyButton);
});