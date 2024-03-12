// ==UserScript==
// @name         Google Search Map Link
// @namespace    http://tampermonkey.net/
// @version      2024-03-08
// @description  Add missing link to map thumbnail element in Google Search. F*ck EU!
// @match        *https://www.google.com/search?q*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @require      https://raw.githubusercontent.com/FreeWall/tampermonkey-scripts/master/src/google-search-map-link/index.js
// ==/UserScript==

// -----------------------------------------------------------------------------
// do not copy the code below if you want to have this script up to date
// -----------------------------------------------------------------------------

(function () {
    if (window.__tampermonkeyscript_loaded) {
        return;
    }

    window.__tampermonkeyscript_loaded = true;

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
        return;
    }

    updateMapLink();
})();
