let dropDownActionMovies = document.getElementById("dropdown_action");
dropDownActionMovies.addEventListener('click', () => {
    const category = 'action';
    loadMoviesByCategory(category);
});
const category = 'action';
loadMoviesByCategory(category);

async function loadMoviesByCategory(category) {
    const apiUrl = `http://localhost:8000/api/v1/titles/?sort_by=-votes&genre=${category}&limit=6`;
    const reponse = await fetch(apiUrl);
    const data = await reponse.json();
    console.log(data)
    injectMoviesIntoPage(data.results);
}

function injectMoviesIntoPage(movies) {
    const container = document.getElementById('Six_best_movies');
    container.innerHTML = ' ';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `<img src=${movie.image_url} alt=${movie.title}><h3>${movie.title}</h3><button onclick=showDetails(${movie.id})>Détails</button>`;
        container.appendChild(movieElement);
    });
}
