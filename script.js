let dropDownActionMovies = document.getElementById("dropdown_action");
dropDownActionMovies.addEventListener('click', () => {
    const category = 'action';
    loadMoviesBycategory(category);
});

async function loadMoviesBycategory(category) {
    const apiUrl = `http://localhost:8000/api/v1/titles/?sort_by=-votes&genre=${category}&limit=6`;
    const reponse = await fetch(apiUrl);
    const data = await reponse.json();
    injectMoviesIntoPage(data.movies);
}

function injectMoviesIntoPage(movies) {
    const container = document.getElementById('Six_best_movies');
    container.innerHTML = ' ';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `<img src=${movie.posterUrl} alt=${movie.title}><h3>${movie.title}</h3><p>${movie.description}</p><button onclick="showDetails(${movie.id})">Détails</button>";
        container.appendChild(movieElement);
    });
}

