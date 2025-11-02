// Script pour empêcher tout défilement automatique
(function() {
    // 1. Empêcher la restauration du défilement par le navigateur
    if (window.history && window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }

    // 2. Forcer le défilement en haut immédiatement
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Désactiver les animations de défilement
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    // 4. Supprimer le hash de l'URL sans faire défiler
    if (window.location.hash) {
        history.replaceState('', document.title, window.location.pathname + window.location.search);
    }

    // 5. Intercepter uniquement le défilement initial
    let initialLoad = true;
    const handleInitialScroll = function() {
        if (initialLoad) {
            window.scrollTo(0, 0);
            initialLoad = false;
            // Supprimer l'écouteur après le premier défilement forcé
            window.removeEventListener('scroll', handleInitialScroll);
        }
    };
    window.addEventListener('scroll', handleInitialScroll, { passive: false });

    // 6. Forcer à nouveau le défilement après un court délai
    setTimeout(function() {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, 10);

    // 7. Au chargement complet de la page
    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 100);
    });
})();
