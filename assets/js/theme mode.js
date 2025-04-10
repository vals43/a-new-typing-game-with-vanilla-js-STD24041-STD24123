// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme")

function myFunction_get() {
  let rootStyle = getComputedStyle(root);
  console.log("The value of --primary is: " + rootStyle.getPropertyValue('--primary'));
  console.log("The value of --secondary is: " + rootStyle.getPropertyValue('--secondary'));
}
function myFunction_set(primary, secondary) {
  root.style.setProperty('--primary', primary);
  root.style.setProperty('--secondary', secondary);
}
theme.addEventListener('change' , () => {
  if (theme.value == 1) {
    myFunction_set('white', 'black')
  }
  if (theme.value == 2) {
    myFunction_set('black', 'white')
  }
  if (theme.value == 3) {
    myFunction_set('#2E2F5B', '#FAF0CA')
  }
  if (theme.value == 4) {
    myFunction_set('#004581', '#DDE8F0')
  }
  if (theme.value == 5) {
    myFunction_set('#915A3C', '#E8E6E7')
  }

})

myFunction_set()
myFunction_get()