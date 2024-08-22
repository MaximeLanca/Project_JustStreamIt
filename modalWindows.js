function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modal-content');

    movieElementForModal.innerHTML =
        `<h2 class="h2_modal_title_movie">${dataMovie.title}</h2>  
         <div class="modal_information_movie_partOne">
            <p>${dataMovie.year} - ${dataMovie.genres}</p>
            <p>${dataMovie.duration} minutes - ${dataMovie.countries}</p>
            <p>IMDB Score: ${dataMovie.imdb_score} / 10</p>
            <p>Réaliser par: ${dataMovie.writers}</p>
        </div>
        <div class="modal_picture_movie">
            <a>
                <img src=${dataMovie.image_url} alt=${dataMovie.title} width="209" heigth="202">
            </a>
        </div>
        <div class="modal_information_movie_partTwo">
            <p>${dataMovie.long_description}</p>
            <p>Avec:<br>${dataMovie.actors}</p>
        </div>
        <button id="closeModalButton" class="closeModalButton">Fermer</button>
        `;

    const closeModalBtn = document.getElementById('closeModalButton');
    closeModalBtn.addEventListener('click', function () {
        document.getElementById('myModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    });

}

document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalButton');
    const modal = document.getElementById('myModal');
    const modalOverlay = document.getElementById('modalOverlay');

    openModalBtn.addEventListener('click', function () {
        modalOverlay.style.display = 'block'; modal.style.display = 'block';

    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
        }
    });
});