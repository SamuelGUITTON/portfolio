// Gestion de l'affichage des missions
document.addEventListener('DOMContentLoaded', function() {
    const showAllButton = document.getElementById('showAllMissions');
    const showMoreContainer = document.getElementById('showMoreContainer');
    const hiddenMissions = document.querySelectorAll('.hidden-mission');
    let showMore = false;
    
    function toggleMissions(show) {
        hiddenMissions.forEach(mission => {
            if (show) {
                // Afficher avec animation
                mission.style.display = 'block';
                mission.style.animation = 'fadeIn 0.3s ease-out forwards';
            } else {
                // Cacher avec animation
                mission.style.animation = 'fadeOut 0.3s ease-out forwards';
                // Masquer après l'animation
                setTimeout(() => {
                    mission.style.display = 'none';
                    mission.style.animation = '';
                }, 300);
            }
        });
        
        // Mettre à jour le texte du bouton
        showAllButton.textContent = show ? 'Voir moins de missions' : 'Voir toutes les missions';
        
        // Faire défiler jusqu'au bouton
        setTimeout(() => {
            showMoreContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }
    
    // Gérer le clic sur le bouton
    showAllButton.addEventListener('click', function() {
        showMore = !showMore;
        toggleMissions(showMore);
    });
});
