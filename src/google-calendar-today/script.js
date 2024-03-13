(function () {
    if (window.__tampermonkeyscript_loaded) {
        return;
    }

    window.__tampermonkeyscript_loaded = true;

    const todayClass = 'F262Ye';
    const highlightColor = window.__tampermonkeyscript_options.highlightColor;

    setTimeout(tryToColorToday, 1000);

    window.navigation.addEventListener('navigate', () => {
        setTimeout(tryToColorToday, 300);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState == 'visible') {
            setTimeout(tryToColorToday, 300);
        }
    });

    window.addEventListener('focus', () => {
        setTimeout(tryToColorToday, 300);
    });

    function clearTodays() {
        const today = document.querySelector('div[data-todaycolored]');
        if (today) {
            today.style.backgroundColor = null;
        }
    }

    function tryToColorToday() {
        clearTodays();
        tryToColorTodayBySelector('h2[class~="' + todayClass + '"]');
        tryToColorTodayBySelector('h2 > div[class~="' + todayClass + '"]');
        tryToColorTodayBySelector('div[role="gridcell"][class~="' + todayClass + '"] > div');
    }

    function tryToColorTodayBySelector(selector, retry) {
        let todayElement = document.querySelector(selector)?.parentElement;
        if (!todayElement) {
            !retry && setTimeout(() => tryToColorTodayBySelector(selector, true), 300);
            return;
        }

        todayElement.style.backgroundColor = highlightColor;
        todayElement.dataset.todaycolored = true;

        if (retry) {
            return;
        }

        setTimeout(() => {
            let todayElement = document.querySelector(selector)?.parentElement;
            if (!todayElement?.hasAttribute('data-todaycolored')) {
                tryToColorTodayBySelector(selector, true);
            }
        }, 300);
    }
})();
