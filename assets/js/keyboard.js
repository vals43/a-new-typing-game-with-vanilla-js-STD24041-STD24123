
const keyboardLayout = [
    'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
    'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
    'W', 'X', 'C', 'V', 'B', 'N', '←', 'ESPACE'
  ];

  const keyboard = document.getElementById('keyboard');
  const textInput = document.getElementById('textInput');

  keyboardLayout.forEach(key => {
    const keyButton = document.createElement('button');
    keyButton.textContent = key;
    keyButton.classList.add('key');

    if (key === '←' || key === 'ESPACE') {
      keyButton.classList.add('special');
    }

    keyButton.addEventListener('click', () => {
      if (key === '←') {
        textInput.value = textInput.value.slice(0, -1);
      } else if (key === 'ESPACE') {
        textInput.value += ' ';
      } else {
        textInput.value += key;
      }
    });

    keyboard.appendChild(keyButton);
  });