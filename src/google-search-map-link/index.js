// ==UserScript==
// @name         Google Search Map Link
// @namespace    http://tampermonkey.net/
// @version      2024-03-08
// @description  Fuck EU!
// @author       FreeWall
// @match        *https://www.google.com/search?q*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// ==/UserScript==

(function () {
    'use strict';

    function updateMapLink() {
        const addressSection = document.querySelector('div[data-attrid="kc:/location/location:address"]');
        if (!addressSection) {
            return;
        }

        const mapLink = addressSection.querySelector('a[data-url]');
        if (!mapLink) {
            return;
        }

        const mapUrl = location.origin + mapLink.getAttribute('data-url');
        const luMapParentLink = document.querySelector('#lu_map').parentElement;

        if (luMapParentLink) {
            luMapParentLink.setAttribute('href', mapUrl);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateMapLink);
    } else {
        updateMapLink();
    }
})();
