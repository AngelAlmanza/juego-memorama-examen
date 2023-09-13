export default class Clock {
  constructor (time, container) {
    this.time = time;
    this.container = container;
    this.pause = false;
  }

  static minutesToMiliseconds (minutes) {
    return minutes * 60000;
  }

  showTime () {
    this.intervalId = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.intervalId);
        return;
      }
      if (this.pause) {
        return;
      }
      this.time -= 1000;
      this.container.innerText = `Tiempo: ${this.formatTime(this.time)}`;
    }, 1000);
  }

  formatTime (miliseconds) {
    const totalSeconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}