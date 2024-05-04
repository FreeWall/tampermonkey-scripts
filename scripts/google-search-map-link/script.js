window.__tampermonkeyscript_run = () => {
    /**
     * Additional result map
     * example: Madison Square Garden, Yew York
     */
    function resultsType1() {
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
            return true;
        }
    }

    /**
     * Address map with directions button
     * example: Veletržní 24 Praha
     */
    function resultsType2() {
        const img = document.querySelector('div#lu_map');
        if (!img) {
            return;
        }

        const parent = img.closest('.dirs')?.parentElement;
        if (!parent) {
            return;
        }

        const mapLink = parent.querySelector('a[data-url]');
        if (!mapLink) {
            return;
        }

        const url = mapLink.getAttribute('data-url');
        const addressPart = url.match(/\/maps\/dir\/\/([^\/?]+)/);
        if (!addressPart) {
            return;
        }

        const mapUrl = location.origin + '/maps/place/' + addressPart[1];
        const link = document.createElement('a');
        link.setAttribute('href', mapUrl);

        img.parentNode.insertBefore(link, img);
        link.appendChild(img);

        return true;
    }

    /**
     * Non-specific address map
     * example: Veletržní Praha
     */
    function resultsType3() {
        const img = document.querySelector('div#lu_map');
        if (!img) {
            return;
        }

        const parent = img.closest('.dirs')?.parentElement;
        if (!parent) {
            return;
        }

        const place = parent.innerText?.trim().replace('\n', ',');
        const mapUrl = location.origin + '/maps/search/' + place;
        const link = document.createElement('a');
        link.setAttribute('href', mapUrl);

        img.parentNode.insertBefore(link, img);
        link.appendChild(img);

        return true;
    }

    /**
     * Additional result map without address
     * example: Václavské náměstí Praha
     */
    function resultsType4() {
        const img = document.querySelector('img#lu_map');
        if (!img) {
            return;
        }

        const parent = img.closest('.kp-header');
        if (!parent) {
            return;
        }

        const title = parent.querySelector('h2')?.parentElement;
        if (!title) {
            return;
        }

        const place = title.innerText?.trim().replace('\n', ',');
        const mapUrl = location.origin + '/maps/search/' + place;

        const luMapParentLink = img.parentElement;

        if (luMapParentLink) {
            luMapParentLink.setAttribute('href', mapUrl);
            return true;
        }

        return true;
    }

    function updateMapLink() {
        resultsType1() || resultsType2() || resultsType3() || resultsType4();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateMapLink);
        return;
    }

    updateMapLink();
};
