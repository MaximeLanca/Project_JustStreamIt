function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modalContent');
    movieElementForModal.innerHTML =
        `
    <div class="grid justify-items-stretch gap-2 relative lg:w-[600px] lg:h-[800px] sm:w-[400px] lg:h-[1500px] lg:grid-cols-2 sm:grid-cols-1 ">
        <div class="absolute right-0 items-center justify-center w-10 h-10 lg:hidden md:block sm:block">
            <span id="closeModalCrossButton" class="!text-red-600 h-[20px]">&#x2716;</span>
        </div>
        <div class:"order-1">
            <h2 class="font-bold top-0 text-2xl">${dataMovie.title}</h2>
            <p class="font-semibold">${dataMovie.year} - ${dataMovie.genres}</p>
            <p class="font-semibold">${dataMovie.duration} minutes - ${dataMovie.countries}</p>
            <p class="font-semibold">IMDB Score: ${dataMovie.imdb_score} / 10</p>
            <p class="font-medium pt-5">Réalisé par:</p>
            <p>${dataMovie.writers}</p>
        </div>
        <div class="order-2 p-1 lg:order-3 lg:col-span-3">
            <div class="my-8">
                <p>${dataMovie.long_description}</p>
            </div>
        </div>
        <div class="place-self-center lg:justify-self-auto lg:place-self-stretch lg:ml-4 lg:order-2 sm:order-3">
            <img class="lg:w-[200px] sm:w-[400px]" width="259" height="252" src=${dataMovie.image_url} alt=${dataMovie.title}>
        </div>
        <div class="order-4 p-3 lg:col-span-3">
            <p class="font-semibold ">Avec:</p>
            <p>${dataMovie.actors}</p>
        </div>
        <div class="order-5 my-1 justify-self-center lg:col-start-1 place-self-end col-span-2 p-3 lg:block md:hidden sm:hidden">
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
