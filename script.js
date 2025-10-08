// Gestion du menu hamburger
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (hamburger && navLinks) {
        // Fonction pour basculer le menu
        function toggleMenu() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        }

        // Événement de clic sur le bouton hamburger
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Fermer le menu en cliquant en dehors
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.hamburger')) {
                toggleMenu();
            }
        });

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Uniquement sur mobile
                    toggleMenu();
                }
            });
        });
    }
    // Sélectionner toutes les cartes de mission
    const missionCards = Array.from(document.querySelectorAll('.mission-card'));
    const VISIBLE_CARDS = 2; // Nombre de cartes visibles par défaut
    
    // Trier les fiches par année (du plus récent au plus ancien)
    missionCards.sort((a, b) => {
        return parseInt(b.dataset.year) - parseInt(a.dataset.year);
    });
    
    // Déclarer les variables des boutons en dehors de la fonction pour qu'elles soient accessibles partout
    const showAllButton = document.getElementById('showAllMissions');
    let showLessButton = document.getElementById('showLessMissions');

    // Fonction pour afficher/masquer les cartes
    function updateCardsVisibility(showAll = false) {
        missionCards.forEach((card, index) => {
            if (showAll || index < VISIBLE_CARDS) {
                card.style.display = 'block';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
        
        // Mettre à jour les boutons
        if (showAllButton && showLessButton) {
            showAllButton.style.display = showAll ? 'none' : 'inline-block';
            showLessButton.style.display = showAll ? 'inline-block' : 'none';
        }
    }
    
    // Initialiser l'affichage des cartes
    updateCardsVisibility(false);
    
    // Créer le bouton "Voir moins" s'il n'existe pas
    if (!showLessButton && showAllButton) {
        const buttonContainer = showAllButton.parentElement;
        showLessButton = document.createElement('button');
        showLessButton.id = 'showLessMissions';
        showLessButton.className = 'btn btn-outline';
        showLessButton.textContent = 'Voir moins';
        showLessButton.style.display = 'none';
        showLessButton.style.marginLeft = '15px';
        buttonContainer.appendChild(showLessButton);
        
        // Gestion du clic sur "Voir toutes les missions"
        showAllButton.addEventListener('click', function(e) {
            e.preventDefault();
            updateCardsVisibility(true);
            // Faire défiler doucement vers le bas pour voir les nouvelles cartes
            setTimeout(() => {
                showAllButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        });
        
        // Gestion du clic sur "Voir moins"
        showLessButton.addEventListener('click', function(e) {
            e.preventDefault();
            updateCardsVisibility(false);
            // Faire défiler vers le haut pour voir les premières cartes
            window.scrollTo({
                top: document.querySelector('.projects').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }
});

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Animation du menu hamburger
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animation des liens
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Fermer le menu mobile lors du clic sur un lien
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        links.forEach(link => {
            link.style.animation = '';
        });
    });
});

// La barre de navigation conserve son apparence par défaut lors du défilement

// Animation au défilement
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('fade-in');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(fadeElement => {
    appearOnScroll.observe(fadeElement);
});

// Données des projets (à personnaliser)
const projects = [
    {
        title: "Projet 1",
        description: "Description du projet 1",
        image: "https://via.placeholder.com/400x300",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Projet 2",
        description: "Description du projet 2",
        image: "https://via.placeholder.com/400x300",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        title: "Projet 3",
        description: "Description du projet 3",
        image: "https://via.placeholder.com/400x300",
        tags: ["Python", "Machine Learning", "Data Science"],
        link: "#"
    }
];

// Génération dynamique des projets
const projectsGrid = document.querySelector('.projects-grid');

if (projectsGrid) {
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card fade-in';
        
        const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        projectCard.innerHTML = `
            <div class="project-img" style="background-image: url('${project.image}')"></div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
                <a href="${project.link}" class="btn" target="_blank">Voir le projet</a>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Ici, vous pourriez ajouter la logique pour envoyer l'email
        // Par exemple, en utilisant un service comme Formspree, EmailJS, ou une API personnalisée
        
        // Pour l'instant, on affiche simplement un message de confirmation
        alert(`Merci ${name} ! Votre message a été envoyé. Je vous répondrai dès que possible à l'adresse ${email}.`);
        
        // Réinitialisation du formulaire
        contactForm.reset();
    });
}

// Animation du défilement fluide pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation de la section compétences
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

skillCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
});

// Gestion du téléchargement du CV
document.querySelector('.cv-download a').addEventListener('click', function(e) {
    // Ici, vous pourriez ajouter un suivi d'événement (Google Analytics, etc.)
    console.log('Téléchargement du CV');
    // Le téléchargement se fera automatiquement grâce à l'attribut download
});

// Animation du titre de la section héro
const heroTitle = document.querySelector('.hero h1');
const heroTagline = document.querySelector('.hero .tagline');

if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 500);
}

if (heroTagline) {
    heroTagline.style.opacity = '0';
    heroTagline.style.transform = 'translateY(20px)';
    heroTagline.style.transition = 'opacity 1s ease 0.3s, transform 1s ease 0.3s';
    
    setTimeout(() => {
        heroTagline.style.opacity = '1';
        heroTagline.style.transform = 'translateY(0)';
    }, 800);
}

// Fonction pour gérer le téléchargement du CV
function setupCVDownload() {
    const cvLink = document.querySelector('a[download]');
    if (cvLink) {
        cvLink.addEventListener('click', function(e) {
            // Si le fichier est chargé en local ou si le navigateur ne supporte pas l'attribut download
            if (window.location.protocol === 'file:' || !this.download) {
                e.preventDefault();
                const link = document.createElement('a');
                link.href = 'CV Samuel GUITTON 2025-26.pdf';
                link.download = 'CV Samuel GUITTON 2025-26.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    loadSkills();
    setupContactForm();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupCVDownload();
    document.body.style.opacity = '1';
});
