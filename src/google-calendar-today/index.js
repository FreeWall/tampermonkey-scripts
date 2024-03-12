// ==UserScript==
// @name         Google Calendar Today
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  Highlight today box in Google Calendar
// @author       FreeWall
// @match        *https://calendar.google.com/calendar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://raw.githubusercontent.com/FreeWall/tampermonkey-scripts/master/src/google-calendar-today/index.js
// ==/UserScript==

console.log('loaded 1');

(function () {
    'use strict';

    if (window.scriptLoaded) {
        console.log('already loaded');
        return;
    }

    window.scriptLoaded = true;

    console.log('loaded 2');

    var todayClass = 'F262Ye';
    var highlightBackgroundColor = '#4d90fe30';

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
        let today = document.querySelector('h2[class~="' + todayClass + '"]');
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
            let todayBox = document.querySelector('h2[class~="' + todayClass + '"]')?.parentElement;
            if (todayBox.style.backgroundColor.length == 0) {
                tryToColorToday_MonthView(true);
            }
        }, 300);
    }

    function tryToColorToday_WeekView(retry) {
        let todayTitle = document.querySelector('h2 > div[class~="' + todayClass + '"]');
        if (!todayTitle) {
            !retry && setTimeout(() => tryToColorToday_WeekView(true), 300);
            return;
        }

        clearTodays();

        let todayBox = todayTitle.parentElement;
        todayBox.style.backgroundColor = highlightBackgroundColor;
        todayBox.dataset.todaycolored = true;

        let todayGrid = document.querySelector('div[role="gridcell"][class~="' + todayClass + '"]');
        if (!todayGrid) {
            !retry && setTimeout(() => tryToColorToday_WeekView(true), 300);
            return;
        }

        todayGrid.style.backgroundColor = highlightBackgroundColor;
        todayGrid.dataset.todaycolored = true;

        if (retry) {
            return;
        }

        setTimeout(() => {
            let todayBox = document.querySelector('h2 > div[class~="' + todayClass + '"]')?.parentElement;
            if (todayBox.style.backgroundColor.length == 0) {
                tryToColorToday_WeekView(true);
            }
        }, 300);
    }
})();
