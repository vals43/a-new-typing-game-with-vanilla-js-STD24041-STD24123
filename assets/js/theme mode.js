// Get the root element
let root = document.querySelector(':root');
let theme = document.getElementById("theme")

function myFunction_get() {
  let rootStyle = getComputedStyle(root);
  console.log("The value of --primary is: " + rootStyle.getPropertyValue('--primary'));
  console.log("The value of --secondary is: " + rootStyle.getPropertyValue('--secondary'));
}
theme.addEventListener('change' , () => {
  if (theme.value == 1) {
    function myFunction_set() {
      root.style.setProperty('--primary', 'white');
      root.style.setProperty('--secondary', 'black');
    }
    myFunction_set()
  }
  if (theme.value == 2) {
    function myFunction_set() {
      root.style.setProperty('--primary', 'black');
      root.style.setProperty('--secondary', 'white');
    }
    myFunction_set()
  }
  if (theme.value == 3) {
    function myFunction_set() {
      root.style.setProperty('--primary', '#2E2F5B');
      root.style.setProperty('--secondary', '#FAF0CA');
    }
    myFunction_set()
  }
  if (theme.value == 4) {
    function myFunction_set() {
      root.style.setProperty('--primary', '#004581');
      root.style.setProperty('--secondary', '#DDE8F0');
    }
    myFunction_set()
  }
  if (theme.value == 5) {
    function myFunction_set() {
      root.style.setProperty('--primary', '#915A3C');
      root.style.setProperty('--secondary', '#E8E6E7');
    }
    myFunction_set()
  }

})

myFunction_set()
myFunction_get()