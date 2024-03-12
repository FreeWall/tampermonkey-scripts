// ==UserScript==
// @name         Google Calendar Today
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  Highlight today box in Google Calendar
// @author       FreeWall
// @match        *https://calendar.google.com/calendar/u/0/r/month/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// ==/UserScript==

const highlightBackgroundColor = '#4d90fe40';

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
        const today = document.querySelector('div[data-todaycolored]');
        if (today) {
            today.style.backgroundColor = null;
        }
    }

    function tryToColorToday() {
        tryToColorToday_MonthView();
        tryToColorToday_WeekView();
    }

    function tryToColorToday_MonthView(retry) {
        let today = document.querySelector('h2[class~="F262Ye"]');
        if (!today) {
            !retry && setTimeout(() => tryToColorToday_MonthView(true), 300);
            return;
        }

        clearTodays();

        let todayBox = today.parentElement;
        todayBox.style.backgroundColor = highlightBackgroundColor;
        todayBox.dataset.todaycolored = true;

        if (retry) {
            return;
        }

        setTimeout(() => {
            let todayBox = document.querySelector('h2[class~="F262Ye"]')?.parentElement;
            if (todayBox.style.backgroundColor.length == 0) {
                tryToColorToday_MonthView(true);
            }
        }, 300);
    }

    function tryToColorToday_WeekView(retry) {
        let today = document.querySelector('h2 > div[class~="F262Ye"]');
        if (!today) {
            !retry && setTimeout(() => tryToColorToday_WeekView(true), 300);
            return;
        }

        clearTodays();

        let todayBox = today.parentElement;
        todayBox.style.backgroundColor = highlightBackgroundColor;
        todayBox.dataset.todaycolored = true;

        if (retry) {
            return;
        }

        setTimeout(() => {
            let todayBox = document.querySelector('h2 > div[class~="F262Ye"]')?.parentElement;
            if (todayBox.style.backgroundColor.length == 0) {
                tryToColorToday_WeekView(true);
            }
        }, 300);
    }
})();
