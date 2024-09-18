function getMovieInfoForModal(dataMovie) {

    const movieElementForModal = document.getElementById('modalContent');

    movieElementForModal.innerHTML =
        `<h2 class="top-0 text-2xl">${dataMovie.title}</h2>  
         <div class="">
            <p>${dataMovie.year} - ${dataMovie.genres}</p>
            <p>${dataMovie.duration} minutes - ${dataMovie.countries}</p>
            <p>IMDB Score: ${dataMovie.imdb_score} / 10</p>
            <p>Réaliser par: ${dataMovie.writers}</p>
        </div>
        <div class= "absolute top-150 left-100" style="width: 210px; height: 300px;">
            <div style="width:210px;height:300px;">
                <a>
                    <img src=${dataMovie.image_url} alt=${dataMovie.title} width="259" heigth="252">
                </a>
            </div>
        </div>
        <div class="modalInformationMoviePartTwo">
            <p>${dataMovie.long_description}</p>
            <p>Avec:<br>${dataMovie.actors}</p>
        </div>
        <button id="closeModalButton" class="closeModalButton">Fermer</button>
        `;

    const closeModalBtn = document.getElementById('closeModalButton');
    closeModalBtn.addEventListener('click', function () {
        document.getElementById('myModal').style.display = 'none';
        /* document.getElementById('modalOverlay').style.display = 'none'; */
    });

}



document.addEventListener('DOMContentLoaded', function () {
    const openModalBtn = document.getElementById('openModalButton');
    const modal = document.getElementById('myModal');
    /* const modalOverlay = document.getElementById('modalOverlay'); */

    openModalBtn.addEventListener('click', function () {
        /* modalOverlay.style.display = 'block'; modal.style.display = 'block'; */
        // var windowVerticalScroll = window.scrollY;
        // console.log(windowVerticalScroll);

    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            /* modalOverlay.style.display = 'none'; */
        }
    });
});

// var windowVerticalScroll = window.scrollY;