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
            movieElement.className = 'object-cover relative pb-2 w-[290px] lg:block md:block sm:hidden';
            movieElement.id = `hiddenMiddlePositionMovie${counter}`;
            hiddenMovies.push(movieElement);
        }
        else if (counter === 5 || counter === 6) {
            movieElement.className = 'object-cover relative pb-2 w-[290px] lg:block md:hidden sm:hidden';
            movieElement.id = `hiddenEndPositionMovie${counter}`;
            hiddenMovies.push(movieElement);
        } else {
            movieElement.className = 'relative pb-2 w-[290px]';
        };

        movieElement.innerHTML =
            `<div>
                <a><img class="object-cover h-[300px] w-[290px]"src=${movieData.image_url} alt=${movieData.title} height="100" width="250"></a>
                <div class="w-full absolute top-10 bottom-40 left-0 right-0 flex justify-end items-end pr-5 pb-5 bg-black bg-opacity-40 h-[150px]">
                    <button class="detailsButton font-thin top-50 right-0 bg-slate-800 text-white text-sm/[2px] p-3 rounded-2xl w-[90px] h-[30px] cursor-pointer">Détails</button>
                </div>
            </div>  
            <h3 class="absolute text-2xl text-white top-10 left-5 w-[250px] h-[15px]">${movieData.title}</h3>`;

        container.appendChild(movieElement);

        const btnElements = document.querySelectorAll('.detailsButton');
        btnElements.forEach((button) => {
            button.addEventListener("click", function () {
                modal.style.display = "block";
                getMovieInfoForModal(movieData);
            });
        });
    };


    if (hiddenMovies.length > 0) {
        const btnViewMore = document.createElement('button');
        btnViewMore.className = "bg-red-600 rounded-2xl text-white border-solid px-10 col-span-full mx-auto sm:block md:block lg:hidden";
        btnViewMore.innerHTML = "Voir plus";
        btnViewMore.addEventListener("click", function () {

            if (window.matchMedia("(min-width:768px)").matches) {
                hiddenMovies.forEach(movie => {
                    movie.classList.remove("md:hidden");
                    movie.classList.add("md:block");
                });
                btnViewMore.style.display = "none";
                btnViewLess.style.display = "block";
            }

            else if (window.matchMedia("(min-width:0px)").matches) {
                hiddenMovies.forEach(movie => {
                    movie.classList.remove("sm:hidden");
                    movie.classList.add("sm:block");
                });
                btnViewMore.style.display = "none";
                btnViewLess.style.display = "block";
            }

        });

        const btnViewLess = document.createElement('button');
        btnViewLess.className = "bg-red-600 rounded-2xl text-white border-solid px-10 col-span-full mx-auto sm:hidden md:hidden lg:hidden";
        btnViewLess.innerHTML = "Voir moins";
        btnViewLess.style.display = "none";
        btnViewLess.addEventListener("click", function () {

            if (window.matchMedia("(min-width:768px)").matches) {
                hiddenMovies.slice(2).forEach(movie => {
                    movie.classList.remove("md:block");
                    movie.classList.add("md:hidden");
                });
                btnViewLess.style.display = "none";
                btnViewMore.style.display = "block";
            }

            else if (window.matchMedia("(min-width:0px)").matches) {
                hiddenMovies.forEach(movie => {
                    movie.classList.remove("sm:block");
                    movie.classList.add("sm:hidden");
                });
                btnViewLess.style.display = "none";
                btnViewMore.style.display = "block";
            }


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
        `<div class="flex border-4 pb-50 border-black sm:h-[550px] md:h-[350px] lg:h-[400px] sm:flex-col md:flex-row sm:justify-center">
            <div class="p-4 overflow-hidden sm:mx-auto md:overflow-visible">
                <img class="lg:h-[350px] md:h-[300px] md:w-[250px] sm:h-[400px] sm:w-[350px]" src=${firstMovie.image_url} alt=${firstMovie.title} width="227" height="334">
            </div>
            <div class="m-2 basis-3/4 grid lg:h-[350px]">
                <div class="pl-2 text-3xl relative font-bold lg:top-1">
                    ${jsonDataBestMovie.title}
                </div>
                <div class="pl-2 place-self-start font-light lg:text-2xl md:text-2xl pt-1 sm:text-xl">
                    <p>${jsonDataBestMovie.description}</p>
                </div>
                <div class="p-4 pr-10 md:place-self-end sm:place-self-center">
                    <button class="bg-red-500 text-white p-2 text-center italic  cursor-pointer lg: rounded-[15px] lg:w-[130px] sm:w-[100px] sm:rounded-[30px]" id="openModalButton">Détails</button>
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
