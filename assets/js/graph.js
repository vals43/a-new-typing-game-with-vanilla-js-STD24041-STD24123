if (!navigator.onLine) {
  alert("Vous êtes hors ligne. Veuillez vérifier votre connexion internet.");
}

let result = localStorage.getItem('resultat');
let elapsed = localStorage.getItem('elapsed');
let inner = document.querySelector(".inner")
let outer = document.querySelector(".outer")
let comment = document.querySelector(".comment")
let theme = localStorage.getItem('theme');


document.getElementById('replay-btn').addEventListener('click', function() {
  localStorage.removeItem('resultat');
  localStorage.removeItem('elapsed');
  window.location.href = 'game_page.html';
});

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

function goGame() {
  localStorage.removeItem('elapsed')
  window.location.href = 'game_page.html'
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


if (Math.floor(wpm) > 60 && accuracy > 80) {
  comment.innerText = "You're a typing legend! Your accuracy is top-notch!"
} else if (Math.floor(wpm) > 60 && accuracy <= 80) {
  comment.innerText = "You're fast, but you can improve your accuracy. Keep it up!"
} else if (Math.floor(wpm) >= 40 && Math.floor(wpm) <= 60 && accuracy > 70) {
  comment.innerText = "You're doing great! Your speed and accuracy are improving!"
} else if (Math.floor(wpm) >= 40 && Math.floor(wpm) <= 60 && accuracy <= 70) {
  comment.innerText = "Good job! You’re on the right track, keep working on accuracy!"
} else if (Math.floor(wpm) < 40 && accuracy > 60) {
  comment.innerText = "You're getting better! Keep pushing the speed while maintaining your accuracy!"
} else {
  comment.innerText = "Every expert starts somewhere. Keep practicing, you're making progress!"
}



const time = document.querySelector(".time")
let timer = localStorage.getItem('timer');

if (elapsed) {
  if (elapsed <= 59) {
    time.innerText = `00 : ${elapsed} for ${(arrayResultant.length) - 1} Words`
  }
  if (elapsed == 60) {
    time.innerText = `01 : 00 for ${(arrayResultant.length) - 1} Words`
  }
  if (elapsed == 90) {
    time.innerText = `01 : 30 for ${(arrayResultant.length) - 1} Words`
  }
  if (elapsed == 120) {
    time.innerText = `02 : 00 for ${(arrayResultant.length) - 1} Words`
  }
} else {
  time.innerHTML = `${timer}' for ${(arrayResultant.length) - 1} Words`
}

outer.style.background = `conic-gradient(from 0deg, red 0%, blue ${(accuracy * 360) / 100}deg, beige 0deg)`;

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  let root = document.querySelector(':root');
  var data = google.visualization.arrayToDataTable(changeStrToNumber(arrayResultant));
  let primary = getComputedStyle(root).getPropertyValue('--primary');
  let secondary = getComputedStyle(root).getPropertyValue('--secondary');

  var options = {
    title: 'Result',
    curveType: 'function',
    legend: { position: 'bottom' },
    colors: ['blue', 'red'],
    lineWidth: 3,
    pointSize: 5,
    chartArea: {
      width: '70%',
      height: '60%'
    },
    vAxis: { 
      title: 'WPM',
      textStyle: { color: secondary } 
    },
    backgroundColor: primary,
    legendTextStyle: { color: secondary },
    titleTextStyle: { color: secondary },
    hAxis: {
      gridlines: { color: primary },
      textStyle: { color: secondary } 
    },
    vAxis: {
      gridlines: { color: primary },
      textStyle: { color: secondary } 
    },
    series: {
      0: { targetAxisIndex: 0 },
      1: { targetAxisIndex: 1 }
    },
    vAxes: {
      0: { title: 'Words per Minute (WPM)', minValue: 0, color: secondary },
      1: { title: 'Accuracy (%)', ticks: [0, 20, 40, 60, 80, 100, 120], minValue: 0 }
    },
    fontName: 'Quicksand',
  };


  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  
  chart.draw(data, options);

  google.visualization.events.addListener(chart, 'ready', function () {
    window.addEventListener('resize', function () {
      chart.draw(data, options);
    });
  });
}
