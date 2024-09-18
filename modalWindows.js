function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modalContent');

    movieElementForModal.innerHTML =

        `<h2 class="top-0 text-2xl">${dataMovie.title}</h2>  
         <div class="flex flex-col ">
            <p>${dataMovie.year} - ${dataMovie.genres}</p>
            <p>${dataMovie.duration} minutes - ${dataMovie.countries}</p>
            <p>IMDB Score: ${dataMovie.imdb_score} / 10</p>
            <p>Réaliser par: ${dataMovie.writers}</p>
        </div>
        <div class="top-2" dir="rtl"style="width: 700px; height: 400px;">
            <div style="width:280px;height:300px;">
                <a>
                    <img src=${dataMovie.image_url} alt=${dataMovie.title} width="259" heigth="252">
                </a>
            </div>
        </div>
        <div>
            <p>${dataMovie.long_description}</p>
            <p>Avec:<br>${dataMovie.actors}</p>
        </div>
        <div class="bottom-0">
            <button id="closeModalButton" class="closeModalButton">Fermer</button>
        </div>
        `;

    const closeModalBtn = document.getElementById('closeModalButton');
    closeModalBtn.addEventListener('click', function () {
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
