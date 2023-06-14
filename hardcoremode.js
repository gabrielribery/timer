var gameInterval;
function toggleMode() {
  var style = document.getElementById('modeStyle');
  var script = document.getElementById('modeScript');
  var image = document.getElementById('modeImage');
  if (style.getAttribute('href') === 'normalmode.css') {
    style.setAttribute('href', 'hardcoremode.css');
    script.setAttribute('src', 'hardcoremode.js');
    image.setAttribute('src', 'hardcoremode.png');
    restartAnimation();
  } else {
    style.setAttribute('href', 'normalmode.css');
    script.setAttribute('src', 'normalmode.js');
    image.setAttribute('src', 'schwarz.png');
    restartAnimation();
  }
}
function restartAnimation() {
  clearInterval(gameInterval);
  canvasApp();
}
window.addEventListener("load", eventWindowLoaded, false);
function eventWindowLoaded() {
  canvasApp();
}
function canvasSupport(e) {
  return !!e.getContext;
}
function canvasApp() {
  var canvas = document.getElementById("matrix");
  if (!canvasSupport(matrix)) {
    return;
  }
  var ctx = canvas.getContext("2d");
  var w = (canvas.width = window.innerWidth);
  var h = (canvas.height = window.innerHeight);
  var yPosition = Array(300).join(0).split("");

  function runMatrix() {
    if (typeof gameInterval != "undefined") clearInterval(gameInterval);
    gameInterval = setInterval(drawScreen, 33);
  }
  function drawScreen() {
    ctx.fillStyle = "rgba(0,0,0,.06)";
    ctx.fillRect(0, 0, w, h);
    //abrufen normal
    var normalModeColor = getComputedStyle(document.documentElement).getPropertyValue('--green-color');
    //abrufen hardcore    
    var hardcoreModeColor = getComputedStyle(document.documentElement).getPropertyValue('--red-color');
    //wert ermitteln und ausgeben
    var style = document.getElementById('modeStyle');
    var mode = style.getAttribute('href') === 'hardcoremode.css' ? 'hardcore' : 'normal';
    if (mode === 'normal') {
      ctx.fillStyle = normalModeColor;
    } else if (mode === 'hardcore') {
      ctx.fillStyle = hardcoreModeColor;
    }
    ctx.font = "15px IBM Plex Sans";
    yPosition.map(function (y, index) {
      text = String.fromCharCode(1e2 + Math.random() * 33);
      x = index * 10 + 10;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 1e4) {
        yPosition[index] = 0;
      } else {
        yPosition[index] = y + 10;
      }
    });
  }
  runMatrix();
}
$(document).ready(function () {           // diese funktion habe ich in codepen gefunden und hier einfach noch modifiziert
  var $randomString = $(".str");
  var $timer = 30;
  var $it;
  var $data = 0;
  var $index;
  var $change;
  var $letters = ["b", "y", " ", "g", "a", "b", "r", "i", "e", "l"]; //wenn das modifiziert wird auch html anpassen
  $randomString.each(function () {
    $change = Math.round(Math.random() * 100);
    $(this).attr("data-change", $change);
  });
  function random() {
    return Math.round(Math.random() * 9);
  }
  function select() {
    return Math.round(Math.random() * $randomString.length + 1);
  }
  function value() {
    $(".str:nth-child(" + select() + ")").html("" + random() + "");
    $(".str:nth-child(" + select() + ")").attr("data-number", $data);
    $data++;
    $randomString.each(function () {
      if (
        parseInt($(this).attr("data-number")) >
        parseInt($(this).attr("data-change"))
      ) {
        $index = $(".ltr").index(this);
        $(this).html($letters[$index]);
        $(this).removeClass("str");
      }
    });
  }
  $it = setInterval(value, $timer);
});
