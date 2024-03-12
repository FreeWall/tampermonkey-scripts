// ==UserScript==
// @name         Google Calendar Today
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  try to take over the world!
// @author       FreeWall
// @match        *https://calendar.google.com/calendar/u/0/r/month/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// ==/UserScript==

(function () {
    'use strict';

    setTimeout(() => tryToColorToday(), 1000);

    window.navigation.addEventListener('navigate', (event) => {
        setTimeout(() => tryToColorToday(), 300);
    });

    document.addEventListener('visibilitychange', (event) => {
        if (document.visibilityState == 'visible') {
            setTimeout(() => tryToColorToday(), 300);
        }
    });

    window.addEventListener('focus', (event) => {
        setTimeout(() => tryToColorToday(), 300);
    });

    function clearTodays() {
        const today = document.querySelector('div[data-colored]');
        if (today) {
            today.style.backgroundColor = null;
        }
    }

    function tryToColorToday(retry) {
        let color = '#4d90fe4a';
        let today = document.querySelector('h2[class~="F262Ye"]');
        if (!today) {
            !retry && setTimeout(() => tryToColorToday(true), 300);
            return;
        }

        clearTodays();

        let todayBox = today.parentElement;
        todayBox.style.backgroundColor = color;
        todayBox.dataset.colored = true;

        if (retry) {
            return;
        }

        setTimeout(() => {
            let todayBox = document.querySelector('h2[class~="F262Ye"]')?.parentElement;
            if (todayBox.style.backgroundColor.length == 0) {
                tryToColorToday(true);
            }
        }, 300);
    }
})();
