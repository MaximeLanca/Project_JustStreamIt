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
            movieElement.className = 'relative pb-8 w-[300px] lg:block md:block sm:hidden';
            movieElement.id = `hidden${movieCategory}`;
            hiddenMovies.push(movieElement);
        }
        else if (counter === 5 || counter === 6) {
            movieElement.className = 'relative pb-8 w-[300px] lg:block md:hidden sm:hidden';
            movieElement.id = `hidden${movieCategory}`;
            hiddenMovies.push(movieElement);
        } else {
            movieElement.className = 'relative pb-8 w-[300px]';
        };
        movieElement.innerHTML =
            `<div">
                <a><img src=${movieData.image_url} alt=${movieData.title} height="100" width="300"></a>
                <div class="w-full absolute top-10 bottom-40 left-0 right-0 flex bg-black bg-opacity-50 h-[150px] "></div>
            </div>  
                <h3 class="absolute text-lg text-white top-10 left-5 w-[250px] h-[15px]">${movieData.title}</h3>
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
        `<div class="border-4 pb-50 lg:border-black md:border-red-600 sm:border-purple-700 lg:h-full md:h-[330px] sm:h-[450px] lg:flex md:flex sm:flex lg:flex-row md:flex-row sm:flex-col sm:justify-center">
            <div class="p-4 lg:h-full md:h-[400px] sm:h-[150px] sm:w-[400px] sm:mx-auto md:overflow-visible lg:overflow-visible sm:overflow-hidden ">
                <img class="w-full h-auto lg:max-w-[400px] md:max-w-[400px] sm:max-w-[300px] max-h-[334px] object-cover"  src=${firstMovie.image_url} alt=${firstMovie.title} width="227" height="334">
            </div class="p-2">
            <div class=" m-2 basis-3/4 flex grid justify-items-stretch">
                <div class="relative font-bold lg: top-4 text-4xl md:text-4xl sm:text-3xl">
                    ${jsonDataBestMovie.title}
                </div>
                <div class="italic font-light lg:text-3xl pt-6 md:text-2xl pt-1 sm:text-xl">
                    <p>${jsonDataBestMovie.description}</p>
                </div>
                <div class="pt-6 lg:pr-10 md:pr-10 sm:p-1 lg:justify-self-end md:justify-self-end sm:mx-auto ">
                        <button class=" bg-red-500 text-white p-4 text-center italic rounded-[25px] cursor-pointer order-1 w-[120px] sm:p-2 w-[100px] " id="openModalButton">Détail</button>
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
