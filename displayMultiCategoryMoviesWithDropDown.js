let moviesCategoriesList = [];

async function fetchGenresMovies() {
    const apiUrl = "http://localhost:8000/api/v1/genres/";

    let page = 1
    while (true) {
        let response = await fetch(`${apiUrl}?page=${page}`);
        const jsonResponse = await response.json();
        for (let items of jsonResponse.results) {
            moviesCategoriesList = moviesCategoriesList.concat(items["name"]);
        };

        let nextPage = jsonResponse.next;
        if (nextPage == null) {
            break;
        };

        page++;
    };

    let dropDownContent = document.getElementById("dropdownContent");
    for (let category of moviesCategoriesList) {
        dropDownContent.innerHTML += `<a id="${category.toLowerCase()}" class="dropbtn"><p>${category}</p></a>`;
    };

    attachDropdownEvents();
};

document.addEventListener('DOMContentLoaded', function () {

    const dropdownContent = document.querySelector('.dropdownContent');
    const dropbtn = document.querySelector('.dropbtn');

    dropbtn.addEventListener('click', function () {
        dropdownContent.classList.toggle('show');
    });

    window.addEventListener('click', function (event) {
        if (!event.target.matches('.dropbtn') && dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    });
});

function attachDropdownEvents() {
    for (let category of moviesCategoriesList) {
        const button = document.getElementById(`${category.toLowerCase()}`);
        button.addEventListener('click', function () {
            const moviesContainer = document.getElementById("moviesContainerDropDown");
            moviesContainer.innerHTML = "";
            fetchMovies("moviesContainerDropDown", `sort_by=-imdb_score&genre=${category}`);
        });
    };
};

fetchGenresMovies();
