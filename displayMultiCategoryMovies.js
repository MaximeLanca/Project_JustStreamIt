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
    let counter = 0;
    let hiddenMovies = [];
    for (const jsonDataBestMovie of adjustedItemsList) {
        const movieElement = document.createElement('div');
        const apiUrlDataCategoryMovie = jsonDataBestMovie.url;
        const moviesSorted = await fetch(apiUrlDataCategoryMovie);
        const movieData = await moviesSorted.json();
        const parentDivContainer = document.createElement('div');
        parentDivContainer.className = 'relative';

        counter += 1;
        if (counter === 3 || counter === 4) {
            movieElement.className = 'relative pb-8 w-[310px] lg:block md:block sm:hidden';
            movieElement.id = `hidden${movieCategory}`;
            hiddenMovies.push(movieElement);
        }
        else if (counter === 5 || counter === 6) {
            movieElement.className = 'relative pb-8 w-[310px] lg:block md:hidden sm:hidden';
            movieElement.id = `hidden${movieCategory}`;
            hiddenMovies.push(movieElement);
        } else {
            movieElement.className = 'relative pb-8 w-[310px]';
        };
        movieElement.innerHTML =
            `<div>
                <a><img class="h-[300px] w-[310px]"src=${movieData.image_url} alt=${movieData.title} height="100" width="250"></a>
                <div class="w-full absolute top-10 bottom-40 left-0 right-0 flex bg-black bg-opacity-40 h-[150px]"></div>
            </div>  
                <h3 class="absolute text-2xl text-white top-10 left-5 w-[250px] h-[15px]">${movieData.title}</h3>
                `;

        const btnElement = document.createElement('button');
        btnElement.className = "absolute top-10 right-0 bg-black text-white font-thin text-sm/[2px] p-3 rounded-full w-[100px] h-[90px] cursor-pointer openModalBtn";
        btnElement.innerHTML = "Détails";
        btnElement.addEventListener("click", function () {
            modal.style.display = "block";
            getMovieInfoForModal(movieData);
        });

        movieElement.appendChild(btnElement);
        container.appendChild(movieElement);
    };

    if (hiddenMovies.length > 0) {
        const btnViewMore = document.createElement('button');
        btnViewMore.className = "bg-red-600 rounded-2xl text-white border-solid px-10 col-span-full mx-auto sm:block md:block lg:hidden";
        btnViewMore.innerHTML = "Voir plus";
        btnViewMore.addEventListener("click", function () {
            hiddenMovies.forEach(movie => {
                movie.classList.remove("md:hidden");
                movie.classList.add("md:block");
                movie.classList.remove("sm:hidden");
                movie.classList.add("sm:block");
            });
            btnViewMore.style.display = "none";
            btnViewLess.style.display = "block";
        });

        const btnViewLess = document.createElement('button');
        btnViewLess.className = "bg-red-600 rounded-2xl text-white border-solid px-10 col-span-full mx-auto sm:hidden md:hidden lg:hidden";
        btnViewLess.innerHTML = "Voir moins";
        btnViewLess.style.display = "none";
        btnViewLess.addEventListener("click", function () {
            hiddenMovies.forEach(movie => {
                movie.classList.remove("md:block");
                movie.classList.add("md:hidden");
                movie.classList.remove("sm:block");
                movie.classList.add("sm:hidden");
            });
            btnViewLess.style.display = "none";
            btnViewMore.style.display = "block";
        });

        container.appendChild(btnViewMore);
        container.appendChild(btnViewLess);
    }
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
        `<div class="flex border-4 pb-50 border-black sm:h-[450px] md:h-[350px] lg:h-[400px] sm:flex-col md:flex-row sm:justify-center">
            <div class="p-4 overflow-hidden sm:mx-auto md:overflow-visible">
                <img class="w-[250px] h-[300px]" src=${firstMovie.image_url} alt=${firstMovie.title} width="227" height="334">
            </div>
            <div class="m-2 basis-3/4 grid justify-items-stretch">
                <div class="text-xl relative font-bold lg:top-1 lg:text-3xl md:text-2xl">
                    ${jsonDataBestMovie.title}
                </div>
                <div class="font-serif font-light lg:text-2xl pt-6 md:text-2xl pt-1 sm:text-xl">
                    <p>${jsonDataBestMovie.description}</p>
                </div>
                <div class="p-1 lg:pr-10 md:pr-10 lg:justify-self-end md:justify-self-end justify-self-end">
                    <button class="bg-red-500 text-white p-4 text-center italic rounded-[25px] cursor-pointer md:w-[150px] w-[100px]" id="openModalButton">Détail</button>
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
