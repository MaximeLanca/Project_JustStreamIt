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
        dropDownContent.innerHTML += `
        <div id="${category.toLowerCase()}" class="text-2xl border border-black"> 
            <a class="w-[150px]">
                <div class="pl-2 relative">
                    <p>${category}</p>
                    <span class="absolute right-0 top-0.5 icon float-right w-[25px] h-[25px]"></span>
                </div>
            </a>
        </div>`;
    };

    attachDropdownEvents();
};

function attachDropdownEvents() {
    let selectedCategory = null;
    for (let category of moviesCategoriesList) {

        const button = document.getElementById(`${category.toLowerCase()}`);

        button.addEventListener('click', function () {
            const moviesContainer = document.getElementById("moviesContainerDropDown");
            moviesContainer.innerHTML = "";
            fetchMovies("moviesContainerDropDown", `sort_by=-imdb_score&genre=${category}`);

            // Vérifie si une catégorie est déjà sélectionnée
            if (selectedCategory) {
                // Supprime les styles de l'icône de la catégorie précédemment sélectionnée
                selectedCategory.querySelector('.icon').classList.remove('bg-green-500', 'bg-cover', 'border', 'border-green-400', 'rounded-md', 'text-white', 'flex', 'items-center', 'justify-center');
                selectedCategory.querySelector('.icon').innerHTML = ''; // Vide l'icône
            }

            // Sélectionne la nouvelle catégorie
            selectedCategory = button; // Met à jour la catégorie sélectionnée
            button.querySelector('.icon').classList.add('bg-green-500', 'bg-cover', 'border', 'border-green-400', 'rounded-md', 'text-white', 'flex', 'items-center', 'justify-center');
            button.querySelector('.icon').innerHTML = '&#10003;';  // Ajoute la coche verte
        });
    };
}

document.getElementById("dropBtn").addEventListener("click", function () {
    const dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.classList.toggle("hidden");
});

fetchGenresMovies();

