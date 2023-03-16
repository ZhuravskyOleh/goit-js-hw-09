const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtn.addEventListener('click', changeBgColor);

let timerId;

function changeBgColor() {
    startBtn.setAttribute('disabled', 'true');
   
   timerId = setInterval(() => {
        let bgColor = getRandomHexColor();
        bodyEl.style.backgroundColor = bgColor;;
      }, 1000);
}

stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled', 'true');
  });

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

