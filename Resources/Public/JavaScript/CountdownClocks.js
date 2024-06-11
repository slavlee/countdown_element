import { CountdownClock } from "./CountdownClock.js";

class CountdownClocks
{
    constructor() {
        const defaultSettings = {
            selectors: {
                countdownElement: '.frame-type-countdownelement_countdownclock'
            }
        }

        if (typeof ccGlobalSettings == 'undefined') {
            this.settings = defaultSettings;
        }else {
            this.settings = {
                defaultSettings,
                ccGlobalSettings  
              };
        }

        this.countdownElements = document.querySelectorAll(this.settings.selectors.countdownElement);
        this.run();        
    }

    run() {
        this.countdownElements.forEach((element) => {
            const countdownElement = new CountdownClock(element);
            countdownElement.run();
        });
    }
}

export default new CountdownClocks();