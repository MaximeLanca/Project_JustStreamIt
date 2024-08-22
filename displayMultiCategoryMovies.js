async function fetchMovies(movieCategory, apiParam) {
    const apiUrl = "http://localhost:8000/api/v1/titles/";
    let itemsList = [];
    let adjustedItemsList = [];

    for (let page = 1; page <= 2; page++) {
        const response = await fetch(`${apiUrl}?page=${page}&${apiParam}`);
        const jsonResponse = await response.json();
        itemsList = itemsList.concat(jsonResponse.results);
    };

    adjustedItemsList = itemsList.slice(0, 6);
    injectMoviesIntoPage(adjustedItemsList, movieCategory);
}

async function injectMoviesIntoPage(adjustedItemsList, movieCategory) {
    let modal = document.getElementById("myModal");
    const container = document.getElementById(movieCategory);
    for (const movie of adjustedItemsList) {

        const apiUrlDataCategoryMovie = movie.url;

        const response = await fetch(apiUrlDataCategoryMovie);
        const movieData = await response.json();

        const parentDivContainer = document.createElement('div');
        parentDivContainer.className = 'movie-container';

        const movieElement = document.createElement('a');
        movieElement.className = 'movie';
        movieElement.innerHTML = `<img src=${movieData.image_url} alt=${movieData.title}><h3>${movieData.title}</h3>`;
        container.appendChild(movieElement);


        const btnElement = document.createElement('div');
        btnElement.className = 'display_detail_black_button';
        btnElement.innerHTML = `<button class="black_button openModalBtn">Détails</button>`;

        btnElement.addEventListener("click", function () {
            modal.style.display = "block";
            getMovieInfoForModal(movieData);
        })

        parentDivContainer.appendChild(movieElement);
        parentDivContainer.appendChild(btnElement);
        container.appendChild(parentDivContainer);
    };

}

async function fetchBestMovie() {
    const apiUrlMoviesorted = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
    const response = await fetch(apiUrlMoviesorted);
    const jsonResponse = await response.json();
    const firstMovie = jsonResponse.results[0];
    const movieElementForPictureData = document.createElement('a');
    movieElementForPictureData.className = "movie";
    movieElementForPictureData.innerHTML = `<img src=${firstMovie.image_url} alt=${firstMovie.title} width="259" heigth="252">`;

    const apiUrlDataBestMovie = firstMovie.url
    const secondResponse = await fetch(apiUrlDataBestMovie);
    const movie = await secondResponse.json();
    const movieElementForDescription = document.createElement('p');
    movieElementForDescription.className = "best_movie_description";
    movieElementForDescription.innerHTML = `<h2>${movie.title}</h2>${movie.description}`;

    let displayBestMovie = document.getElementById("bestMovie");
    console.log(movieElementForPictureData);
    displayBestMovie.appendChild(movieElementForPictureData);
    displayBestMovie.appendChild(movieElementForDescription);

    let modal = document.getElementById("myModal");
    const btnElement = document.getElementById('openModalButton');
    btnElement.addEventListener("click", function () {
        modal.style.display = "block";
        getMovieInfoForModal(movie);
    });
}

fetchBestMovie()

