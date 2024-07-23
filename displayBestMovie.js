let displayBestMovie = document.getElementById("best_movie");
fetchBestMovie()

async function fetchBestMovie() {
    const apiUrlMoviesorted = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score";
    const firstResponse = await fetch(apiUrlMoviesorted);
    const jsonFirstResponse = await firstResponse.json();
    const firstMovie = jsonFirstResponse.results[0];
    const movieElementForPictureData = document.createElement('a');
    movieElementForPictureData.innerHTML = `<img src=${firstMovie.image_url} alt=${firstMovie.title} width="259" heigth="252">`
    displayBestMovie.appendChild(movieElementForPictureData);

    const apiUrlDataBestMovie = `${firstMovie.url}`
    const secondResponse = await fetch(apiUrlDataBestMovie);
    const jsonSecondResponse = await secondResponse.json();
    const movieElementForDescription = document.createElement('p');
    movieElementForDescription.innerHTML = `<h2>${firstMovie.title}</h2> ${jsonSecondResponse.description}`;
    displayBestMovie.appendChild(movieElementForDescription);
}