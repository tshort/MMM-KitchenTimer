# KitchenTimer
This is a module for [MagicMirror](https://magicmirror.builders/).

![pic](https://github.com/tshort/MMM-KitchenTimer/blob/master/timer.png)

It provides a touch-based, countdown timer. The buttons on the left add time to the timer (and start the timer if it's not started). The 'x' button resets the timer. Press the time to pause or restart the timer.

## Using the module

Clone the repo into your modules directory as:

```
git clone https://github.com/tshort/MMM-KitchenTimer.git kitchen-timers	
```

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

````javascript
modules: [
    {
        module: "MMM-KitchenTimer",
        position: "top_left",
        config: {
            timertext: ["30s", "2m", "10m"],
            timersecs: [30, 120, 600],
        }
    },
]
````

## Configuration options

The following properties can be configured:

| Option            | Description
| ----------------- | -----------
| `timertext`       | An array giving the text in buttons.
| `timersecs`       | An array with the number of seconds to add for the given button.
