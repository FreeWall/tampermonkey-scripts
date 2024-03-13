// ==UserScript==
// @name         Google Calendar Today
// @namespace    http://tampermonkey.net/
// @version      2024-02-21
// @description  Highlight today box in Google Calendar
// @match        *https://calendar.google.com/calendar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://raw.githubusercontent.com/FreeWall/tampermonkey-scripts/master/src/google-calendar-today/script.js
// ==/UserScript==

window.__tampermonkeyscript_options = window.__tampermonkeyscript_options || {
    highlightColor: '#4d90fe30', // customizable
};

window.__tampermonkeyscript_run();
