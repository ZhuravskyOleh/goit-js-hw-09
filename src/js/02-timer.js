import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

startBtn.addEventListener("click", handleTimerStart);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    const selectedDate = selectedDates;
    if (selectedDate.getTime() < Date.now()) {
      Notiflix.Notify.info("Please choose a date in the future");
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("#datetime-picker", options);

let timerId = null;
let timeLeft = null;


function handleTimerStart() {
  timerUpdate();
  if (timeLeft <= 0) {
    return;
  }
  timerId = setInterval(() => {
    timerUpdate();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      return;
    }
    updateTimerDisplay(timeLeft);
  }, 1000);
}

function timerUpdate() {
  const selectedDate =  new Date([inputEl.value]).getTime();
  timeLeft = selectedDate - Date.now();
  return timeLeft;
}

function updateTimerDisplay(timeLeft) {
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  daysValue.textContent = formatNumber(days);
  hoursValue.textContent = formatNumber(hours);
  minutesValue.textContent = formatNumber(minutes);
  secondsValue.textContent = formatNumber(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatNumber(num) {
  return num.toString().padStart(2, "0");
}



