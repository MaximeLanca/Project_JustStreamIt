async function fetchMovies(movieCategory, apiParam) {
    const apiUrl = "http://localhost:8000/api/v1/titles/";
    let itemsList = [];
    let adjustedItemsList = [];

    for (let page = 1; page <= 2; page++) {
        const moviesSorted = await fetch(`${apiUrl}?page=${page}&${apiParam}`);
        const jsonMoviesSorted = await moviesSorted.json();
        itemsList = itemsList.concat(jsonMoviesSorted.results);
        let nextPage = jsonMoviesSorted.next;

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
    for (const jsonDataBestMovie of adjustedItemsList) {

        const apiUrlDataCategoryMovie = jsonDataBestMovie.url;

        const moviesSorted = await fetch(apiUrlDataCategoryMovie);
        const movieData = await moviesSorted.json();

        const parentDivContainer = document.createElement('div');
        parentDivContainer.className = 'movieContainer';

        const movieElement = document.createElement('a');
        movieElement.className = 'jsonDataBestMovie';
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
    const moviesSorted = await fetch(apiUrlMoviesorted);
    const jsonMoviesSorted = await moviesSorted.json();
    const firstMovie = jsonMoviesSorted.results[0];
    const movieElementForPictureData = document.createElement('div');

    const apiUrlDataBestMovie = firstMovie.url
    const dataBestMovie = await fetch(apiUrlDataBestMovie);
    const jsonDataBestMovie = await dataBestMovie.json();

    movieElementForPictureData.innerHTML =
        `<div class="pl-2 border-black border-4 h-13 pb-50 flex flex-row " >
            <div class="p-2 pr-10">
                <img src=${firstMovie.image_url} alt=${firstMovie.title} width="200" heigth="252">
            </div class="p-2">
            <div class="flex flex-col ">
                <div class="text-4xl font-bold">
                    ${jsonDataBestMovie.title}
                </div>
                <div>
                    <div class="text-2xl italic font-light pt-6" style="width:390px">
                        <p>${jsonDataBestMovie.description}</p>
                    </div>
                    <div class="pt-6">
                        <button class="red_button" id="openModalButton">Détail</button>
                    </div>
                </div>
            </div>
        </div>`;

    const movieElementForAll = document.createElement('div');
    let displayBestMovie = document.getElementById("bestMovie");
    displayBestMovie.appendChild(movieElementForPictureData);
    displayBestMovie.appendChild(movieElementForAll);

    let modal = document.getElementById("myModal");
    const btnElement = document.getElementById('openModalButton');
    btnElement.addEventListener("click", function () {
        modal.style.display = "block";
        getMovieInfoForModal(jsonDataBestMovie);
    });
}

fetchBestMovie()
