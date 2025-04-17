// Sélectionne les éléments
const sidebar = document.querySelector('.sidebar');
const selects = document.querySelector('.select');

// Boutons pour afficher/cacher
const toggleSidebarBtn = document.querySelector('#toggle-sidebar');
const toggleSelectsBtn = document.querySelector('#toggle-selects');

// Ajouter un écouteur d'événements pour le bouton du sidebar
toggleSidebarBtn.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// Ajouter un écouteur d'événements pour le bouton des selects
toggleSelectsBtn.addEventListener('click', () => {
    selects.classList.toggle('show');
});
