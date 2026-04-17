const movies = [
    { id: 1,
     title: "Inception",
    genre: "Action",
    image: "images/image1.webp",
     description: "Un voleur qui subtilise des secrets d'entreprise à travers l'utilisation de la technologie de partage de rêves." 
    },
    { id: 2,
         title: "Home Alone", 
         genre: "Comedy", 
         image: "images/image2.webp", 
         description: "Un enfant de huit ans doit protéger sa maison contre des cambrioleurs après avoir été laissé seul par sa famille." 
        },
    { id: 3, 
        title: "The Pursuit of Happyness", 
        genre: "Drama", 
        image: "images/image3.jpg", 
        description: "Un vendeur en difficulté prend la garde de son fils alors qu'il est sur le point de commencer une carrière professionnelle changeante." 
    },
    { id: 4, 
        title: "Ready Player One", 
        genre: "Science-fiction", 
        image: "images/image4.webp", 
        description: "Dans un futur proche, les gens passent leur temps dans un univers de réalité virtuelle appelé l'OASIS." 
    },
    { id: 5, 
        title: "Mr. Bean Holiday", 
        genre: "Comedy", 
        image: "images/image5.jpg", 
        description: "Mr. Bean gagne un voyage en France et se retrouve au milieu d'une aventure imprévue vers Cannes." 
    },
    { id: 6, 
        title: "Gladiator", 
        genre: "Action", 
        image: "images/image6.jpg", 
        description: "Un ancien général romain cherche à se venger de l'empereur corrompu qui a tué sa famille." 
    },
    { id: 7, 
        title: "Yes Man", 
        genre: "Comedy", 
        image: "images/image7.webp", 
        description: "Un homme décide de dire 'oui' à absolument tout ce qu'on lui propose pendant une année entière." 
    },
    { id: 8, 
        title: "Titanic", 
        genre: "Drama", 
        image: "images/image8.jpg", 
        description: "L'histoire d'amour tragique entre deux passagers de classes sociales différentes à bord du Titanic." 
    },
    { id: 9, 
        title: "Ant-Man", 
        genre: "Science-fiction", 
        image: "images/image9.jpg", 
        description: "Un cambrioleur acquiert la capacité de réduire sa taille tout en augmentant sa force." 
    },
    { id: 10, 
        title: "Love and Monsters", 
        genre: "Science-fiction", 
        image: "images/image10.webp", 
        description: "Sept ans après l'apocalypse des monstres, un jeune homme quitte son bunker pour retrouver son ex." 
    },
    { id: 11, 
        title: "Fight Club", 
        genre: "Drama", 
        image: "images/image11.webp", 
        description: "Un employé de bureau insomniaque et un fabricant de savon créent un club de combat clandestin." 
    },
    { id: 12, 
        title: "John Wick", 
        genre: "Action", 
        image: "images/image12.webp", 
        description: "Un ancien tueur à gages sort de sa retraite pour traquer les gangsters qui ont tout pris." 
    }
];

const cardsContainer = document.querySelector('.cards');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.querySelector('.search-bar input');
const favoritesGrid = document.getElementById('favoritesGrid');
const modal = document.getElementById('movieModal');

let favorites = JSON.parse(localStorage.getItem('favs')) || [];

// Affichage dyal l-aflam
function displayMovies(moviesList) {
    cardsContainer.innerHTML = "";
    moviesList.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.genre}</p>
            <div class="card-btns">
                <button class="btn-details" onclick="showDetails(${movie.id})">Voir Details</button>
            </div>
        `;
        cardsContainer.appendChild(card);
    });
}

// Logic dyal l-Modal
 function showDetails(id) {
    const movie = movies.find(m => m.id === id);
    console.log(movie)
    if (movie) {
        document.getElementById('modalImg').src = movie.image;
        console.log(document.getElementById('modalImg').src)
        document.getElementById('modalTitle').innerText = movie.title;
        document.getElementById('modalGenre').innerText = movie.genre;
        document.getElementById('modalDesc').innerText = movie.description;
        document.getElementById('modalFavBtn').onclick = () => addToFav(movie.id);
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }
}

window.closeModal = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(e) { if (e.target == modal) closeModal(); }

// Filter & Search
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const genre = btn.dataset.genre;
        displayMovies(genre === "All" ? movies : movies.filter(m => m.genre === genre));
    });
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    displayMovies(movies.filter(m => m.title.toLowerCase().includes(term)));
});

// Favoris
window.addToFav = function(id) {
    const movie = movies.find(m => m.id === id);
    if (!favorites.some(m => m.id === id)) {
        favorites.push(movie);
        localStorage.setItem('favs', JSON.stringify(favorites));
        renderFavorites();
    }
}

function renderFavorites() {
    favoritesGrid.innerHTML = '<h2 class="fav-title">Mes Favoris ❤️</h2>';
    favorites.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${movie.image}" style="height:120px; object-fit:cover;">
            <h3>${movie.title}</h3>
            <button onclick="removeFromFav(${movie.id})" style="background:#e91e63; color:white; border:none; padding:5px; border-radius:5px; cursor:pointer;">Supprimer</button>
        `;
        favoritesGrid.appendChild(div);
    });
}

window.removeFromFav = function(id) {
    favorites = favorites.filter(m => m.id !== id);
    localStorage.setItem('favs', JSON.stringify(favorites));
    renderFavorites();
}

// Start
displayMovies(movies);
renderFavorites();