let displaySixBestMovies = document.getElementById("six_best_movies");
fetchSixBestMovies();

async function fetchSixBestMovies() {
    const apiUrl = "http://localhost:8000/api/v1/titles/";
    let itemsList = [];
    let adjustedItemsList = [];
    for (let page = 1; page <= 2; page++) {
        const response = await fetch(`${apiUrl}?page=${page}&sort_by=-imdb_score`);
        const jsonResponse = await response.json();
        itemsList = itemsList.concat(jsonResponse.results);
    }
    adjustedItemsList = itemsList.slice(0, 6);
    console.log(adjustedItemsList);
    injectMoviesIntoPage(adjustedItemsList);
}

function injectMoviesIntoPage(movies) {
    let modal = document.getElementById("myModal");
    const container = document.getElementById('six_best_movies');

    movies.forEach(movie => {
        const parentDivContainer = document.createElement('div');
        parentDivContainer.className = 'movie-container';

        const movieElement = document.createElement('a');
        movieElement.className = 'movie';
        movieElement.innerHTML = `<img src=${movie.image_url} alt=${movie.title}><h3>${movie.title}</h3>`;
        container.appendChild(movieElement);

        const btnElement = document.createElement('div');
        btnElement.className = 'six_best_movies_detail_button';
        btnElement.innerHTML = `
            <button class="black_btn openModalBtn">Détails</button>
            `;
        btnElement.addEventListener("click", function () {
            modal.style.display = "block";
        })
        parentDivContainer.appendChild(movieElement);
        parentDivContainer.appendChild(btnElement);
        container.appendChild(parentDivContainer);
    });
}
