// theme dark and night
function darkLight() {
  let checkCheckbox = document.getElementById("check").checked;
  if (checkCheckbox == true) {
      const body = document.querySelector(".body")
      body.style.backgroundColor = "var(--secondary)";
      body.style.color = "var(--primary)";
  }
  if (checkCheckbox == false) {
      const body = document.querySelector(".body")
      body.style.backgroundColor = "var(--primary)";
      body.style.color = "var(--secondary)";
  }
}