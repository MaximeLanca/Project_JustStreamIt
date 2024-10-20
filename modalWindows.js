function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modalContent');
    movieElementForModal.innerHTML =
        `
    <div class=" gap-10 relative flex flex-col justify-between h-full">
        <div class="absolute right-0 flex items-center justify-center w-10 h-10 lg:hidden md:block sm:block">
            <button id="closeModalCrossButton" class="text-red-600">&#10006;</button>
        </div>
        <div>
            <h2 class="top-0 text-2xl">${dataMovie.title}</h2>
            <p>${dataMovie.year} - ${dataMovie.genres}</p>
            <p>${dataMovie.duration} minutes - ${dataMovie.countries}</p>
            <p>IMDB Score: ${dataMovie.imdb_score} / 10</p>
            <p>Réaliser par: ${dataMovie.writers}</p>
        </div>
        <div class="flex flex-col lg:flex-row justify-between p-1">
            <div class="w-[150px] order-2 lg:order-1 my-8">
                <p>${dataMovie.long_description}</p>
            </div>
        </div>
        <div class="order-1 lg:order-2 lg:ml-4 mt-4 lg:mt-0">
            <img src=${dataMovie.image_url} alt=${dataMovie.title} class="w-full lg:w-[300px] object-cover" width="259" height="252">
        </div>
        <p class="my-4">Avec:<br>${dataMovie.actors}</p>
        <div class="flex justify-center items-center my-4 lg:block md:hidden sm:hidden">
            <button id="closeModalButton" class="bg-red-600 rounded-2xl text-white border-solid px-10">Fermer</button>
        </div>
    </div>`;

    const closeModalBtn = document.getElementById('closeModalButton');
    closeModalBtn.addEventListener('click', function () {
        document.getElementById('myModal').style.display = 'none';
    });

    const closeModalCrossBtn = document.getElementById('closeModalCrossButton');
    closeModalCrossBtn.addEventListener('click', function () {
        document.getElementById('myModal').style.display = 'none';
    });

}

document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalButton');
    const modal = document.getElementById('myModal');

    openModalBtn.addEventListener('click', function () {
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
