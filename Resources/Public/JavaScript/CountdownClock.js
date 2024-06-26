export class CountdownClock {
  constructor(countdownElement) {
    this.countdownElement = countdownElement;
  }

  run() {
    this.now = new Date();
    let clock  = this.countdownElement.firstChild.nextSibling;

    if (!clock) {
      console.error('Clock could not be found. Make sure the countdown elements uses section frames with this class: frame-type-countdownelement_countdownclock. If you want to create an github issue, then include screenshots from the debug console window too.');
      console.debug(this.countdownElement);
      console.debug(this.countdownElement.firstChild);
      return;
    }

    this.clockSettings = {
      releaseDate: new Date(clock.getAttribute("data-releasedate")),
      identifer: clock.getAttribute("data-identifier")
    }

    this.updateRemainingTime(true);

    if (this.timeHasFinished()) {
      // set all fields to zero, if time has finished
      this.resetAllElements();
    }

    var cObj = this;
    setInterval(function () {
      cObj.now = new Date();
      if (!cObj.timeHasFinished()) {
        cObj.updateRemainingTime();
      }else {
        // set all fields to zero, if time has finished
        cObj.resetAllElements();
      }
    }, 1000);
  }

  updateRemainingTime(preventAnimation) {
    if (this.timeHasChanged("days", this.getRemainingDays(true))) {
      this.updateElement("days", preventAnimation);
    }
    if (this.timeHasChanged("hours", this.getRemainingHours(true))) {
      this.updateElement("hours", preventAnimation);
    }
    if (this.timeHasChanged("minutes", this.getRemainingMinutes(true))) {
      this.updateElement("minutes", preventAnimation);
    }
    if (this.timeHasChanged("seconds", this.getRemainingSeconds(true))) {
      this.updateElement("seconds");
    }
  }

  timeHasChanged(timeId, newRemainingTime) {
    const element = document
      .getElementById(timeId + this.clockSettings.identifer)
      .getElementsByClassName("upper-back")[0]
      .getElementsByTagName("span")[0];
    const value = element.innerHTML;
    return parseInt(value) !== parseInt(newRemainingTime);
  }

  timeHasFinished() {
    // 1000ms => 1s in future to prevent next animation
    return this.clockSettings.releaseDate.getTime() - this.now.getTime() <= 1000;
  }

  updateElement(elementId, preventAnimation) {
    const secondsElement = document.getElementById(elementId + this.clockSettings.identifer);
    const clone = secondsElement.cloneNode(true);
    if (!preventAnimation) {
      clone.classList.add("time-transition");
    }

    secondsElement.after(clone);
    secondsElement.remove();

    let remainingFnResultFront = null;
    let remainingFnResultBack = null;

    switch(elementId) {
      case 'days':
        remainingFnResultFront = this.getRemainingDays();
        remainingFnResultBack = this.getRemainingDays(true);
        break;
      case 'hours':
        remainingFnResultFront = this.getRemainingHours();
        remainingFnResultBack = this.getRemainingHours(true);
        break;
      case 'minutes':
        remainingFnResultFront = this.getRemainingMinutes();
        remainingFnResultBack = this.getRemainingMinutes(true);
        break;
      case 'seconds':
        remainingFnResultFront = this.getRemainingSeconds();
        remainingFnResultBack = this.getRemainingSeconds(true);
        break;
    }

    this.updateFront(clone, remainingFnResultFront);
    this.updateBack(clone, remainingFnResultBack);
  }

  /**
   * Set all fields to 0
   */
  resetAllElements() {
    const fields = ['days', 'hours', 'minutes', 'seconds'];

    fields.forEach((id) => {
      const element = document.getElementById(id + this.clockSettings.identifer);

      if (element && !element.classList.contains('time-has-finished')) {
        element.classList.remove('time-transition');
        element.classList.add('time-has-finished')
        this.updateFront(element, 0);
        this.updateBack(element, 0);
      }
    });
  }

  getRemainingDays(_oneSecondInFuture) {
    return this.getTwoDigitTime(
      Math.floor(
        this.getDifferenceInTime(_oneSecondInFuture) / (1000 * 3600 * 24)
      )
    );
  }

  getRemainingHours(_oneSecondInFuture) {
    return this.getTwoDigitTime(
      Math.floor(
        (this.getDifferenceInTime(_oneSecondInFuture) / (1000 * 60 * 60)) % 24
      )
    );
  }

  getRemainingMinutes(_oneSecondInFuture) {
    return this.getTwoDigitTime(
      Math.floor(
        (this.getDifferenceInTime(_oneSecondInFuture) / 1000 / 60) % 60
      )
    );
  }

  getRemainingSeconds(_oneSecondInFuture) {
    return this.getTwoDigitTime(
      Math.floor((this.getDifferenceInTime(_oneSecondInFuture) / 1000) % 60)
    );
  }

  getDifferenceInTime(_oneSecondInFuture) {
    if (_oneSecondInFuture) {
      return (
        new Date(this.clockSettings.releaseDate).getTime() -
        new Date(new Date(this.now).setSeconds(this.now.getSeconds() + 1)).getTime()
      );
    }

    return new Date(this.clockSettings.releaseDate).getTime() - this.now.getTime();
  }

  getTwoDigitTime(time) {
    if (("" + time).length === 1) {
      return "0" + time;
    }
    return time;
  }

  updateFront(element, value) {
    const upper = element.getElementsByClassName("upper")[0];
    const lower = element.getElementsByClassName("lower")[0];

    upper.getElementsByTagName("span")[0].innerHTML = value;
    lower.getElementsByTagName("span")[0].innerHTML = value;
  }

  updateBack(element, value) {
    const upperBack = element.getElementsByClassName("upper-back")[0];
    const lowerBack = element.getElementsByClassName("lower-back")[0];

    upperBack.getElementsByTagName("span")[0].innerHTML = value;
    lowerBack.getElementsByTagName("span")[0].innerHTML = value;
  }
}
