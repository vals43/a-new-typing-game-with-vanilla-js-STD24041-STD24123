
if (!navigator.onLine) {
  // Afficher le message d'erreur
  alert("Vous êtes hors ligne. Veuillez vérifier votre connexion internet.");
}

let result = localStorage.getItem('resultat');
let inner = document.querySelector(".inner")
let outer = document.querySelector(".outer")
let theme = localStorage.getItem('theme');



function createArray(str) {
  const mots = str.split(",");
  const array = [];
  for (let i = 0; i < mots.length; i += 3) {
    const sousTableau = [];
    for (let j = 0; j < 3 && i + j < mots.length; j++) {
      sousTableau.push(mots[i + j]);
    }
    array.push(sousTableau);
  }
  return array;
}


const arrayResultant = createArray(result);
function changeStrToNumber(array) {
  let result = array
  for (let i = 1; i < array.length; i++) {
    result[i][1] = Math.floor(array[i][1])
    result[i][2] = Math.floor(array[i][2])
  }
  return result
}


let accuracy = arrayResultant[arrayResultant.length - 1][2]
let wpm = arrayResultant[arrayResultant.length - 1][1]

const WPM = document.querySelector("#wpm-value")
WPM.innerHTML = wpm
inner.innerHTML = `${accuracy}%`
//Time
const time = document.querySelector(".time")
let timer = localStorage.getItem('timer');
time.innerHTML = timer


// border of accuracy 

outer.style.background = `conic-gradient(from 0deg, red 0%, blue ${(accuracy * 360) / 100}deg, white 0deg)`;

// graph
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {  
  var data = google.visualization.arrayToDataTable(changeStrToNumber(arrayResultant));
  
  var options = {
    title: 'Result',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['blue', 'red'],
    lineWidth: 3,
    pointSize: 10,
    vAxis: { title: 'WPM' },
    hAxis: {  // x-axis
      gridlines: { color: 'FFFFFF' }
    },
    vAxis: {  // y-axis
      gridlines: { color: 'FFFFFF' },
      
    },
    series: {
      0: { targetAxisIndex: 0 }, // Series 1 on left axis
      1: { targetAxisIndex: 1 }  // Series 2 on right axis
    },
    vAxes: {
      0: { title: 'Word per Minutes (WPM)', minValue: 0 }, // Left axis title
      1: { title: 'Accuracy (%)', ticks: [0,20,40,60,80,100,120], minValue: 0 }  // Right axis title
    },
    fontName : 'Quicksand',
    
  };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

  chart.draw(data, options);
}



