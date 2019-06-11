
/* global Log, Module, moment, config */
/* Magic Mirror
 * Module: Kitchen timers
 *
 * By Tom Short
 * MIT Licensed.
 */
Module.register("MMM-KitchenTimer",{
    // Module config defaults.
    defaults: {
        timertext: [],
        timersecs: [],
		currentTimer: 90,
    },
    // Define required scripts.
    getScripts: function() {
        return [];
    },
    // Define styles.
    getStyles: function() {
        return ["MMM-KitchenTimer.css"];
    },
    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
		this.startTimer = false;
		this.actualTimeLeft = this.config.currentTimer;
        // Schedule update.
		/*
        setTimeout(function() {
            self.updateDom();
        }, 1000);*/
    },
	notificationReceived: function(notification, payload, sender) {
		Log.info(this.name + " - received notification: " + notification);
		if(notification === "TIMER_MORE"){
			this.startTimer = true;
			this.actualTimeLeft = this.actualTimeLeft+30;
			this.updateDom(100);
		}
		if(notification === "TIMER_LESS"){
			this.startTimer = true;
			this.actualTimeLeft = this.actualTimeLeft-30;
			this.updateDom(100);
		}
		if(notification === "TIMER_STOP"){
			this.startTimer = false;
			this.actualTimeLeft = 0;
			this.updateDom(100);
		}
	},
    // Override dom generator.
    getDom: function() {
        var time = 0, startTime, interval, alarm;
        function start() {
            if (!interval) {
                startTime = Date.now();
                interval = setInterval(update, 1000);
            }
            display();
        }
        function pause() {
            if (interval) {
		        timerText.className = "timer_paused";
                sound.pause();
                clearInterval(interval);
                interval = null;
            }
        }
        function update() {
            time -= delta();
            display();
        }
        function addSeconds(value) {
            time += value;
        }
        function delta() {
            var now = Date.now(),
                d = now - startTime;
            startTime = now;
            return d / 1000;
        }
        function stop() {
            //beep.play();
            pause();
            time = 0;
            display();
        }       
        function pad(val) {
            var str = "00";
            return str.substring(0, str.length - String(val).length) + val;
        } 
        function display() {
            var secs = Math.round(Math.abs(time % 60));
            var mins = Math.abs(Math.trunc(time / 60) % 60);
            var hours = Math.abs(Math.trunc(time / 3600));
            var sign = Math.sign(time); 
            if (time > 0) {
                timerText.className = "timer_positive";
                sound.pause();
            } else if (time < 0) {
		        timerText.className = "timer_negative";
				this.actualTimeLeft = this.config.currentTimer;
                //sound.play();
				pause();
            } else {
		        timerText.className = "timer_zero";
                sound.pause();
            }
            timerText.innerHTML = 
                (time < 0 ? "-" : "") + 
                (hours > 0 ? hours+":" : "") +
                pad(mins,2) + ":" + pad(secs,2);
        }
        var timerText = document.createElement("span");
        var wrapper = document.createElement("div");
		
        // Create buttons
        for (var i=0; i<this.config.timertext.length; i++) {
            var el =  document.createElement("button");
            el.innerHTML = this.config.timertext[i];
            el.counter = i;
            var self = this;
            el.addEventListener("click", function(event) {
                //beep.play();
                addSeconds(self.config.timersecs[this.counter]);
                start();
            }); 
            wrapper.appendChild(el);
        }; 
        wrapper.appendChild(timerText);
        const sound = document.createElement('audio');
        sound.src = this.file("alarm.wav");
        sound.setAttribute('autoplay', true);
        sound.setAttribute('loop', true);
        sound.pause();
        const beep = document.createElement('audio');
        beep.src = this.file("beep.wav");
        beep.volume = 0.2;
        beep.pause();
        wrapper.appendChild(sound);
        display();
        timerText.addEventListener("click", function(event) {
            if (interval) {
                //beep.play();
                pause();
            } else if (time != 0) {
                //beep.play();
                start();
            }
        });
        var stopButton = document.createElement("button");
        stopButton.innerHTML = "X";
        stopButton.addEventListener("click", stop);
        //wrapper.appendChild(stopButton);
		if (this.startTimer)
		{
			this.startTimer = false;
			time = this.actualTimeLeft;
			start();
		}
		else
		{
			time = this.config.currentTimer;
			this.actualTimeLeft = this.config.currentTimer;
			pause();
		}
        return wrapper;
    }
});
