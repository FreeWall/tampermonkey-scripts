window.__tampermonkeyscript_run = () => {
    // do not run in iframe
    if (window.self !== window.top) {
        return;
    }

    /**
     * Expand the history section on first load
     */
    let historyExpanded = false;
    function expandHistory() {
        if (historyExpanded) {
            return;
        }

        const button = document.querySelector('[data-test-id="show-more-button"]');
        if (!button) {
            return;
        }

        historyExpanded = true;
        button.click();
        button.remove();
    }

    /**
     * Do not collapse the side nav
     */
    let sideNavObserved = false;
    function observeSideNav() {
        if (sideNavObserved) {
            return;
        }

        const sidenav = document.querySelector('.sidenav-with-history-container');
        if (!sidenav) {
            return;
        }

        sideNavObserved = true;

        const observer = new MutationObserver((mutationsList, observer) => {
            let isCollapsed = false;
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (sidenav.className.includes('collapsed')) {
                        isCollapsed = true;
                    }
                }
            }

            if (isCollapsed) {
                const sideNavButton = document.querySelector('[data-test-id="side-nav-menu-button"]');
                if (!sideNavButton) {
                    return;
                }

                sideNavButton.click();
            }
        });

        observer.observe(sidenav, { attributes: true, attributeOldValue: true });
    }

    function getActiveConversationItem() {
        const items = document.querySelectorAll('.conversation-items-container');
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const link = item.querySelector('.conversation');
            if (link && link.classList?.contains('selected')) {
                return item;
            }
        }
    }

    /**
     * Open the delete conversation modal on delete key press
     */
    function openDeleteConversationModal() {
        const item = getActiveConversationItem();
        if (!item) {
            return;
        }

        const actionsElement = item.querySelector('.conversation-actions-container button');
        if (!actionsElement) {
            return;
        }

        actionsElement.click();

        setTimeout(() => {
            const deleteButton = document.querySelector('[data-test-id="delete-button"]');
            deleteButton.click();

            setTimeout(() => {
                const confirmButton = document.querySelector('mat-dialog-container [data-test-id="confirm-button"]');
                if (!confirmButton) {
                    return;
                }

                confirmButton.focus();
            }, 10);
        }, 10);
    }

    const appRoot = document.getElementById('app-root');
    if (!appRoot) {
        return;
    }

    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                expandHistory();
                observeSideNav();
            }
        }
    });

    observer.observe(appRoot, { childList: true, subtree: true });

    document.addEventListener('keyup', (event) => {
        if (event.which != 46) {
            return;
        }

        if (document.activeElement.tagName === 'INPUT') {
            return;
        }

        if (document.activeElement.classList.contains('new-input-ui') && document.activeElement.textContent !== '') {
            return;
        }

        if (document.querySelector('mat-dialog-container')) {
            return;
        }

        openDeleteConversationModal();
    });
};
