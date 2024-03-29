window.__tampermonkeyscript_run = () => {
    // business type
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
        }
    }

    // address type
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
    }

    function updateMapLink() {
        resultsType1();
        resultsType2();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateMapLink);
        return;
    }

    updateMapLink();
};
