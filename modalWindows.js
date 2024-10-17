function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modalContent');

    movieElementForModal.innerHTML =
        `<div class="flex gap-y-3 flex-col justify-between h-full">
            <div class="lg:order-1 flex items-center justify-center w-10 h-10">
                <button id="closeModalCrossButton" class="text-red-600">&#10006;</button>
            </div>
            <div class="lg:order-2 flex flex-row justify-between p-1">
                <div>
                    <h2 class="top-0 text-2xl">${dataMovie.title}</h2>
                    <p>${dataMovie.year} - ${dataMovie.genres}</p>
                    <p>${dataMovie.duration} minutes - ${dataMovie.countries}</p>
                    <p>IMDB Score: ${dataMovie.imdb_score} / 10</p>
                    <p>Réaliser par: ${dataMovie.writers}</p>
                </div>
                <div>
                    <img src=${dataMovie.image_url} alt=${dataMovie.title} width="259" heigth="252">
                </div>
            </div>
            <div class="lg:order-3 my-8">
                <p>${dataMovie.long_description}</p>
            </div>
            <div class:"lg:order-4"
                <p>Avec:<br>${dataMovie.actors}</p>
            </div>
            <div class="lg:order-5 flex justify-center relative bottom-0">
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
