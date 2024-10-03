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
        parentDivContainer.className = 'relative';

        const movieElement = document.createElement('div');
        movieElement.className = 'relative pb-8';
        movieElement.innerHTML = `
            <div>
                <a><img src=${movieData.image_url} alt=${movieData.title}></a>
                <div class=" w-[182px] absolute top-10 bottom-40 left-0 right-0 flex bg-black bg-opacity-50 h-[100px] "></div>
            </div>  
            <h3 class="absolute text-xm text-white top-10 left-5 w-[150px] z-10">${movieData.title}</h3>
            `;

        const btnElement = document.createElement('button');
        btnElement.className = "absolute top-20 left-20 bg-black text-white font-thin text-sm/[3px] p-2 rounded-full w-[70px] cursor-pointer openModalBtn";
        btnElement.innerHTML = "Détails"
        btnElement.addEventListener("click", function () {
            modal.style.display = "block";
            getMovieInfoForModal(movieData);
        })

        movieElement.appendChild(btnElement);
        container.appendChild(movieElement);

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
        `<div class="border-black border-4 h-13 pb-50 flex " >
            <div class="p-2 pr-10">
                <img src=${firstMovie.image_url} alt=${firstMovie.title} width="200" heigth="252">
            </div class="p-2">
            <div class="flex flex-col">
                <div class="relative top-4 text-4xl font-bold">
                    ${jsonDataBestMovie.title}
                </div>
                <div>
                    <div class="text-2xl italic font-light pt-6" style="width:390px">
                        <p>${jsonDataBestMovie.description}</p>
                    </div>
                    <div class="pt-6 relative left-60 top-10">
                        <button class=" bg-red-500 text-white p-4 text-center italic rounded-[25px] cursor-pointer order-1 w-[120px]" id="openModalButton">Détail</button>
                    </div>
                </div>
            </div>
        </div>`;

    let displayBestMovie = document.getElementById("bestMovie");
    displayBestMovie.appendChild(movieElementForPictureData);

    let modal = document.getElementById("myModal");
    const btnElement = document.getElementById('openModalButton');
    btnElement.addEventListener("click", function () {
        modal.style.display = "block";
        getMovieInfoForModal(jsonDataBestMovie);
    });
}

fetchBestMovie()
