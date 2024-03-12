// ==UserScript==
// @name         Google Calendar Today
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  Highlight today box in Google Calendar
// @match        *https://calendar.google.com/calendar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://raw.githubusercontent.com/FreeWall/tampermonkey-scripts/master/src/google-calendar-today/index.js
// ==/UserScript==

window.__tampermonkeyscript_options = window.__tampermonkeyscript_options || {
    highlightColor: '#4d90fe30', // customizable
};

// -----------------------------------------------------------------------------
// do not copy the code below if you want to have this script up to date
// -----------------------------------------------------------------------------

(function () {
    if (window.__tampermonkeyscript_loaded) {
        return;
    }

    window.__tampermonkeyscript_loaded = true;

    const todayClass = 'F262Ye';
    const highlightColor = window.__tampermonkeyscript_options.highlightColor;

    setTimeout(() => tryToColorToday(), 1000);

    window.navigation.addEventListener('navigate', () => {
        setTimeout(() => tryToColorToday(), 300);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == 'visible') {
            setTimeout(() => tryToColorToday(), 300);
        }
    });

    window.addEventListener('focus', () => {
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
        todayBox.style.backgroundColor = highlightColor;
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
        todayBox.style.backgroundColor = highlightColor;
        todayBox.dataset.todaycolored = true;

        let todayGrid = document.querySelector('div[role="gridcell"][class~="' + todayClass + '"]');
        if (!todayGrid) {
            !retry && setTimeout(() => tryToColorToday_WeekView(true), 300);
            return;
        }

        todayGrid.style.backgroundColor = highlightColor;
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
