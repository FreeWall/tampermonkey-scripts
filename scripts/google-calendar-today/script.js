window.__tampermonkeyscript_run = () => {
    const todayClass = 'F262Ye';
    const options = window.__tampermonkeyscript_options || {
        highlightColor: '#4d90fe30',
    };

    setTimeout(tryToColorToday, 500);

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

    function clearTodays(selector) {
        const today = document.querySelector('div[data-todaycolored]');
        if (today && (!selector || today.querySelector(selector))) {
            today.style.backgroundColor = null;
            delete today.dataset.todaycolored;
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

        clearTodays(selector);

        todayElement.style.backgroundColor = options.highlightColor;
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
};
