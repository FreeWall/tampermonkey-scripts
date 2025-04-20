window.__tampermonkeyscript_run = () => {
    document.addEventListener('keydown', (event) => {
        const activeElement = document.activeElement;
        if (activeElement.id === 'movie_player') {
            return;
        }

        let keyCode = event.which;
        if (keyCode != 38 && keyCode != 40) {
            return;
        }

        if (document.documentElement.scrollTop > 200) {
            return;
        }

        const videoElement = document.getElementById('movie_player');
        if (!videoElement) {
            return;
        }

        const cloneEvent = new Event(event.type);
        for (var k in event) {
            if (!(k in cloneEvent)) {
                cloneEvent[k] = event[k];
            }
        }

        cloneEvent.originalEvent = event;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        videoElement.dispatchEvent(cloneEvent);
    });
};
