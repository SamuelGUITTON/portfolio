// Configuration de la lightbox
lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'showImageNumberLabel': false,
    'alwaysShowNavOnTouchDevices': true,
    'disableScrolling': true,
    'fadeDuration': 200,
    'imageFadeDuration': 200,
    'fitImagesInViewport': true
});

// Script pour le bouton "Voir toutes les missions"
document.addEventListener('DOMContentLoaded', function() {
    const showAllBtn = document.getElementById('showAllMissions');
    const hiddenMissions = document.querySelectorAll('.mission-card[style*="display: none"]');
    
    if (showAllBtn && hiddenMissions.length > 0) {
        showAllBtn.addEventListener('click', function() {
            hiddenMissions.forEach(mission => {
                mission.style.display = 'block';
            });
            this.style.display = 'none';
        });
    } else if (showAllBtn) {
        showAllBtn.style.display = 'none';
    }

    // Ajouter data-lightbox à toutes les images dans les fiches mission
    const missionImages = document.querySelectorAll('.mission-card img');
    missionImages.forEach(img => {
        // Créer un lien parent pour la lightbox si ce n'est pas déjà fait
        if (!img.parentElement.hasAttribute('data-lightbox')) {
            const link = document.createElement('a');
            link.href = img.src;
            link.setAttribute('data-lightbox', 'mission-gallery');
            link.setAttribute('data-title', img.alt || 'Image de la mission');
            
            // Remplacer l'image par le lien contenant l'image
            img.parentNode.insertBefore(link, img);
            link.appendChild(img);
        }
    });
});
