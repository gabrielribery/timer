let intervalId;
let timerRunning = false;
let popoutWindow;
let audio;
let totalTime;

function startTimer() {
  if (!timerRunning) {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    totalTime = hours * 3600 + minutes * 60 + seconds;

    if (totalTime > 0) {
      intervalId = setInterval(() => {
        const hoursLeft = Math.floor(totalTime / 3600);
        const minutesLeft = Math.floor((totalTime % 3600) / 60);
        const secondsLeft = totalTime % 60;

        document.getElementById('timer').textContent = `${formatTime(hoursLeft)}:${formatTime(
          minutesLeft
        )}:${formatTime(secondsLeft)}`;

        totalTime--;

        if (totalTime < 0) {
          clearInterval(intervalId);
          timerRunning = false;
          playSound();
          openPopoutWindow();
        }
      }, 1000);

      timerRunning = true;
      document.getElementById('stopButton').textContent = 'Pause';
    }
  }
}

function stopTimer() {
  if (timerRunning) {
    clearInterval(intervalId);
    timerRunning = false;
    document.getElementById('stopButton').textContent = 'Resume';
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(intervalId);
  timerRunning = false;
  document.getElementById('hours').value = '';
  document.getElementById('minutes').value = '';
  document.getElementById('seconds').value = '';
  document.getElementById('timer').textContent = '00:00:00';
  document.getElementById('stopButton').textContent = 'Stop';
  clearLaps();
}

function lapTimer() {
  const lapTime = document.getElementById('timer').textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  document.getElementById('laps').appendChild(lapItem);
}

function openPopoutWindow() {
  const width = 300;
  const height = 250;
  const left = window.screenX || window.screenLeft || 0;
  const top = window.screenY || window.screenTop || 0;

  popoutWindow = window.open('', 'Countdown Popout', `width=${width}, height=${height}, left=${left}, top=${top}, resizable=yes`);
  popoutWindow.document.title = 'Countdown Popout';

  const timerValue = document.getElementById('timer').textContent;
  const popoutContent = `
    <html>
    <head>
      <title>Countdown</title>
      <style>
        body {
          margin: 0;
          padding: 10px;
          font-size: 18px;
          text-align: center;
          background-image: url('rick.gif');
          background-repeat: repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF0000;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div id="main">
      <div id="popoutTimer">${timerValue}</div>
      <button onclick="stopAudioInPopout();">OK</button>
      <script>
        function stopAudioInPopout() {
          if (window.opener && window.opener.stopAudio) {
            window.opener.stopAudio();
          }
          window.close();
        }
      </script>
    </body>
    </html>
  `;

  popoutWindow.document.write(popoutContent);
  popoutWindow.document.close();
  popoutWindow.focus();
}

function stopAudio() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function playSound() {
  audio = new Audio('rickroll.mp3');
  audio.play();
}
