async function fetchMovies(movieCategory, apiParam) {
    const apiUrl = "http://localhost:8000/api/v1/titles/";
    let itemsList = [];
    let adjustedItemsList = [];

    for (let page = 1; page <= 2; page++) {
        const response = await fetch(`${apiUrl}?page=${page}&${apiParam}`);
        const jsonResponse = await response.json();
        itemsList = itemsList.concat(jsonResponse.results);
        let nextPage = jsonResponse.next;

        if (nextPage == null) {
            break;
        };
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
        parentDivContainer.className = 'movieContainer';

        const movieElement = document.createElement('a');
        movieElement.className = 'movie';
        movieElement.innerHTML = `<img src=${movieData.image_url} alt=${movieData.title}><h3>${movieData.title}</h3>`;
        container.appendChild(movieElement);


        const btnElement = document.createElement('div');
        btnElement.className = 'displayDetailBlackButton';
        btnElement.innerHTML = `<button class="blackButton openModalBtn">Détails</button>`;

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
    const movieElementForPictureData = document.createElement('div');
    movieElementForPictureData.className = "movie";
    movieElementForPictureData.innerHTML = `<img src=${firstMovie.image_url} alt=${firstMovie.title} width="259" heigth="252">`;

    const apiUrlDataBestMovie = firstMovie.url
    const secondResponse = await fetch(apiUrlDataBestMovie);
    const movie = await secondResponse.json();

    const movieElementForAll = document.createElement('div');
    movieElementForAll.className = "red_button";
    movieElementForAll.setAttribute = ('id', 'openModalButton');

    const movieElementForDescription = document.createElement('p');
    movieElementForDescription.className = "w-60";
    const movieElementForTitle = document.createElement('h2');
    const redButtonBestMovie = document.createElement('div');

    redButtonBestMovie.innerHTML = '<button class="red_button" id="openModalButton">Détail</button>';
    movieElementForAll.className = "text-justify text-lg p-3 space-y-5";
    movieElementForDescription.innerHTML = `${movie.description}`;
    movieElementForTitle.innerHTML = `${movie.title}`;

    movieElementForAll.appendChild(movieElementForTitle);
    movieElementForAll.appendChild(movieElementForDescription);
    movieElementForAll.appendChild(redButtonBestMovie);

    let displayBestMovie = document.getElementById("bestMovie");
    displayBestMovie.appendChild(movieElementForPictureData);
    displayBestMovie.appendChild(movieElementForAll);

    let modal = document.getElementById("myModal");
    const btnElement = document.getElementById('openModalButton');
    btnElement.addEventListener("click", function () {
        modal.style.display = "block";
        getMovieInfoForModal(movie);
    });
}

fetchBestMovie()

/* bestMovieDescription */