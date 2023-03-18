import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
      if (selectedDate < currentDate) {
        Notiflix.Notify.info('Please choose a date in the future')
        return;
    }
    const startBtn = document.querySelector("[data-start]");
    startBtn.disabled = false;
  },
};

flatpickr("#datetime-picker", options);

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  const selectedDate = new Date(document.getElementById("datetime-picker").value);
  const updateTimer = () => {
    const currentTime = new Date();
    const remainingTime = selectedDate - currentTime;
    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      startBtn.disabled = false;
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    daysValue.textContent = days.toString().padStart(2, '0');
    hoursValue.textContent = hours.toString().padStart(2, '0');
    minutesValue.textContent = minutes.toString().padStart(2, '0');
    secondsValue.textContent = seconds.toString().padStart(2, '0');
  };
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
});

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
